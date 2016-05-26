define(function () {    
    var $ = require('jquery');
    
    var reModule = /^dependency/g;
    
    function injectHTML(widget) {
        var basicPath = widget.getOriginURI().replace('/index.html', '');
        var staticPath = basicPath === '.' ? 'bower_components' : basicPath + '../../' ;
        var isLocalEnvironment = staticPath === 'bower_components';
        var modulesPath = isLocalEnvironment ?  '/' : '/features/[BBHOST]/';
        var template = staticPath + modulesPath + widget.getPreference('main:module') + '/templates/' + widget.getPreference('main:template');
        $.ajax({
                url: template,
                dataType: 'text'
            })
            .then(function (html) {
                widget.body.innerHTML = html;
            });
    }
    
    return function (widget, attributes, paths, name, execute) {
        var deps = [];
        var key;
        var modules = [];
        var modName;
        
        injectHTML(widget);
        
        name = name || 'module_' + Math.random();
        for (key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                if (reModule.test(attributes[key].name)) {
                    modName = attributes[key].name.replace(reModule, '');
                    if (!(modName in paths)) {
                        modName = attributes[key].value;
                    }
                    if(modName) {
                        modules.push(modName);
                    }
                }
            }
        }
        if (modules.length === 0) {
            execute(name, widget, deps);
        } else {
            window.require(modules, function () {
                var args = Array.prototype.slice.call(arguments);
                args.forEach(function (mod) {
                    deps.push(mod.name);
                });
                execute(name, widget, deps);
            });
        }
    };
});