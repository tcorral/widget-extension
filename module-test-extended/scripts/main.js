define(function (require, exports, module) {

    var base = require('base');
    var core = require('core');
    var angular = base.ng;

    var deps = [
        core.name
    ];
    
    module.name = 'module-test-extended';

    module.exports = angular.module(module.name, deps).controller( require('./controllers') );
});