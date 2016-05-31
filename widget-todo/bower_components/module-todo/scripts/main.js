define(function (require, exports, module) {
    
    var angular = require('angular');

    var deps = [];
    
    module.name = 'module-todo';

    module.exports = angular.module(module.name, deps).controller( require('./controllers') );
});