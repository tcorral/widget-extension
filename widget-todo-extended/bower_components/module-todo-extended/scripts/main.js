import angular from 'angular';
import controllers from './controllers';

const deps = [];

module.name = 'module-todo-extended';

module.exports = angular.module(module.name, deps).controller( controllers );