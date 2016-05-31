define(function (require, exports, module) {

    var angular = require('angular');
    var controllers = require('./controllers');

    controllers.TodoController.$inject = [ 'filterFilter', '$scope', '$location' ];

    module.name = 'module-todo-extended';

    module.exports = angular.module(module.name, []).controller( controllers );
});
