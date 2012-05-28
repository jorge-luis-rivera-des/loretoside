            //Define my Backbone router here
            var Router = Backbone.Router.extend({
                initialize: function(options) {
                    //Initialize stuffs here
                },
                //Default routes
                routes:{
                    "ayuda": "ayuda",
                    "comunidad": "comunidad",
                    "eventos": "eventos",
                    "galeria": "galeria",
                    "tv": "tv",
                    "chat": "chat",
                    "plaza": "plaza",
                    "plaza/:business": "plaza",
                    "bazar": "bazar",
                    "noticias": "noticias",
                    "radio": "radio"
                },
                //define all route functions
                ayuda: function(){
                    alert("ayuda");
                    return false;
                },
                comunidad: function(){                    
                    $('#main-container').html("conunidad");
                    try{        
                        $('#main-container').html(new EJS({url: 'assets/templates/test.ejs'}).render({id: "comunidad"}));
                    }
                    catch(e){
                        console.log(e);
                    }
                    
                    
                    return false;

                },
                eventos: function(){
                    Side.UX.Modules.Eventos.initialize();
                },
                galeria: function(){
                    $('#main-container').html('Hola!, estas dentro de la galeria');
                },
                tv: function(){
                    $('#main-container').html('Hola!, estas dentro de la tv');
                },
                chat: function(){
                    $('#main-container').html('Hola!, estas dentro de la chat');
                },
                plaza: function(negocio){
                    Side.UX.Modules.PlazaVirtual.initialize(negocio);
                },
                bazar: function(){
                    $('#main-container').html('Hola!, estas dentro de la bazar');
                },
                noticias: function(){
                    $('#main-container').html('Hola!, estas dentro de la noticias');
                },
                radio: function(){
                    $('#main-container').html('Hola!, estas dentro de la radio');
                }
            });


            var Side = {

                Utils: {

                    baseURL: window.location.host,
                    pathName: window.location.pathname
                },

                REST:{

                    API: {

                        path: '/REST/',

                        version: 'api/', //In a not so far future I'll use like this: alpha/api and beta/api

                        PlazaVirtual : {
                            
                            //==== Negocios Section - Begin ===
                            Negocios: {

                                get: function(data, successCallback, errorCallback) {

                                    $.ajax({
                                       
                                        url: Side.REST.API.path + Side.REST.API.version + 'negocio',
                                        
                                        type: 'GET',
                                        
                                        data: data,
                                        
                                        success: successCallback,
                                        
                                        error: errorCallback,
                                        
                                        statusCode : {
                                        
                                            204: function(){
                                                console.log('success but not user found :(');
                                            }
                                        
                                        }
                                    });

                                    return false;
                                },

                                //Find any business that matches with the term privided
                                findBy: function(data, successCallback, errorCallback) {

                                    $.ajax({
                                        
                                        url: Side.REST.API.path + Side.REST.API.version + 'negocio_find',
                                        
                                        type: 'GET',
                                        
                                        data: data,
                                        
                                        success: successCallback,
                                        
                                        error: errorCallback,
                                        
                                        statusCode : {
                                        
                                            204: function(){
                                                console.log('success but not user found :(');
                                            }
                                        
                                        }
                                    });

                                    return false;
                                },

                                post : function(data){},
                                update : function(data){},
                                remove : function(data){},

                            },
                            /*  ==== Negocios Section - End === */

                            /*  ==== Productos Section - Begin === */

                            Productos: {

                                get: function(data, successCallback, errorCallback) {

                                    $.ajax({
                                        
                                        url: Side.REST.API.path + Side.REST.API.version + 'productos',
                                        
                                        type: 'GET',
                                        
                                        data: data,
                                        
                                        success: successCallback,
                                        
                                        error: errorCallback,
                                        
                                        statusCode : {
                                        
                                            204: function(){
                                                console.log('success but not producto found :(');
                                            }
                                        
                                        }
                                    });

                                    return false;
                                },
                            },

                            //==== Productos Section - End ===

                        }
                    }
                },
                UX:{
                    API:{
                        //Define my Backbone router here
                        Router: new Router()
                    },
                    Modules:{

                        PlazaVirtual : null
                    },
                    GlobalSelectors : {
                        $mainContainer : $('#main-container')
                    }
                }
            };
            
            Backbone.history.start({pushState: true});            
            
            $('a.section').click(function(e){
                $(e.currentTarget).parent().addClass('active').siblings().removeClass('active');
                Side.UX.API.Router.navigate(Side.Utils.pathName + $(e.currentTarget).attr('href'), {trigger: true});
                return false;
            });

