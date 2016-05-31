define(function () {

    var reModule = /^dependency/g;

    function ajax(url, callback, data, x) {
        try {
            x = new(this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
            x.open(data ? 'POST' : 'GET', url, 1);
            x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            x.onreadystatechange = function () {
                x.readyState > 3 && callback && callback(x.responseText, x);
            };
            x.send(data)
        } catch (e) {
            window.console && console.log(e);
        }
    }

    function injectHTML(widget) {
        var mainModule = widget.getPreference('main:module');
        var template = widget.getPreference('main:template');
        var staticStr;
        var path;
        var posStaticInPath;
        var basicPath;
        var staticPath;
        var isLocalEnvironment;
        var modulesPath;
        var templatePath;
        if(mainModule && template) {
            staticStr = 'static';
            path = widget.getOriginURI();
            posStaticInPath = path.indexOf(staticStr);
            basicPath = path.substr(0, posStaticInPath + staticStr.length);
            staticPath = basicPath === '.' ? 'bower_components' : basicPath;
            isLocalEnvironment = staticPath === 'bower_components';
            modulesPath = isLocalEnvironment ?  '/' : '/features/[BBHOST]/';
            templatePath = staticPath + modulesPath + mainModule + '/templates/' + template;
            ajax(templatePath, function (html) {
                widget.body.innerHTML = html;
            });
            return true;
        } else {
            console.error('Main widget should be extended. Main module and/or template is/are missing.');
            return false;
        }
    }

    return function (widget, attributes, paths, name, execute) {
        var deps = [];
        var key;
        var modules = [];
        var modName;

        var injected = injectHTML(widget);

        if(injected) {
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

            modules.push(widget.getPreference('main:module'));

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
        }


    };
});
