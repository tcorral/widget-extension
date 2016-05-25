# Widget Extension

Hi, if you have landed in this page is because you want to be more productive improving the reusability of your code.

The idea of this widget extension is to create a widget that is totally blackboxed.

## How we have been working till now:
- Stuff that was packaged together with the widget:
	- Templates
	- Controllers
	- Directives used only in that widget.
	- Scaffolding Styles
- Stuff that was used as a module:
	- Services
	- Common Directives
- Module Dependencies are added in widget code.


## Issues of working till now:
- Is difficult to change the templates used in the widget.
- Controllers are blackboxed and can not be extended.
- Directives that were used only in one widget and that after some time are needed in a different widget ...
	- Best case:
		- It will require some refactoring.
			- Remove it from the widget.
			- Move that directive to an existing module or create a module just to keep it reusable.
	- Worst case:
		- It's just copied and pasted in the other widget.
- Scaffolding Styles never can be reused.
- If a new dependency is required, the widget code should be modified so it's never blackboxed.

```
Managing all this together requires do some changes in the way we work.
```

## What we want:
- Never again touch the code of widgets once they have been released.
- Make easier change/extend behaviour.
- Make easier change/extend view.
- See at one sight what are the dependencies of my widget.
- Do it as framework agnostic as possible.

## How we want to do that:
- Dependencies are setup in the model.xml.
- Main module and templates are setup in the model.xml.
- Use modules to store:
	- Behaviour - JS files
	- View - HTML files
	- Styles - CSS files
- Changing the used module allows to change easily from AngularJS to a different framework with too much effort.
	
### Base Widget:
Base widget is pretty much a simple widget but with the responsability of:

- Fetching the dependencies.
- Setup the main template.
- Instanciate the module.

### Widget:
What widget requires:

- Give a name to the module.
- Create a model.xml 
- An index.html with a ng-include directive that will load the template.

## Run example:

For developing locally without portal:

- If you have not done it already, you should install [bb-lp-cli](https://github.com/Backbase/bb-lp-cli) tooling.
- Execute ``bblp start``
- Open [http://localhost:3000](http://localhost:3000)
![TODO Landing Page](./documentation/todo-landing.png)
- Type the title of your task.
![TODO Input Task Name](./documentation/todo-input-task-name.png)
- Press ENTER key.
![TODO Add Task](./documentation/todo-add-task.png)
- Double click in the title to edit.
![TODO Edit Task](./documentation/todo-edit-task-0.png)
- Modify the title.
![TODO Modify Title Task](./documentation/todo-edit-task-1.png)
- Press ENTER key.
![TODO Update Task](./documentation/todo-edit-task-2.png)
- Do/Undo clicking in the button before the title.
![TODO Do/Undo Task](./documentation/todo-do-undo-task.png)
- Move the mouse over the task to show the button to remove the task.
![TODO Show Remove Button](./documentation/todo-remove-task-0.png)
- Remove a task clicking in the button after the title.
![TODO Remove Task](./documentation/todo-remove-task-1.png)

### Add more features extending the logic and changing the view.
- Open the model.xml file.
- Change the property name ```deps:module-todo``` to ```deps:module-todo-extended```
- Reload the page and see what has changed.
![TODO Extended Landing Page](./documentation/todo-extended-landing.png)
- Type the title of your task.
![TODO Extended Input Task Name](./documentation/todo-extended-input-task-name.png)
- Press ENTER key.
![TODO Extended Add Task](./documentation/todo-extended-add-task.png)
- Now you can also filter using those new links.
![TODO Extended Filter Links](./documentation/todo-extended-filtering-feature.png)
- Click on them to see how the content is hidden or shown depending the status of the task.
![TODO Extended Filtering Completed](./documentation/todo-extended-filtering-completed-tasks.png)
![TODO Extended Filtering Active](./documentation/todo-extended-filtering-active-tasks.png)
- Do the task clicking the button before the title while filtering by active tasks and see how it dissapears.
- Click in the button that appears inside of the input to toggle all the tasks.
![TODO Extended Toggle Tasks](./documentation/todo-extended-mark-all.png)
- Mark as done one or more tasks 
- Click in the *Clear Completed* link to see how they are removed from the list.
![TODO Extended Clear Completed](./documentation/todo-extended-clear-completed-0.png)
![TODO Extended Clear Completed](./documentation/todo-extended-clear-completed-1.png)


### Change the styling.
- Open ```scripts/base.less```
- Change the content:
 - Before:
 ```
 @import '../bower_components/module-todo/styles/base';
 ```
 - After:
 ```
 @import '../bower_components/module-todo-extended/styles/base';
 ```
- You can see how it changes:
  - Before:
  ![TODO Style](./documentation/todo-style.png)
  - After:
  ![TODO Extended Style](./documentation/todo-extended-style.png)


For developing using portal:

- Requires to import modules
- Requires to execute ```bb import-item``` each time you modify the model.xml or use ```bb import-item -W``` to import it on each code change.


Enjoy it!
