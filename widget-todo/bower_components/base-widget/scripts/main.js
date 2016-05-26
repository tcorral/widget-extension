define(function () {
    var reModule = /^dependency/g;

    return function (widget, attributes, paths, name, execute) {
        var deps = [];
        var key;
        var modules = [];
        var modName;
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