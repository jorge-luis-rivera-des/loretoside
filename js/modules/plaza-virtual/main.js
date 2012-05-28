/*
 * Loretoside.com | Plaza Virtual | main.js
 * http://loretoside.com
 *
 * Copyright 2012, @develoser
 * http://dev.loretoside.com
 *
 * Date: Sad Mar 03 2012
*/

Side.UX.Modules.PlazaVirtual = (function(){
	/******* Private Scope *************/
	
	/*Models*/
	var NegocioModel = Backbone.Model.extend({
		
		defaults: {
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
		
		initialize: function(){
			//To ensure a valid funciton: model.isNew()
			this.set({id: this.get('idNegocio')});
		}

	});

	var ProductosModel = Backbone.Model.extend({
		defaults: {
			"id" 			: null,
			"idNegocio"		: null,
			"nombre"		: null,
			"descripcion"	: "No disponible",
			"imgThumb"		: null,
			"precio"		: "No disponible"
		}
	});

	var ProductosCollection = Backbone.Collection.extend({
		model: ProductosModel
	});

	/*Collections*/
	var NegocioCollection = Backbone.Collection.extend({
		model: NegocioModel
	});

	//Create our collection of Negocios
	negocios = new NegocioCollection();

	//Create our collection of Productos
	productos = new ProductosCollection();

	/*
	*
	*	
		Views. In this section w'll define all views

	*
	*
	*/

	//Global View
	var GlobalView = Backbone.View.extend({

		events: {

			'click #searchBusinessButton' : "search" // Reserch with the events are not binding using the events object of Backbone views :(

		},

		template : new EJS({url: '/assets/templates/plaza-virtual-main.ejs'}),

		initialize: function() {

			//Binding the events
			negocios.reset([],{silent: true});
			negocios.on('all', this.render, this);

			//Get all business
			Side.REST.API.PlazaVirtual.Negocios.get(null,this.onNegociosResponse,this.onNegociosResponseError);

			//This function is used to load more items 
			/*
			$(window).off('scroll').on('scroll', function() {

					if  ($(window).scrollTop() > $(document).height() - $(window).height() - 200) {  
				    	log('get more items');
				    	alert(':)');

				    }  
			});
			*/

		},

		//This function is called when we get a negocios response (the first time this page loads)
		onNegociosResponse: function(response){
			negocios.reset(_.toArray(response));
			return false;
		},
		
		//Handler of error
		onNegociosResponseError: function(response){
			return false;
		},

		//Render the Global View
		render: function() {
			
			$('#main-container').html(this.template.render());
			negocios.each(this.addOne);

			//Temporal hack while I find the reason for that the events are not binding using the events object provided by Backbone :(
			$('#search-business-button').on('click', this.search);

			return this;
		},

		addOne: function(negocio){
			
			//Create the view of the model and render it into business container
			return new NegocioView({model: negocio}).render();

		},

		//Called when the user try to find business based on the term provided
		search: function(e){

			Side.REST.API.PlazaVirtual.Negocios.findBy(
					{ word: $('#search-business-word').val() },
					
					//Success callback
					Side.UX.Modules.PlazaVirtual.globalView.onSearchResult,
					
					//Error callback
					Side.UX.Modules.PlazaVirtual.globalView.onSearchError		
					);

			return false;
		},
		
		onSearchResult: function(response){
			negocios.reset(_.toArray(response));
			return false;
		},
		
		onSearchError: function(response){
			log('Something was wrong :(');
		}
		
	});

	//Negocio Single View
	var NegocioView = Backbone.View.extend({
		
		tagName: 'li',

		className: 'span3',

		template : new EJS({url: '/assets/templates/business-single.ejs'}),

		events: {

			'click .view-business-details' : "viewDetails"
			//'hover .thumbnail' : 'hover_negocio',
			//'mouseleave .thumbnail' : 'leave_negocio'

		},
		
		render: function() {
			
			$('.business-main').append(this.$el.hide().html(this.template.render(this.model.toJSON())).fadeIn());

			return this;
		},

		viewDetails: function(e) {

			Side.UX.API.Router.navigate(Side.Utils.pathName + $(e.currentTarget).attr('href'), {trigger: false});
			var view = this;
			Side.UX.GlobalSelectors.$mainContainer.animate({opacity:0}, 380, function() {
			
				new NegocioDetailsView({model: view.model}).render();

				Side.UX.GlobalSelectors.$mainContainer.animate({opacity:1},380);
				$('#myCarousel').carousel();

			});
			return false;
		},

		hover_negocio: function(e){

			$singleNegocioContainer = $(e.currentTarget);
			$singleNegocioContainer.find('.caption').stop().fadeIn();
		},
		leave_negocio: function(e) {
			$singleNegocioContainer = $(e.currentTarget);
			$singleNegocioContainer.find('.caption').stop().fadeOut();
		}

	});

	var NegocioDetailsView = Backbone.View.extend({
		
		current_productos_page: 0,

		loading_productos: false,

		template: new EJS({url: '/assets/templates/plaza-virtual-business-details.ejs'}),

		events: {
			'click #search-productos-button' : 'loadProductos'
		},

		initialize: function() {

			//Binding the events
			productos.reset([],{silent: true});
			productos.off();
			productos.on('all', this.renderProductos, this);

		},

		render: function() {

			Side.UX.GlobalSelectors.$mainContainer.html(this.template.render(this.model.toJSON()));
			$('#back-to-plaza').on('click',this.returnTo);
			
			$('.thumbnails').masonry({
				itemSelector 	: 'li',
				isAnimated		: Modernizr.csstransitions
			});

			$('a[href=#productos]').click(function(){

				setTimeout(function() {
					$('.thumbnails').masonry('reload');
				},100);

			});

			this.loadProductos();

			/*
				var self = this;
				setTimeout(function(){
					self.loadProductos();
				},3000);
			*/

			//Load items on demand
			var self = this;
			$(window).off('scroll').on('scroll', function() {

					if  ($(window).scrollTop() > $(document).height() - $(window).height() - 200) {  
				    	self.loadProductos();	
				    }  
			});

			return this;
		},

		returnTo: function() {
			
			Side.UX.GlobalSelectors.$mainContainer.animate({opacity:0}, 380, function() {
				
				Side.UX.GlobalSelectors.$mainContainer.animate({opacity:1},380);
				Side.UX.API.Router.navigate(Side.Utils.pathName + 'plaza', {trigger: false});
				Side.UX.Modules.PlazaVirtual.initialize();
			
			});

			
			/*
			 *
			 *
			 TODO: 
				1.- Hide the business details view
				2.- Show the global/home view with the last collection loaded
			*
			*
			*/
			return false;
		},

		loadProductos: function() {

			if (this.loading_productos) return false;

			this.loading_productos = true;
			
			//Request for all productos of this Negocio
			Side.REST.API.PlazaVirtual.Productos.get({page: this.current_productos_page},this.onProductosResponse,this.onProductosResponseError);
			
			this.current_productos_page++;

		},

		onProductosResponse: function(response) {
			
			//TODO: Just the first time I call reset, the other times I'll use fetch to add models to the collection :)
			if (productos.size() == 0 )
				productos.reset(_.toArray(response));
			else 
				productos.add(_.toArray(response));

			this.loading_productos = false;
		},

		onProductosResponseError: function(response){
			log('onProductosResponse Error!');
			log(response);

			this.loading_productos = false;
		},

		addOneProducto: function(producto){
			
			//Create the view of the model and render it into business container
			return new ProductoSingleView({model: producto}).render();
		},

		renderProductos: function() {

			productos.each(this.addOneProducto);

		}

	});

	/*===	Productos Views - Begin	===*/

	var ProductoSingleView = Backbone.View.extend({

		tagName: 'li',

		className: 'span3',

		template : new EJS({url: '/assets/templates/plaza-virtual-producto-single.ejs'}),

		render: function () {

			//append the new view to the container
			$('.thumbnails').append(this.$el.html(this.template.render(this.model.toJSON())));

			this.$el.find('img').load(function(){

					$(this).fadeIn('slow', function(){
				
						setTimeout(function() {
							$('.thumbnails').masonry('reload');
						},100);
				
					});
				
			});

			//this.load_img(this.model.get('imgThumb'));

			return this;
		},

		load_img: function(img_path) {

			$.ajax({

				url: Side.Utils.pathName + 'imgs/plaza/productos/' + img_path,

				type: 'GET',

				succes: function() {
					log('img loaded...');
				},

				error: function() {
					log('failed :(');
				}			

			});

		}

	});

	/*===	Productos Views - End	===*/

	/******* Public  Scope *************/
	var _module = {
		
		id: "plaza",

		globalView : null,

		negociosCollection : null,
		
		initialize: function(negocio) {

			Side.UX.GlobalSelectors.$mainContainer.html('').spin();
			
			if (!this.globalView)
				this.globalView = new GlobalView();
			else
				this.globalView.initialize();
			
            
            return false;	
		}
	}
	return _module;
})();