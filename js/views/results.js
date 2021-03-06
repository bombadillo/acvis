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
    oImageCache: {},

    // Integer to keep count of loaded images
    currentImageLoadCount: 0,

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

        // Replace the view's defaults with the passed in options
        this.options = _.defaults(options || {}, this.options);

        // Call function to render the view
        this.getImages();
    },  

    // Populates the view's element with the new HTML
    render: function () {      
        // Log status
        utils.log("Results", "viewRender");

        // Populate template with data
        this.$el.html( template( { images: this.oImageCache[this.options.sObfuscated] } ) );

        // Loop each of the images and fade them in
        this.$el.find('img').each(function (i) {
            // Set the current element
            var elImg = $(this);
            // Set a timeout so that each image comes in slightly after the last
            setTimeout(function () {                
                // Add the fadeIn class to enable the CSS animation
                elImg.addClass('fadeIn');
            }, i * 200);
        });

        // Enable chaining
        return this;
    },

    // Gets the images for the obfuscated string. Will use cache if it exists
    getImages: function () {

        // Reset image load count
        this.currentImageLoadCount = 0;

        // Check to see if cache for obfuscated ref exists
        if (this.oImageCache[this.options.sObfuscated]) {
            // Call render function
            this.render();

            // Log that we're using cache
            utils.log('use cache');
            
            // Prevent further execution
            return false;
        }
        
        // Log that we're querying server
        utils.log('search server');
        
        // If we're here then the cache does not exist. Let's create one
        this.oImageCache[this.options.sObfuscated] = [];

        // Loop each of the array items
        for ( var i = 0; i < this.aPossibleImages.length; i++ ) {

            // Replace the placeholder string with the obfuscated ref
            var sImageUrl = this.aPossibleImages[i].replace('%ref', this.options.sObfuscated);
            
            // Call function to create image
            this.createImage(sImageUrl);     
        }
        // END loop
    },

    // Creates an image object and listens for load/error events
    createImage: function (sImageUrl) {
        // Create new image object
        var img = new Image();
        
        // Set scope
        var $this = this;

        // Set the source to the current item
        img.src = sImageUrl;

        // Set load and error event listeners
        $(img).load( function (){
            // Increment the load count
            $this.currentImageLoadCount++;

            // Add the src of the image to the array
            $this.oImageCache[$this.options.sObfuscated].push(sImageUrl);   

            // If the count is equal to the length of the possible images, call render function
            if ($this.currentImageLoadCount === $this.aPossibleImages.length) $this.render();  
        })
        .error( function () {
            // Increment the load count
            $this.currentImageLoadCount++;

            // If the count is equal to the length of the possible images, call render function
            if ($this.currentImageLoadCount === $this.aPossibleImages.length) $this.render();  
        });  
    }

});

