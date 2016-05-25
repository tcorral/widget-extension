define(function (require, exports, module) {

    var angular = require('angular');

    var deps = [];
    
    module.name = 'module-todo-extended';

    module.exports = angular.module(module.name, deps).controller( require('./controllers') );
});