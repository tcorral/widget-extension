define(function (require, exports, module) {

    var baseWidget = require('base-widget');

    module.name = 'extended-widget';

    return function (widget) {
        baseWidget(widget, module);
    };
});