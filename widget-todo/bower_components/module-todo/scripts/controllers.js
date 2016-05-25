define(function (require, exports, module) {

    var $ = require('jquery');

    //@ngInject
    function TodoController(filterFilter, $scope) {
        var ctrl = this;
        var processTodos = ctrl.processTodos = function (todos) {
            ctrl.remainingCount = filterFilter(todos, { completed: false }).length;
            ctrl.allChecked = !ctrl.remainingCount;
        };
        var originalTodo;

        ctrl.newTodo = '';
        ctrl.editedTodo = null;
        ctrl.allChecked = false;
        ctrl.todos = [];

        ctrl.toggle = function (todo, checked) {
            todo.completed = checked || !todo.completed;
            processTodos(ctrl.todos);
        };

        ctrl.addTodo = function () {
            var newTodo = ctrl.newTodo.trim();
            if(!newTodo.length) {
                return;
            }

            ctrl.todos.push({
                title: newTodo,
                completed: false
            });

            ctrl.newTodo = '';
            processTodos(ctrl.todos);
        };

        ctrl.editTodo = function (todo) {
            ctrl.editedTodo = todo;
            originalTodo = jQuery.extend(true, {}, todo);
            processTodos(ctrl.todos);
        };

        ctrl.doneEditing = function (todo) {
            ctrl.editedTodo = null;
            todo.title = todo.title.trim();

            if(!todo.title) {
                ctrl.removeTodo(todo);
            }
            processTodos(ctrl.todos);
        };

        ctrl.revertEditing = function (todo) {
            ctrl.todos[ctrl.todos.indexOf(todo)] = originalTodo;
            ctrl.doneEditing(originalTodo);
            originalTodo = null;
            processTodos(ctrl.todos);
        };

        ctrl.removeTodo = function (todo) {
            ctrl.todos.splice(ctrl.todos.indexOf(todo), 1);
            processTodos(ctrl.todos);
        };
    }

    module.exports = {
        TodoController: TodoController
    };
});