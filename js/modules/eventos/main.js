/*
 * Loretoside.com | Eventos | main.js
 * http://loretoside.com
 *
 * Copyright 2012, @develoser
 * http://dev.loretoside.com
 *
 * Date: Sad Mar 13 2012
*/

Side.UX.Modules.Eventos = (function(){
	/******* Private Scope *************/
	
	/******* Public  Scope *************/
	var _module = {
		id: "eventos",
		initialize: function(evento){
			$('#main-container').html('eventos con EJS');
			try{
				$('#main-container').html('');
				var template = new EJS({url: '/assets/templates/eventos-main.ejs'}).render();
				$('#main-container').html(template);
				$('.business-main').hide();
				$('.business-main').fadeIn('slow');

				$('.btn.view-business-details').click(function(e){
					var templateDetails = new EJS({url: '/assets/templates/plaza-virtual-business-details.ejs'}).render();
					$('#main-container').animate({opacity:0},380,function(){
						$('#main-container').html(templateDetails);
						$('#main-container').animate({opacity:1},380);
						$('#myCarousel').carousel();
					});
					return false;
				});

			}
			catch(e){
				console.log(e);
			}
            return false;	
		}
	}
	return _module;
})();