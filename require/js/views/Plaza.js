/*
	jQuery
	Underscore
	Backbone
	Negocios collection
	sdk
*/

define([
	'jQuery',
	'Underscore',
	'Backbone',
	'../collections/Negocios',
	'../views/Negocio',
	'libs/sdk/sdk'
	],
	
	function ($, _, Backbone, NegociosCollection, NegocioView, SDK) {

		//	Plaza Global View
		var GlobalView = Backbone.View.extend({

			//	Lets create an element to the view
			// Reserch with the events are not binding using the events object of Backbone views :(
			
			//	Events definition	
			events : {
				'click #search-business-button' : "search" 
			},

			initialize : function () {

				_.bindAll(this);
		
				this.collection = new NegociosCollection;
				
				//	Binding the events
				this.collection.on('reset', this.addAll, this);
				this.collection.on('add', this.addOne, this);
			},

			//	Render the Global View
			render : function () {
				this.$el.html(Handlebars.templates['plaza-virtual-main.hb']);
				return this;
			},

			//	Get all business via SDK
			load : function () {
				
				//	Get all business
				SDK.REST.API.PlazaVirtual.Negocios.get(null,this.onNegociosResponse,this.onNegociosResponseError);
				return this;
			},

			//	Add all the items
			addAll : function () {
				this.$('.thumbnails.business-main').html('');
				this.collection.each(this.addOne);
				return this;
			},

			//	Add one itme
			addOne : function (negocio) {
				
				//	Create the view of the model and render it into business container
				this.$('.thumbnails.business-main').append(new NegocioView({model: negocio}).render().el);
				return this;
			},

			//	This function is called when we get a negocios response (the first time this page loads)
			onNegociosResponse : function (response) {
				this.collection.reset(_.toArray(response));
				return this;
			},
			
			//	Handler of error
			onNegociosResponseError : function (response) {
				console.log('onNegociosResponseError');
				console.log(response);
				return this;
			},

			//	Called when the user try to find business based on the term provided
			search : function (e) {
				
				//	Retrieve the term
				var $el = $(e.currentTarget).siblings('#search-business-word');
				
				//	Make the search negocios call
				SDK.REST.API.PlazaVirtual.Negocios.findBy(
						//	Term to search
						{ word: $el.val() },
						//	Success callback
						this.onSearchResult,
						//	Error callback
						this.onSearchError		
						);
				
				return this;
			},
			
			//	Search success callback
			onSearchResult: function (response) {
				this.collection.reset(_.toArray(response));
				return this;
			},
			
			//	Search error callback
			onSearchError: function (response) {
				console.log('Something was wrong :(');
				console.log(response);
			}
		});

		//	Return the global scope
		return GlobalView;
	});