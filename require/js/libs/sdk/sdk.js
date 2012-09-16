define(
    ['jQuery',
    'Underscore'
    ],
    function ($, _) {

    /*
        *   This funciton is used to make all the AJAX calls to our REST API and use some utils
    */
    var SDK = {
        Utils : {
            baseURL : window.location.host,
            pathName : window.location.pathname
        },
        REST : {
            API : {
                path : '/REST/',
                version : 'api/', //    In a not so far future I'll use like this: alpha/api and beta/api
                PlazaVirtual : {
                    //  Negocios Section Begin
                    Negocios : {
                        
                        get: function (data, successCallback, errorCallback) {
                            $.ajax({
                                url: SDK.REST.API.path + SDK.REST.API.version + 'negocio',
                                type: 'GET',
                                data: data,
                                success: successCallback,
                                error: errorCallback,
                                statusCode : {
                                    204: function () {
                                        console.log('success but not user found :(');
                                    }
                                }
                            });
                            return false;
                        },
                        
                        //Find any business that matches with the term privided
                        findBy: function (data, successCallback, errorCallback) {
                            $.ajax({
                                url: SDK.REST.API.path + SDK.REST.API.version + 'negocio_find',
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
                        post : function (data) { },
                        update : function (data) { },
                        remove : function (data) { },
                        Categorias : {
                            //Get
                            get : function ( data, successCallback, errorCallback ) {
                                $.ajax({
                                        url: SDK.REST.API.path + SDK.REST.API.version + 'categorias_negocios',
                                        type: 'GET',
                                        data: data,
                                        success: successCallback,
                                        error: errorCallback,
                                        statusCode : {
                                            204: function() {
                                                console.log('success but not user found :(');
                                            }     
                                        }
                                });
                                return false;
                            }
                        }
                    },
                    /*  ==== Negocios Section - End === */
                    /*  ==== Productos Section - Begin === */
                    Productos : {

                        get : function(data, successCallback, errorCallback) {
                            $.ajax({
                                url: SDK.REST.API.path + SDK.REST.API.version + 'productos',
                                type: 'GET',
                                data: data,
                                success: successCallback,
                                error: errorCallback,
                                statusCode : {
                                    204: function () {
                                        console.log('success but not producto found :(');
                                    }
                                }
                            });
                            return false;
                        },
                    },
                }
            }
        }
    };
    return SDK;

});