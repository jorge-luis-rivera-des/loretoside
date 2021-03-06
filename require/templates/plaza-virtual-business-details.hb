<div class="row">
	<div class="span12">
			<h1>{{nombre}}</h1>
			<br>
			<blockquote>
				<strong>"<i>{{slogan}}</i>"</strong>
			</blockquote>
			<p><a id="back-to-plaza" class="btn btn-mini" href="javascript:void(0);"><i class="icon-chevron-left"></i>Regresar</a></p>
	</div>
</div>
<div class="row">
	<div class="span12">
		<div class="tabbable">
		  <ul class="nav nav-tabs">
		    <li class="active">
		    	<a href="#about" data-toggle="tab">Acerca de...</a>
		    </li>
		    <li>
		    	<a href="#productos" data-toggle="tab">Servicios y Productos</a>
		    </li>
		    <li>
		    	<a href="#location" data-toggle="tab">Dirección</a>
		    </li>
		    <li>
		    	<a href="#hours" data-toggle="tab">Horarios</a>
		    </li>
		    <li>
		    	<a href="#contact" data-toggle="tab">Contacto</a>
		    </li>
		  </ul>
		  <div class="tab-content">
		    <div class="tab-pane active" id="about">
		      <div class="span5">
		      <h3>Conoce el Lugar</h3>
		      	<div id="myCarousel" class="carousel">
				  <!-- Carousel items -->
				  <div class="carousel-inner">
				    <div class="active item"><img src="/{{imgThumb}}" alt="{{nombre}}"></div>
				    <div class="item"><img src="/img/plaza/negocios/la-cabana-del-lic/la-cabana-del-lic-1.jpg" alt=""></div>
				    <div class="item"><img src="/img/plaza/negocios/la-cabana-del-lic/la-cabana-del-lic-3.jpg" alt=""></div>
				    <div class="item"><img src="/img/plaza/negocios/la-cabana-del-lic/la-cabana-del-lic-4.jpg" alt=""></div>
				    <div class="item"><img src="/img/plaza/negocios/la-cabana-del-lic/la-cabana-del-lic-5.jpg" alt=""></div>
				  </div>
				  <!-- Carousel nav -->
				  <a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
				  <a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
				</div>
		      </div>
		      <div class="span5">
		      		<h3>Datos de contacto:</h3>
		      		<strong>Dirección: </strong><{{direccion}}<br>
			        <strong>Horarios: </strong>Lunes-Viernes 6:00 p.m. - 10:30 p.m.<br>
			        <strong>Teléfono(s): </strong>{{telefono}}<br>
			        <strong>Calificación:</strong>
			     	<br>
			     	<div class="reiting">
			            <div class="raiting-star">&nbsp</div>
			    	</div>
			    	<div id='loading-img'>
			    	</div>
		      </div>
		    </div>
		    <div class="tab-pane" id="productos">
		   	 	
		    	<div class="row">
		    		<div class="span6">
		    			<form class="form-search">
					    	<h3>Busca en nuestro catálogo:</h3>
					    	<input id="search-productos-word" type="text" class="input-xlarge search-query" placeholder="Servicio o producto a buscar" autofocus>
					    	<a id="search-productos-button" class="btn" href="javascript:;"><i class="icon-search"></i> Buscar</a>
					    </form>
		    		</div>
		    		<div class="span6">
		    			    <ul class="nav nav-pills right">
						      <li class="dropdown">
						        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Selecciona una Categoría<b class="caret"></b></a>
						        <ul class="dropdown-menu">
						          <!-- links -->
						          <li><a href="#">Wii</a></li>
						          <li><a href="#">Xbox</a></li>
						          <li><a href="#">PSP</a></li>
						          <li><a href="#">PS3</a></li>
						          <li><a href="#">PS2</a></li>
						          <li><a href="#">Consolas</a></li>
						          <li><a href="#">3DS</a></li>
						        </ul>
						      </li>
						    </ul>
		    		</div>
		    	</div>
		      <p>
		      	<ul class="thumbnails business-main">
			    </ul>
		      </p>
		    </div>
		    <div class="tab-pane" id="location">
		    	<h3>Ven a visitarnos:</h3>
			    <div class="span5">
			    </div>
		    </div>
		    <div class="tab-pane" id="hours">
		      <p>Lunes a Viernes 5:30 - 11:30.</p>
		    </div>
		    <div class="tab-pane" id="contact">
		      <h3>Déjanos un mensaje para mejorar.</h3>
		      <br>
		      <form class="well">
			  <label>Nombre:</label>
			  <input type="text" class="span3" placeholder="Escribe tu nombre…">
			  <label>Comentario:</label>
			  <textarea class="input-xlarge" id="textarea" rows="3" placeholder="Escribe aquí lo que piensas de nuestro negocio. Tu opinion es para mejorar para tí"></textarea>
			  <br>
			  <button type="submit" class="btn">Enviar</button>
			</form>
		    </div>
		  </div>
		</div>			
	</div>
</div>
<!-- BEGIN - Product details window modal pop-up-->
<div class="modal hide fade" id="product-details-modal">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal">×</button>
    <h2 class="title">Title</h2>
    <h3 class="price">Price</h3>
  </div>
  <div class="modal-body">
    <p>Product HTML here</p>
  </div>
  <div class="modal-footer">
  	<a href="#" class="btn btn-primary">Siguiente</a>
    <a href="#" class="btn btn-primary" data-dismiss="modal">Anterior</a>
  </div>
</div>
<!-- END - Product details window modal pop-up-->
