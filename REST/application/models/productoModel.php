<?php 
	
class ProductoModel extends CI_Model{

	//Mapping the table name
	private $tbl_productos 	= 	'tbl_productos';
	private $items_per_page =	10;


	// Constructor
	function ProductoModel(){
		parent:: __construct();
	}

	/***	The follow code above is used like CRUD functions 	****/
	
	
	/*
	Recive a request with any number of WHERE condition by "AND" clause
	*/
	function getByNegocioId($where, $page) {
		
		$this-> db-> where($where);
		//If the caller requested for an especifict page
		if ($page != NULL) {
			$this-> db-> limit($this-> items_per_page, ($page * $this-> items_per_page));
			//$this-> db-> limit(2, 0);
		}
			
		$query = $this-> db-> get($this-> tbl_productos);

		//Mapping the results
		if ($query->num_rows() > 0){

			$productos = array();
			foreach ($query->result() as $row)
			{
				$productos[$row->id] = 
								array
								(	
									'id' 		=> $row->id,
									'idNegocio' => $row->idNegocio,
									'nombre' 	=> $row->nombre,
									'description'=> $row->description,
									'imgThumb'	=> $row->imgThumb,
									'raiting' 	=> $row->raiting,
									'oferta' 	=> ($row->oferta == 1) ? TRUE : FALSE,
									'precio' 	=> $row->precio
									
								);	
			}
		}
		else{
			$productos = NULL;
		}
		return $productos; 
	}


}

 ?>