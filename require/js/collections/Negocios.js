//	Producto Collection definition
define([
		'Backbone',
		'models/Negocio'
	],

	function (Backbone, Negocio) {
		
		//	Definition of the collection object
		var Negocio = Backbone.Collection.extend({
			//	Define the model
			model: Negocio
		});

		//	Return the structure object
		return Negocio;
	}
);