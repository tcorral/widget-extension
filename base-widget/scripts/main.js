define(function (require, exports, module) {

    var base = require('base');
    var angular = base.ng;

    var reModule = /^module:/g;

    function run(widget, $rootScope) {
        var staticPath = '/static/';
        var widgetPath = widget.getOriginURI();
        var staticPosition = widgetPath.indexOf(staticPath) + staticPath.length;
        var contextPath = widgetPath.substring(0, staticPosition);
        $rootScope.template = contextPath+ '/features/[BBHOST]/' + widget.getPreference('main:module') + '/templates/' + widget.getPreference('main:template');
    }
    run.$inject = ['widget', '$rootScope'];

    function executeAngular(moduleName, widget, deps) {
        angular
            .module(moduleName, deps)
            .constant('widget', widget)
            .run(run);

        angular.bootstrap(widget.body, [ moduleName ]);
    }

    return function (widget, module) {
        var deps = [];
        var key;
        var modules = [];
        var modName;
        module = module || 'module_' + Math.random();
        for(key in widget.attributes) {
            if(widget.attributes.hasOwnProperty(key)) {
                if(reModule.test(widget.attributes[key].name)){
                    modName = widget.attributes[key].name.replace(reModule, '');
                    if(!(modName in requirejs.s.contexts._.config.paths)) {
                        modName = widget.attributes[key].value;
                    }
                    modules.push(modName);
                }
            }
        }
        if(!modules.length) {
            executeAngular(module.name, widget, deps);
        } else {
            require(modules, function () {
                var args = Array.prototype.slice.call(arguments);
                args.forEach(function (mod) {
                    deps.push(mod.name);
                });
                executeAngular(module.name, widget, deps);
            });
        }
    };
});