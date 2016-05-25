define(function (require, exports, module) {
    var reModule = /^deps:/g;

    return function (widget, module, execute) {
        var deps = [];
        var key;
        var modules = [];
        var modName;
        module = module || 'module_' + Math.random();
        for (key in widget.attributes) {
            if (widget.attributes.hasOwnProperty(key)) {
                if (reModule.test(widget.attributes[key].name)) {
                    modName = widget.attributes[key].name.replace(reModule, '');
                    if (!(modName in requirejs.s.contexts._.config.paths)) {
                        modName = widget.attributes[key].value;
                    }
                    modules.push(modName);
                }
            }
        }
        if (modules.length === 0) {
            execute(module.name, widget, deps);
        } else {
            window.require(modules, function () {
                var args = Array.prototype.slice.call(arguments);
                args.forEach(function (mod) {
                    deps.push(mod.name);
                });
                execute(module.name, widget, deps);
            });
        }
    };
});