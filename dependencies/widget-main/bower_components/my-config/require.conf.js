(function(root) {
  'use strict';

  var launchpad = root.launchpad || {};
  var staticPath = launchpad.staticRoot ? launchpad.staticRoot : 'bower_components';
  var isSameStaticAndStaticRoot = staticPath === launchpad.staticRoot;
  var modulesPath = isSameStaticAndStaticRoot ? '/features/[BBHOST]/' : '/';
  var widgetsPath = isSameStaticAndStaticRoot ? '/widgets/[BBHOST]/' : '/';

  require.config({
    paths: {
      'todo-lib': staticPath + modulesPath + 'todo-lib',
      'base-widget': staticPath + modulesPath + 'base-widget/dist/scripts',
      'base-widget-ng': staticPath + modulesPath + 'base-widget-ng/dist/scripts',
      'module-todo': staticPath + modulesPath + 'module-todo/scripts',
      'module-todo-controllers': staticPath + modulesPath + 'module-todo/scripts/controllers',
      'module-todo-extended': staticPath + modulesPath + 'module-todo-extended/dist/scripts',
      'module-todo-ui': staticPath + modulesPath + 'module-todo-ui/scripts'
    },
    // Register packages
    packages: [
      'base-widget',
      'base-widget-ng',
      'todo-lib',
      'module-todo',
      'module-todo-extended',
      'module-todo-ui'
    ]
  });
}(window));
