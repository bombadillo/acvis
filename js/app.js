/* Require modules */
var $         = require('jquery'),
    Backbone  = require('backbone'),
    Router    = require('./common/router'),    
    events    = require('./common/eventChannel'),
    utils     = require('./common/utilities');

// Set jQuery to window object to enable global access
window.jQuery = $;

// Require bootstrap.
bootstrap = require('./_vendor/bootstrap');

// Assign jQuery instance to Backbone.$
Backbone.$ = $;

// Create instance of router
var router = new Router();

// Call function to start the Backbone history functionality
Backbone.history.start();

// Listen for ref being obfuscated
events.on('ref:obfuscated', function (sObfuscated) {
	// Navigate manually to the route
	router.navigate('results/'+ sObfuscated, { trigger: true });
});

