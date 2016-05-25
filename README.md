# Test Widget Extension

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
- The text you can see:
	```
	Dummy
	```
- Change the widget without touching the widget code:
	- Change the view:
		- Open the model.xml file
		- Change the property value ```main:template``` to *other.html*
		- Reload the page.
		- Now you can see ```Dummy + manolo + tomas```
	- Change the behaviour:
		- Open the model.xml file
		- Change the property name ```deps:module-test``` to ```deps:module-test-extended```
		- Reload the page.
		- Now you should see:
			- An alert
			- The text has changed:
				- Before:
				```
				Dummy + manolo + tomas
				```
				- After:
				```
				Dummy222 + manolo + tomas
				```
	- Change the view and the behaviour:
		- Open the model.xml file
		- Change the property name ```deps:module-test``` to ```deps:module-test-extended```
		- Change the property value ```main:module``` to ```module-test-extended```
		- Change the property value ```main:template``` to *home.html*
		- Reload the page.
		- Now you should see:
			- An alert
			- The text has changed:
				- Before: 
				```
				Dummy222 + manolo + tomas
				```
				- After: 
				```
				Dummy222 
				Extended
				```


For developing using portal:

- Requires to import modules
- Requires to execute ```bb import-item``` each time you modify the model.xml.


Enjoy it!
