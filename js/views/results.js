/* Require modules */
var $        = require('jquery'),
    Backbone = require('backbone'),
    _        = require('underscore'),
    models   = require('../models/global'),
    template = require("../templates/results.html"),
    utils    = require("../common/utilities"),
    events   = require('../common/eventChannel');

// Assign jQuery instance to Backbone.$
Backbone.$ = $;

// Set the view as the module export
module.exports = Backbone.View.extend({

	// Array will hold the eventual pool of images
	aImages: [],

	// Array to hold all possible images
	aPossibleImages: [
		'http://imagecache.arnoldclark.com/imageserver/%ref/350/i/',
		'http://imagecache.arnoldclark.com/imageserver/%ref/350/6/',
		'http://imagecache.arnoldclark.com/imageserver/%ref/350/f/',
		'http://imagecache.arnoldclark.com/imageserver/%ref/350/4/',
		'http://imagecache.arnoldclark.com/imageserver/%ref/350/5/',
		'http://imagecache.arnoldclark.com/imageserver/%ref/350/r/',
		'http://imagecache.arnoldclark.com/imageserver/%ref/800/4/',
		'http://imagecache.arnoldclark.com/imageserver/%ref/800/i/',
		'http://imagecache.arnoldclark.com/imageserver/%ref/800/6/',
		'http://imagecache.arnoldclark.com/imageserver/%ref/800/f/',
		'http://imagecache.arnoldclark.com/imageserver/%ref/800/5/',
		'http://imagecache.arnoldclark.com/imageserver/%ref/800/r/'
	],
 
	// Is called at instantiation
    initialize: function (options) {
        // Log status
        utils.log("Results", "viewRender");

        // Replace the view's defaults with the passed in options
        this.options = _.defaults(options || {}, this.options);

        // Call function to render the view
        this.getImages();
    },  

    // Populates the view's element with the new HTML
    render: function () {     	

    	// Populate template with data
        this.$el.html( template( { images: this.aImages } ) );

        // Enable chaining
        return this;
    },

    getImages: function () {

    	// Loop each of the array items
    	for ( var i = 0; i < this.aPossibleImages.length; i++ ) {
    		// Replace the placeholder string with the obfuscated ref
    		this.aPossibleImages[i] = this.aPossibleImages[i].replace('%ref', this.options.sObfuscated);
    		
    		// Create new image object
			var img = new Image();
			// Set the source to the current item
			img.src = this.aPossibleImages[i];

			// If the height does not equal 0 we have an image
			if (img.height !== 0) this.aImages.push(this.aPossibleImages[i]);
    	}
    	// END loop

    	// Call function to render the view
    	this.render();
    }

});

