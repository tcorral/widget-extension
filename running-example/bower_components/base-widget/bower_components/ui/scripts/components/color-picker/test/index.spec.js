/**
 *  ----------------------------------------------------------------
 *  Copyright © Backbase B.V.
 *  ----------------------------------------------------------------
 *  Author : Backbase R&D - Amsterdam - New York
 *  Filename : index.spec.js
 *  Description: Sample component unit test
 *  ----------------------------------------------------------------
 */

'use strict';
// use angular mocks because it is an angular component
require('angular-mocks');

// include the component
var component = require('../scripts/main');

/*----------------------------------------------------------------*/
/* Module testing
/*----------------------------------------------------------------*/
describe('ui.color-picker testing suite', function() {
    it('should be named launchpad.ui.color-picker', function() {
        expect(component.name).toBe('launchpad.ui.color-picker');
    });
});
