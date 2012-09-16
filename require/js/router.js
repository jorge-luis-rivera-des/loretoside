// Filename: router.js
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'libs/sdk/sdk',
  'views/Plaza'
], function ($, _, Backbone, SDK, PlazaView) {
  
  var AppRouter = Backbone.Router.extend({
    
    routes: {
      
      // Define some URL routes
      "ayuda"           :  "ayuda",
      "comunidad"       :  "comunidad",
      "eventos"         :  "eventos",
      "galeria"         :  "galeria",
      "tv"              :  "tv",
      "chat"            :  "chat",
      "plaza"           :  "plaza",
      "plaza/:business" :  "plaza",
      "bazar"           :  "bazar",
      "noticias"        :  "noticias",
      "radio"           :  "radio",
      
      // Default
      '*actions'        :  'defaultAction'
    },

    //  Properties
    Ayuda     :  null,
    Comunidad :  null,
    Eventos   :  null,
    Galeria   :  null,
    TV        :  null,
    Chat      :  null,
    Plaza     :  null,
    Bazar     :  null,
    Noticias  :  null,
    Radio     :  null,
    
    plaza: function () {

      //  Call render on the module we loaded in via the dependency array
      if (!this.Plaza) {
        this.Plaza = new PlazaView({el:'#main-container'});
      }
      this.Plaza.render().load();
      return this;
    },
    
    //  Default action must take the users to de default page
    defaultAction: function (actions) {
      console.log('Default action...Taking you to ,the home page');
    }

  });

  var initialize = function() {
    
    var app_router = new AppRouter;
    Backbone.history.start();

    //  Testing the navigate behaviour
    //  app_router.navigate('plaza', {trigger: true});
  };

  return { 
    initialize: initialize
  };

});
