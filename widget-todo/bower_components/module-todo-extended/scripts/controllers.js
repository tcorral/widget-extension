import {TodoController} from 'module-todo-controllers';

//@ngInject
function TodoControllerExt(filterFilter, $scope, $location) {
    const ctrl = this;
    TodoController.apply(this, arguments);


    if ($location.path() === '') {
        $location.path('/');
    }

    ctrl.remainingCount = 0;
    ctrl.location =  $location;


    window.onhashchange = () => {
        const path = window.location.hash;
        $scope.$evalAsync(() => {
            ctrl.statusFilter = (path === '#/active') ?
            { completed: false } : (path === '#/completed') ?
            { completed: true } : {};
        });
    };


    ctrl.clearDoneTodos = () => {
        ctrl.todos = ctrl.todos.filter(todo => {
            return !todo.completed;
        });
        ctrl.processTodos(ctrl.todos);
    };

    ctrl.markAll = checked => {
        ctrl.todos.forEach(todo => {
            ctrl.toggle(todo, checked);
        });
        ctrl.processTodos(ctrl.todos);
    };
}

export default {
    TodoController: TodoControllerExt
};