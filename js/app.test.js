/** Note: Remove the commented out lines of assertion code to see fails. 

/**
 * Set the module for the following tests
 */
module('Search');


// Test the pattern matching for the reg no and stock ref no text input value
test("Test pattern matching for input value", 2, function() {

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


