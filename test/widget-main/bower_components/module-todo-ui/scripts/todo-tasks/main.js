define(function (require, exports, module) {

  var angular = require('angular');
  var directives = require('./directives');

  module.name = 'todo-task-component';

  module.exports = angular.module(module.name, []).directive( directives );
});
