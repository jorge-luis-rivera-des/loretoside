//	Negocio Model definition
define(['Backbone'],
	
	function (Backbone) {
		
		var Negocio = Backbone.Model.extend({
			
			defaults : {
				"id"			: null,
				"descripcion"	: "", 
				"direccion" 	: "", 
				"telefono" 		: "", 
				"imgFull" 		: null, // Put a default img URL
				"imgThumb"		: 'imgs/plaza/negocios/la-cabana-del-lic-2.jpg', // Put a default img URL
				"raiting" 		: 0, 
				"diaInicial" 	: null, 
				"diaFinal" 		: null, 
				"horaInicial" 	: null, 
				"horaFinal" 	: null
			},
			
			initialize : function () {
				
				//	To ensure a valid funciton: model.isNew()
				this.set({id: this.get('idNegocio')});
			}

		});
		
		return Negocio;
	}
);