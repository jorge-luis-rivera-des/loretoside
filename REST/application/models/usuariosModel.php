<?php

class UsuariosModel extends CI_Model {

	//Mapping the table name
	private $tbl_usuarios = 'tbl_usuarios';

	// Constructor
	function UsuariosModel() {
		parent::__construct();
	}

	//Count all
	function count_all() {
		return $this -> db -> count_all($this -> tbl_usuarios);
	}

	// 
	function save($usuario) {

		//Generamos el token de sesión del usuario
		$token = 123;

		//Insertamos el registro
		$this -> db -> insert($this -> tbl_usuarios, $usuario);
		
		//Obtenemos el ID de usuario generado	
		return $idProfile = $this -> db -> insert_id();
		
	}

	// Actualizamos la Clasificacion deseada
	function update($id, $usuarios) {
		$this -> db -> where('id', $id);
		$this -> db -> update($this -> tbl_usuarios, $usuarios);
	}

	// Actualizamos la Clasificacion deseada
	function delete($id) {
		$this -> db -> where('id', $id);
		$this -> db -> delete($this -> tbl_usuarios);
	}

	function userOfEmailRegistered($name, $email) {

		/*	Procedimiento que nos regrasa un Boolean dependinedo si es que el
		 el nombre del usuario o el correo electrónico ya se ecuentra registrado en la
		 Base de Datos
		 */

		$error = 0;
		$registerName = 0;
		$registerEmail = 0;

		//	Validación del Correo Electrónico
		$this -> db -> like('email', '' . $email . '');
		$this -> db -> from('tbl_usuarios');

		if ($this -> db -> count_all_results() > 0)
			$registerEmail = 1;

		//	Validación del Nombre
		$this -> db -> like('name', '' . $name . '');
		$this -> db -> from('tbl_usuarios');

		if ($this -> db -> count_all_results() > 0)
			$registerName = 2;

		//	Verificamos si es que existen errores
		$error = $registerName + $registerEmail;

		return $error;
	}

	//Función que valida si el usuario ya está registrado
	function isUserNameAvailable($username) {

		//	Validación del Nombre
		$this -> db -> where('name', $username);
		$this -> db -> from('tbl_usuarios');

		if ($this -> db -> count_all_results() == 0)
			return TRUE;
		else
			return FALSE;
	}

	//Función que valida si el usuario ya está registrado
	function isEmailAvailable($email) {

		//	Validación del Nombre
		$this -> db -> where('email', $email);
		$this -> db -> from('tbl_usuarios');

		if ($this -> db -> count_all_results() == 0)
			return TRUE;
		else
			return FALSE;
	}

	function loginUser($name, $password) {

		$valido = FALSE;

		try {

			$this -> db -> like('name', '' . $name . '');
			$this -> db -> like('password', '' . $password . '');
			$this -> db -> from('tbl_usuarios');

			if ($this -> db -> count_all_results() > 0)
				$valido = TRUE;

		} catch(Exception $e) {
			echo $e;
		}

		return $valido;
	}

	function getIdPerfilByName($name) {
		$this -> db -> where('name', $name);
		return $this -> db -> get($this -> tbl_usuarios);
	}

	function actualizarPerfil($detallePerfil) {
		$this -> title = $_POST['title'];
		$this -> content = $_POST['content'];
		$this -> date = time();
		$this -> db -> update('entries', $this, array('id', $_POST['id']));

	}

	function getByUsername($username){
		
		//Set up the query
		$query = $this-> db -> query ('SELECT idProfile, name, email FROM tbl_usuarios WHERE name = "'.$username.'"');
		
		//Mapping the results
		if ($query->num_rows() > 0){
			$result = $query->row();
			
			$profile = array(	'idProfile' => $result->idProfile,
								'name' 		=> $result->name,
								'email' 	=> $result->email 
						);
			
		}
		else{
			$profile = NULL;
		}
		return $profile; 
	}

}
?>