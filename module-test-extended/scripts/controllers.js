define(function (require, exports, module) {

    var TestController = require('module-test-path/scripts/controllers').TestController;

    function TestControllerExt() {
        var vc = this;
        TestController.apply(this, arguments);
        vc.dummy = 'Dummy222';
        vc.other = 'Extended';
    }
    
    exports.TestController = TestControllerExt;
});