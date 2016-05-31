define(function (require, exports, module) {

    var baseWidget = require('base-widget');
    var angular = require('angular');

    module.name = 'extended-widget-ng';

    function executeAngular(moduleName, widget, deps) {
        angular
            .module(moduleName, deps)
            .constant('widget', widget);

        angular.bootstrap(widget.body, [moduleName]);
    }

    return function (widget, attributes, name) {
        var paths = requirejs.s.contexts._.config.paths;
        baseWidget(widget, attributes, paths, name, executeAngular);
    };
});
