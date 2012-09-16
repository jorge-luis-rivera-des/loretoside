//	Producto Collection definition
define([
		'Backbone',
		'models/Producto'

	],

	function (Backbone, Producto) {
		
		var Productos = Backbone.Collection.extend({
			model: Producto
		});

		return Productos;

	}
);