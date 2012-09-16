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
	'libs/sdk/sdk'
	],
	
	function ($, _, Backbone, SDK) {

		//	Negocio Single View
			var NegocioView = Backbone.View.extend({
				
				tagName : 'li',

				className : 'span3',

				events : {

					'click .view-business-details' : "viewDetails"
					//'hover .thumbnail' : 'hover_negocio',
					//'mouseleave .thumbnail' : 'leave_negocio'

				},
				
				render : function() {

					this.$el.html(Handlebars.templates['business-single.hb'](this.model.toJSON()));
					return this;
				},

				viewDetails : function(e) {
					console.log('viewDetails');
					return false;
				},

				hover_negocio : function (e) {
					return false;
				},
				
				leave_negocio : function (e) {
					return false;
				}

			});

			//	Return the global scope
			return NegocioView;
	}
);
