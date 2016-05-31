define(function (require, exports, module) {

  var templateHandlers = {
    todoTasks: function getTemplate() {
      var template = '';
      template += '<li ng-repeat="todo in todos track by $index" ng-class="{completed: todo.completed, editing: todo == editedTodo}">';
      template += '   <div class="view">';
      template += '     <input class="toggle" type="checkbox" ng-checked="todo.completed" ng-click="onToggle(todo)">';
      template += '     <label ng-dblclick="onEdit(todo)">{{todo.title}}</label>';
      template += '     <button class="destroy" ng-click="onRemove(todo)"></button>';
      template += '   </div>';
      template += '   <form ng-submit="onDoneEditing(todo)">';
      template += '     <input class="edit" ng-trim="false" ng-model="todo.title" ng-blur="onDoneEditing(todo)" todo-escape="onRevertEditing(todo)" todo-focus="todo == editedTodo">';
      template += '   </form>';
      template += '</li>';
      return template;
    }
  };

  var todoTasks = function () {
    return {
      restrict: 'E',
      scope: {
        todos: '=',
        editedTodo: '=',
        onToggle: '&',
        onEdit: '&',
        onRemove: '&',
        onDoneEditing: '&',
        onRevertEditing: '&'
      },
      template: templateHandlers.todoTasks()
    }
  };

  exports.todoTasks = todoTasks;
});
