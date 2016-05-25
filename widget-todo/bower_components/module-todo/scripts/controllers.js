import $ from 'jquery';

//@ngInject
function TodoController(filterFilter) {
    const ctrl = this;
    const processTodos = ctrl.processTodos = function (todos) {
        ctrl.remainingCount = filterFilter(todos, { completed: false }).length;
        ctrl.allChecked = !ctrl.remainingCount;
    };
    let originalTodo;

    ctrl.newTodo = '';
    ctrl.editedTodo = null;
    ctrl.allChecked = false;
    ctrl.todos = [];

    ctrl.toggle = (todo, checked) => {
        todo.completed = checked || !todo.completed;
        processTodos(ctrl.todos);
    };

    ctrl.addTodo = () => {
        const newTodo = ctrl.newTodo.trim();
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

    ctrl.editTodo = todo => {
        ctrl.editedTodo = todo;
        originalTodo = $.extend(true, {}, todo);
        processTodos(ctrl.todos);
    };

    ctrl.doneEditing = todo => {
        ctrl.editedTodo = null;
        todo.title = todo.title.trim();

        if(!todo.title) {
            ctrl.removeTodo(todo);
        }
        processTodos(ctrl.todos);
    };

    ctrl.revertEditing = todo => {
        ctrl.todos[ctrl.todos.indexOf(todo)] = originalTodo;
        ctrl.doneEditing(originalTodo);
        originalTodo = null;
        processTodos(ctrl.todos);
    };

    ctrl.removeTodo = todo => {
        ctrl.todos.splice(ctrl.todos.indexOf(todo), 1);
        processTodos(ctrl.todos);
    };
}

export default {
    TodoController: TodoController
};