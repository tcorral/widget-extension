define(function (require, exports, module) {

    var TodoController = require('../../module-todo/scripts/controllers').TodoController;
    
    //@ngInject
    function TodoControllerExt(filterFilter, $scope, $location) {
        var ctrl = this;
        TodoController.apply(this, arguments);


        if ($location.path() === '') {
            $location.path('/');
        }
        
        ctrl.remainingCount = 0;
        ctrl.location =  $location;


        window.onhashchange = function () {
            var path = window.location.hash;
            $scope.$evalAsync(function () {
                ctrl.statusFilter = (path === '#/active') ?
                { completed: false } : (path === '#/completed') ?
                { completed: true } : {};
            });
        };


        ctrl.clearDoneTodos = function () {
            ctrl.todos = ctrl.todos.filter(function (todo) {
                return !todo.completed;
            });
            ctrl.processTodos(ctrl.todos);
        };

        ctrl.markAll = function (checked) {
            ctrl.todos.forEach(function (todo) {
                ctrl.toggle(todo, checked);
            });
            ctrl.processTodos(ctrl.todos);
        };
    }

    exports.TodoController = TodoControllerExt;
});