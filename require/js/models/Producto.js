//	Producto Model definition
define(['Backbone'],
	
	function (Backbone) {
		
		var Producto = Backbone.Model.extend({
			defaults: {
				"id" 			: null,
				"idNegocio"		: null,
				"nombre"		: null,
				"descripcion"	: "No disponible",
				"imgThumb"		: null,
				"precio"		: "No disponible"
			}
		});

		return {
			Producto : Producto
		};

	}
);