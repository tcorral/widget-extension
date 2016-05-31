define(function (require, exports, module) {
    var baseWidget = require('base-widget-ng');
    
    return function (widget) {
        baseWidget(widget, widget.attributes, widget.id);
    }
});