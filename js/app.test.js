/** Note: Remove the commented out lines of assertion code to see fails. 

/* Require modules */
var $         = require('jquery'),
    Backbone  = require('backbone'),
    Router    = require('./common/router'),    
    events    = require('./common/eventChannel'),
    utils     = require('./common/utilities'),
    qunit     = require('./_vendor/qunit');

/**
 * Set the module for the following tests
 */
QUnit.module('Search');


// Test the pattern matching for the reg no and stock ref no text input value
test("Test pattern matching for input value", 2, function () {

	// Create variables for pass case
	var sPassInput = 'SO06DNV ARNFH-U-5728',
	    rPattern = /^[^\s]+\s[^\s]+$/;

	// Set as boolean for result of pattern match
	var bPassed = rPattern.test(sPassInput);

	ok(bPassed, 'A correct string input should be detected as true');

	// Create variables for fail case
	var sFailInput = 'SO06DNV ARNFH-U-5728 232432sdgd-dsfgdfsg';

	// Set as boolean for result of pattern match
	var bFailed = rPattern.test(sFailInput);

	strictEqual(bFailed, false, 'An incorrect string input should be detected as false');


});

/**************************************************************/


/**
 * Set the module for the following tests
 */
QUnit.module('Events Channel');


// Test the events channel to check events are triggered/listened to
asyncTest("Test event listen/trigger", 1, function () {

	// Set the event name
	var sEventName = 'testEvent';

	// Listen for event name
	events.on(sEventName, function () {
		// If we are in here then the event has been caught, so pass the test
		ok(true, 'Event is caught');
		// Resume testing
		start();
	});

	// Trigger the event, if the event is not caught then the test will fail as we expect two tests to be run
	events.trigger(sEventName);
});

// Test the events channel to check events are triggered/listened to and parameters are received
asyncTest("Test events listen/trigger with param", 1, function () {

	// Set the parameter and new event name
	var iParam = 2,
		sEventParamName = 'testParamEvent';

	// Listen for event name, capture param in function
	events.on(sEventParamName, function (iParam) {
		// If we are in here then the event has been caught, so pass the test
		strictEqual(iParam, 2, 'Event is caught and the param === 2');
		// Resume testing
		start();
	});		

	// Trigger the event, passing the param
	events.trigger(sEventParamName, iParam);
});

/**************************************************************/
