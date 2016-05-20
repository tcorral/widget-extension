/**
 * Session timeout handling
 * Pings the session endpoint to determine session time remaining.
 * If less than 'startCountdownAt', a timeout warning is initiated.
 * If no time is left, automatic logout
 * User click and keyboard events revalidate the session on every ping, or immediately if the warning is active
 */
define(function(require, exports, module) {

    'use strict';

    var utils = require('../utils/main');
    var log = require('../log/main');
    var fetch = require('../async/fetch');
    var notifications = require('./session-notifications');
    var NS = require('../../config').NS;
    var bus = require('../bus/main');

    var events = {
        userActivity: NS + '.user.activity'
    };

    var formHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    /*----------------------------------------------------------------*/
    /* Export Singleton session handler
    /*----------------------------------------------------------------*/
    module.exports = (function() {

        var instance; // Session Handler instance
        var config; // store the configuration options
        var defaults = {
            pingUrl: '$(servicesPath)/services/rest/v1/authentication/session',
            logoutUrl: '$(contextRoot)/j_spring_security_logout',
            keepAlive: true,
            startCountdown: 60000,
            notifyAfterInterval: 5000,
            pingInterval: 30000,
            sessionExpiredKey: 'launchpad.sessionExpired',
            maxConsecutiveFailCount: 3,
            userLoggedIn: false
        };

        var countdownInterval; // session notification countdown interval

        /**
         * Session handler
         * @param {options} options Configuration
         * @constructor
         */
        function SessionHandler(options) {
            options = options || {};
            config = utils.chain(options)
                .defaults(defaults)
                .mapValues(utils.resolvePortalPlaceholders)
                .value();

            this.sessionStorage = options.store || window.sessionStorage;
            this.isPollingStarted = false;
            this.hasSession = false;
        }

        /**
         * Init Session Timeout
         * @return {object} SessionHandler instance
         */
        SessionHandler.prototype.init = function() {
            //determines if a valid session previously existed during this page load
            this.validSessionExisted = false;
            //records if a user event has occurred
            this.userEventsOccurred = false;
            //keeps track of consecutive ping fails. helps to detect internet connectivity problems
            this.consecutiveFailCount = 0;

            notifications.afterTimeout(config);

            // If user is logged in enable session notifications
            if (config.userLoggedIn) {
                this.startPolling();
            }
            // adding "Continue work" button handler for notification
            // and user activity handling
            var self = this;
            bus.subscribe(events.userActivity, function userEventsReceived() {
                self.userEventsOccurred = true;
                if(countdownInterval) {
                    self.clearSessionWarning(true);
                }
            });
        };

        /**
         * Start session polling
         * @param {Number} interval defines delay before polling start
         */
        SessionHandler.prototype.startPolling = function(interval) {
            window.setTimeout(this.ping.bind(this), interval || config.pingInterval);
        };

        /**
         * Ping function
         * @param {Boolean} reconfirm - flag to define if we have to refresh session or
         * just check it
         */
        SessionHandler.prototype.ping = function(reconfirm) {
            if (this.isPollingStarted) { return; }
            this.isPollingStarted = true;

            //decide which ping function to perform
            this.makeSessionRequest.apply(this, reconfirm || this.userEventsOccurred
                ? [ config.pingUrl, {method: 'PUT'} ]
                : [ config.pingUrl + '/validate', {} ]
            );
        };

        /**
         * Fetch session data
         * @param {Object} options - request configuration (URL, request method, etc)
         */
        SessionHandler.prototype.makeSessionRequest = function(url, options) {
            fetch(url, options)
                .then(this.handleStateResponse.bind(this), this.handleNetworkError.bind(this));
        };

        /**
         * Response handling function
         * @param {Object} responce - session request result. If request status
         * is OK, it contains freshnessFlag and remaining time.
         * @example response = {"remainingTime":528,"TheDataIsMostRecent":true}
         */
        SessionHandler.prototype.handleStateResponse = function(response) {
            this.isPollingStarted = false;
            this.userEventsOccurred = false;
            notifications.dataFreshness(response.data);
            // check badges from server
            notifications.checkBages();
            //if the response is a success, we know a valid session has now existed
            this.validSessionExisted = true;

            //reset consecutive fail count and clear offline warning (if any)
            if(this.consecutiveFailCount >= config.maxConsecutiveFailCount) {
                notifications.clearOfflineWarning();
            }
            this.consecutiveFailCount = 0;

            //continue as normal or show timeout warning
            var remaining = response.data.remainingTime * 1000;
            if(remaining > config.startCountdown) {
                //session is healthy
                this.clearSessionWarning();
            } else {
                //session is running out
                this.startSessionWarning(response.data.remainingTime);
            }
        };

        /**
         * Handle Session Errors
         * @param {Object} error  Error Exception
         */
        SessionHandler.prototype.logError = function(error) {
            log.error('SessionHandler: ', error);
        };

        /**
         * Fetching fail processing
         * @param {Object} error - response object which contains status code and
         * error description
         */
        SessionHandler.prototype.handleNetworkError = function(error) {
            error = error || {};
            this.isPollingStarted = false;

            if(this.validSessionExisted && error.status === 401) {
                //if we get a 401 and a session has existed, its time to logout\
                this.sessionStorage.clear();
                this.sessionStorage.setItem('launchpad.sessionExpired', 'true');
                //important to stop polling before trying to log out.
                this.clearSessionWarning(false, true);
                this.logout();
            } else if(error.status === 0 && error.statusText === 'timeout') {
                //xhr timeout occurs, use consecutive timeouts to detect internet connections problems
                this.consecutiveFailCount++;
                if(this.consecutiveFailCount < config.maxConsecutiveFailCount) {
                    //start counting consecutive failures, ping soon again
                    this.clearSessionWarning(false, true);
                    this.startPolling(1000);
                } else {
                    //consecutive failures, show a warning and resume normal pinging
                    notifications.offlineWarning();
                    this.startPolling();
                }
            } else if(error.status !== 401) {
                //any other unexpected errors
                this.logError('Unknown error Problem validating session: ' + error.statusText);
                this.startPolling();
            }
        };

        /**
         * Logout function
         */
        SessionHandler.prototype.logout = function() {
            var self = this;
            return fetch(config.logoutUrl, {
                method: 'POST',
                headers: formHeaders
            })
            .then(function(response) {
                var status = parseInt(response.status, 10);
                if (status >= 200 && status < 300 || status === 304) {
                    // The response returns a document and could be displayed
                    // e.g. document.documentElement.innerHTML = response.data;
                    // but there is an issue with a link so a redirect is used
                    // instead.
                    window.location.href = config.redirectUrl;
                } else {
                    self.logError(response.message);
                }
            });
        };

        // small helper for warning start
        function updateEstimatedTime(time, cb) {
            //one less second remaining now (unless already 0)
            time = time >= 1 ? time - 1 : 0;
            //perform a ping immediately if we estimate that time has run out
            if(time <= 1) {
                cb();
            }
            return time;
        }

        /**
         * Starts the session countdown warning
         * @param {Number} estimatedSecondsLeft - countdown time
         */
        SessionHandler.prototype.startSessionWarning = function(estimatedSecondsLeft) {
            //the time left is now decremented client side and it is possible it could become out of sync with the
            //server. for this reason it is 'estimated'
            var self = this;
            if(!countdownInterval) {
                //publishes a warning message every subsequent second
                notifications.sessionWarning(estimatedSecondsLeft);
                estimatedSecondsLeft = updateEstimatedTime(estimatedSecondsLeft, self.ping.bind(self));
                countdownInterval = window.setInterval(function() {
                    //inform other components of the impending doom.
                    notifications.sessionWarning(estimatedSecondsLeft);
                    estimatedSecondsLeft = updateEstimatedTime(estimatedSecondsLeft, self.ping.bind(self));
                }, 1000);
                self.startPolling();
            }
        };

        /**
         * Clears the current session warning (if any)
         * @param {Boolean} reconfirmSession
         * @param {Boolean} stopPinging
         */
        SessionHandler.prototype.clearSessionWarning = function(reconfirmSession, stopPinging) {
            if(reconfirmSession) {
                //the ping response will invoke this function again in the else block, clearing the timeout warning
                this.ping(true);
            } else {
                if(countdownInterval) {
                    window.clearInterval(countdownInterval);
                    notifications.removeNotification();
                    countdownInterval = null;
                }
                if(!stopPinging) {
                    this.startPolling();
                }

            }
        };

        /*----------------------------------------------------------------*/
        /* Expose configurable getInstance method
        /*----------------------------------------------------------------*/
        return {
            getInstance: function(options) {
                if (utils.isUndefined(instance)) {
                    instance = new SessionHandler(options);
                }
                return instance;
            }
        };
    })();
});
