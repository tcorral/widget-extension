define(function (require, exports, module) {

    var baseWidget = require('base-widget');
    var angular = require('angular');

    module.name = 'extended-widget-ng';

    //@ngInject
    function run(widget, $rootScope) {
        var staticPath = '/static/';
        var widgetPath = widget.getOriginURI();
        var staticPosition = widgetPath.indexOf(staticPath) + staticPath.length;
        var contextPath = widgetPath.substring(0, staticPosition);
        $rootScope.template = contextPath + '/features/[BBHOST]/' + widget.getPreference('main:module') + '/templates/' + widget.getPreference('main:template');
    }

    function executeAngular(moduleName, widget, deps) {
        angular
            .module(moduleName, deps)
            .constant('widget', widget)
            .run(run);

        angular.bootstrap(widget.body, [moduleName]);
    }

    return function (widget, attributes, name) {
        var paths = requirejs.s.contexts._.config.paths;
        baseWidget(widget, attributes, paths, name, executeAngular);
    };
});