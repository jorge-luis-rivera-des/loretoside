<?php 
	
class NegocioModel extends CI_Model{

	//Mapping the table name
	private $tbl_negocios = 'tbl_negocios';

	// Constructor
	function NegocioModel(){
		parent:: __construct();
	}

	/***	The follow code above is used like CRUD functions 	****/
	
	//Count all
	function count_all(){
		$this -> db -> count_all($this -> tbl_negocios);
	}
	
	/*
	Recive a request with any number of WHERE condition by "AND" clause
	*/
	function get($where) {
		
		$this-> db-> where($where);
		$query = $this-> db-> get($this-> tbl_negocios);

		//Mapping the results
		if ($query->num_rows() > 0){

			$negocios = array();
			foreach ($query->result() as $row)
			{
				$negocios[$row->idNegocio] = 
								array
								(	'idNegocio' => $row->idNegocio,
									'nombre' 	=> $row->nombre,
									'slogan' 	=> $row->slogan,
									'direccion' => $row->direccion,
									'descripcion'=> $row->descripcion,
									'telefono' 	=> $row->telefono,
									'url'		=> $row->url,
									'imgThumb'  => $row->imgThumb,
									'raiting' 	=> $row->raiting,
								);	
			}
		}
		else{
			$negocios = NULL;
		}
		return $negocios; 
	}

	/*
	Recive a request with the word to find into the business table. Producing the LIKE clause
	*/
	function find($word) {

		/*
		TODO: Add the avility to search in productos and tags of each business. Currently we are searching just in the tbl_negocios table
		*/

		//Setting up the query
		$this-> db-> like('nombre', $word);
		$this-> db-> or_like('descripcion', $word);
		$this-> db-> or_like('slogan', $word);
		$query = $this-> db-> get($this-> tbl_negocios);

		//Mapping the results
		if ($query->num_rows() > 0){

			$negocios = array();
			foreach ($query->result() as $row)
			{
				$negocios[$row->idNegocio] = 
								array
								(	'idNegocio' => $row->idNegocio,
									'nombre' 	=> $row->nombre,
									'slogan' 	=> $row->slogan,
									'direccion' => $row->direccion,
									'descripcion'=> $row->descripcion,
									'telefono' 	=> $row->telefono,
									'url'		=> $row->url,
									'imgThumb'  => $row->imgThumb,
									'raiting' 	=> $row->raiting,
								);	
			}
		}
		else{
			$negocios = NULL;
		}
		return $negocios;
		
	}

	function getById($idNegocio) {
		//Set up the query
		$query = $this-> db -> query ('SELECT idNegocio, nombre FROM tbl_negocios WHERE idNegocio = "'.$idNegocio.'"');
		
		//Mapping the results
		if ($query->num_rows() > 0){
			$result = $query->row();
			
			$negocio = array(	'idNegocio' => $result->idNegocio,
								'nombre' 	=> $result->nombre
						);
			
		}
		else{
			$negocio = NULL;
		}
		return $negocio; 
	}

	function getByName($name) {
		$this -> db -> where('nombre', $name);
		return $this -> db -> get($this -> tbl_negocios);
	}
	
	//Inserts
	function insert($negocio){
		$this -> db -> insert($this -> tbl_negocios, $negocio);
		return $idNegocio = $this -> db -> insert_id();
	}

	//Updates
	function update($idNegocio, $negocio) {
		$this -> db -> where('idNegocio', $idNegocio);
		$this -> db -> update($this -> tbl_negocios, $negocio);
	}

	//Deletes
	function delete($idNegocio) {
		$this -> db -> where('idNegocio', $idNegocio);
		$this -> db -> delete($this -> tbl_negocios);
	}




}

 ?>