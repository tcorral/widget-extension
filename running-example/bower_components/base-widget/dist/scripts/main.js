/* base-widget@v build with ♥ by bb-lp-cli@v1.9.1 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("base"));
	else if(typeof define === 'function' && define.amd)
		define(["base"], factory);
	else if(typeof exports === 'object')
		exports["base-widget"] = factory(require("base"));
	else
		root["base-widget"] = factory(root["base"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
	
	    var base = __webpack_require__(2);
	    var angular = base.ng;
	
	    var reModule = /^deps:/g;
	
	    function run(widget, $rootScope) {
	        var staticPath = '/static/';
	        var widgetPath = widget.getOriginURI();
	        var staticPosition = widgetPath.indexOf(staticPath) + staticPath.length;
	        var contextPath = widgetPath.substring(0, staticPosition);
	        $rootScope.template = contextPath + '/features/[BBHOST]/' + widget.getPreference('main:module') + '/templates/' + widget.getPreference('main:template');
	    }
	
	    run.$inject = ['widget', '$rootScope'];
	
	    function executeAngular(moduleName, widget, deps) {
	        angular.module(moduleName, deps).constant('widget', widget).run(run);
	
	        angular.bootstrap(widget.body, [moduleName]);
	    }
	
	    return function (widget, module) {
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
	            executeAngular(module.name, widget, deps);
	        } else {
	            __webpack_require__(3)!/* require */(/* empty */function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = modules; (function () {
	                var args = Array.prototype.slice.call(arguments);
	                args.forEach(function (mod) {
	                    deps.push(mod.name);
	                });
	                executeAngular(module.name, widget, deps);
	            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.call(this));
	        }
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./main": 1,
		"./main.js": 1
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 3;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=main.js.map