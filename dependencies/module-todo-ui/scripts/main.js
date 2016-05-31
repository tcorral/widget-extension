define(function (require, exports, module) {

  var angular = require('angular');
  var todoTaskComponent = require('./todo-tasks/main');

  var deps = [
    todoTaskComponent.name
  ];

  module.name = 'module-todo-ui';

  module.exports = angular.module(module.name, deps);
});
