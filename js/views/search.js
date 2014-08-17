/* Require modules */
var $        = require('jquery'),
    Backbone = require('backbone'),
    models   = require('../models/global'),
    template = require("../templates/search.html"),
    utils    = require("../common/utilities"),
    events   = require('../common/eventChannel'),
    router   = require('../common/router.js');

// Assign jQuery instance to Backbone.$
Backbone.$ = $;

// Set the view as the module export
module.exports = Backbone.View.extend({

	// Is called at instantiation
    initialize: function () {

        // Call function to render the view
        this.render();
    },  

    // Capture events
    events: {
        'submit form': 'onFormSubmit'
    },

    // Populates the view's element with the new HTML
    render: function () {     	
        // Log status
        utils.log("Search", "viewRender");
        
    	// Populate template with data
        this.$el.html( template() );

        // Enable chaining
        return this;
    },

    onFormSubmit: function (e) {
        // Prevent form from submitting
        e.preventDefault();

        // Set the form element to a variable
        var elForm = this.$el.find('form');

        // Get the input value
        var sRef   = elForm.find('input[name=ref]').val();

        // Set bErrors to false initially. Set message and pattern variables. The pattern 
        // will match a string that has two sets of characters with a space delimitting them
        var bErrors = false,
            sMessage = '',
            rPattern = /^[^\s]+\s[^\s]+$/,
            elError = this.$el.find('.errors');

        // If the value is empty
        if (sRef === '') {
            // Set to true since there's an error
            bErrors = true;
            // Set the message
            sMessage = 'You have not entered anything!';
        } else {
            // Check to see we have two strings seperated by a space
            if (!rPattern.test(sRef)) bErrors = true;
            // Set the message
            sMessage = 'You have not entered the refs seperated by a space';
        }
        // END if

        // If there are any errors
        if (bErrors) {

            // Find the errors element and remove/add the classes to enable the styles and then set the HTML to the message string
            elError.removeClass('fadeOutDown').addClass("alert alert-danger animated fadeInUp").html(sMessage);
            // Prevent further execution.
            return false;
        } 
        // END if errors

        // Find the errors element if it has the danger class and remove/add the classes to enable the styles and clear the html.
        if (elError.hasClass('alert-danger')) elError.removeClass('fadeInUp').addClass("alert alert-danger animated fadeOutDown");

        // Seperate the string into an array of the two refs
        var aRefs = sRef.split(' ');

        // Call function to Obfuscate the two strings
        this.ObfuscateRefs(aRefs[0], aRefs[1]);
    },

    ObfuscateRefs: function (sReg, sStock) {

        // Reverse the reg no
        var sReveredReg = sReg.split('').reverse().join('');

        // Get the length of reg string
        var iRegLength = sReg.length;

        // Set variable to hold the new string
        var sObfuscated = '';

        // Loop for the length of the reg
        for ( var i = 0; i < iRegLength; i++ ) {
            // Add the nth character of the stock and reg nos
            sObfuscated += sStock[i] +''+ sReveredReg[i];
        }

        // Add the 9th character of the stock no
        sObfuscated += sStock[10];

        // Trigger event, passing the obfuscated string
        events.trigger('ref:obfuscated', sObfuscated);
    }

});
