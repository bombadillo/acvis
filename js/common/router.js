/* Require modules */
var $        = require('jquery'),
    Backbone = require('backbone'),
    globals  = require('../common/globals'),
    utils    = require('../common/utilities');

// Assign jQuery instance to Backbone.$
Backbone.$ = $;

// Set the router as the module exports
module.exports = Backbone.Router.extend({

	// The app routes ("routeUrl": "routeName")
    routes: {
        "": "home",
        "results/:ref": "results"
    },

    // Home route listener
    home: function () { 
        utils.log('Home', 'routeChange');

		// Require views.
		var NavView    = require('../views/nav'),
            SearchView = require('../views/search');

		// Create instances of views if they don't exist.
		if (!this.navView) this.navView = new NavView({ el: $(globals.elNav) });
        if (!this.searchView) this.searchView = new SearchView({ el: $(globals.elSearch) });            
    },

    // Results route listener
    results: function (ref) {
        
        utils.log('Results', 'routeChange');
        
        var NavView     = require('../views/nav'),
            SearchView  = require('../views/search'),
            ResultsView = require('../views/results');

        // Create instances of views if they don't exists.
        if (!this.navView) navView = new NavView({ el: $(globals.elNav) });
        if (!this.searchView) searchView = new SearchView({ el: $(globals.elSearch) });   
        if (!this.resultsView) resultsView = new ResultsView({ el: $(globals.elResults), sObfuscated: ref }); 


        
    }

});