/**
 * This module is responsible for internationalisation of all Launchpad widgets.
 *
 * #####Configuration
 *
 * External settings that are passed to it are:
 *
 * - `locale` – <a href="http://www.w3.org/TR/html401/struct/dirlang.html#h-8.1.1">Language code</a>.
 * Read from the lang attribute of html tag of the page.
 * If lang attribute is not defined, fallbacks to browser's default language.
 * You can change locale on the fly by publishing `lpCoreI18nUtils.LOCALE_CHANGE_EVENT`
 *
 * - `path` – Path where common translation files and angular locale files are stored.
 * Default path is `$(contextRoot)/static/launchpad/modules/config/i18n`
 *
 * - `mergedFiles` – Used to determine if translation files are merged
 * into one (one common and one per widget) or every language is separated in it's own file.
 * Default value is `true` (files are merged)
 *
 * Backend is responsible for determining the right locale and printing it as a value of `html.lang` attribute.
 * It is doing so in the following order:
 *
 * 1. If present, then return launchpad user(party) preference `lpLocale`.
 * 2. If present, then return page preference `lpLocale`.
 * 3. If present, then return portal preference `lpLocale`.
 * 4. If present, then return value of `launchpad.defaultLocale` defined in `backbase.properties`.
 *
 * To change the `path` and `mergedFiles` settings, create i18n object with those keys
 * on global window.launchpad object, for example:
 *
 * ```
 * window.launchpad = {
 *   i18n: {
 *     path: 'bower_components/config/i18n',
 *     mergedFiles: false
 *   }
 * }
 * ```
 *
 * Path to <a href="https://github.com/angular/angular.js/tree/master/src/ngLocale" target="_blank">angular locale files</a>
 * is built like: `path + '/ng-locale/angular-locale_{locale}.js'`,
 * where `{locale}` is replaced with current locale string.
 *
 * Every Launchpad widgets contains property `locale` (accessible in Portal Manager).
 * This property is used just to enable/disable i18n support.
 * If there is no value, widget will not be initialized for i18n support.
 * Any value will enable i18n but it is never used internally.
 *
 * #####Translation files
 *
 * Widget translation strings are defined inside `locale/all.json` in widget's directory
 * and in `i18n.path/common.json` file. This applies when `mergedFiles` setting is set to true,
 * otherwise, each laguage will have it's own file in the same location.
 * Translation file can look like this:
 *
 * ```
 * {
 *   "nl-NL": {
 *     "Enrol for Estatements": "Schrijf je in voor eStatements",
 *     "Statement as of": "Verklaring als van"
 *   },
 *
 *   "ru-RU": {
 *     "Enrol for Estatements": "Получать отчеты",
 *     "Statement as of": "Отчет за"
 *   }
 * }
 * ```
 *
 * #####Translation
 * To translate string used in Launchpad Widget html template, use angular tranlate filter:
 *
 * ```
 * <span>{{'Statement as of'|translate}}</span>
 * ```
 *
 * or lp-i18n directive described below.
 *
 * #####Enable i18n Language Switching in the UI
 * To Enable i18n Language Switching in the UI, follow the below instructions to add a preference to a widget.
 * 1. Open the PortalManager.
 * 2. Navigate the Explorer to `Portals > Retail-banking > Items > Home`.
 * 3. Select "widget-navbar-advanced..".
 * 4. Select the "Properties" tab.
 * 5. Activate the add property button "+".
 * 6. In the "Create Preference" modal set.
 *  1. Name to locales.
 *  2. Label to locales.
 *  3. Value to en-US,nl-NL  (comma separated list of languages).
 * 7. Click save and now in the Client Portal a language menu should appear.
 *
 * Note: the language preference is not saved in a session.
 *
 *
 * @copyright Backbase B.V.
 * @author Backbase R&D - Amsterdam - New York
 *
 * #####References</h4>
 *
 * - <a target="_blank" href="http://angular-translate.github.io/">
 *       http://angular-translate.github.io/</a>
 * - <a target="_blank" href="https://hacks.mozilla.org/2014/12/introducing-the-javascript-internationalization-api">
 *       https://hacks.mozilla.org/2014/12/introducing-the-javascript-internationalization-api</a>
 *
 * @name i18n
 * @memberof core
 * @ngModule
 */

define(function (require, exports, module) {
    'use strict';

    module.name = 'core.i18n';

    var base = require('base');
    // 3rd party modules
    require('angular-translate');
    require('angular-dynamic-locale');
    require('angular-sanitize');

    // some core modules
    var utils = require('../utils/main');
    var bus = require('../bus/main');
    var error = require('../error/main');
    var cache = require('../cache/main');

    var deps = [
        'pascalprecht.translate',
        'tmh.dynamicLocale',
        'ngSanitize',
        utils.name,
        error.name,
        cache.name,
        bus.name
    ];

    // @ngInject
    function run(lpCoreBus, lpCoreI18n, lpCoreI18nUtils) {

        lpCoreBus.subscribe(lpCoreI18nUtils.LOCALE_CHANGE_EVENT, function (locale) {
            lpCoreI18n.setLocale(locale);
        });
    }

    module.exports = base.createModule(module.name, deps)
        .value('lpI18nCommonTranslation') // common translations stored in loader factory
        .constant(require('./utils')) // lpCoreI18nUtils
        .factory(require('./loader')) // lpCoreI18nLoader
        .provider(require('./i18n')) // lpCoreI18n
        .filter(require('./filters')) // currencySymbol
        .directive(require('./directives')) // lp-i18n & lp-i18n-switch
        .factory(require('./migration/utils')) // exposes i18nUtils.loadMessages
        .directive(require('./migration/lp-message')) // contains lp-message directive
        .run(run);
});
