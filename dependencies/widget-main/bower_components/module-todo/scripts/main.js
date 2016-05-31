define(function (require, exports, module) {

    var angular = require('angular');
    var controllers = require('./controllers');

    controllers.TodoController.$inject = [ 'filterFilter' ];

    module.name = 'module-todo';

    module.exports = angular.module(module.name, []).controller( controllers );
});
