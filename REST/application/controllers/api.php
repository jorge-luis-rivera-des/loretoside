<?php
require(APPPATH.'/libraries/REST_Controller.php');

class Api extends REST_Controller
{


    /*
    *
    *
        Business
    *
    */

    //Used to get the all the business that match with the filters
    function negocio_get() {
        
        $where = array();

        //Array of conditions
        if ($this->get('idNegocio')){
            $where['idNegocio'] = $this->get('idNegocio');
        }
        if ($this->get('nombre')){
            $where['nombre'] = $this->get('nombre');
        }
        
        //Load our model class
        $this-> load -> model ('negocioModel','',TRUE);
        $negocios = $this -> negocioModel -> get($where);

        if ($negocios){
            $this->response($negocios,200);
        }
        else {
            $this->response(NULL,200);   
        }

    }
    /*
    *
    *
        Function to search based on the filters using the LIKE condition
        fields option:
            a)nombre
            b)descripcion
            c)slogan
    *   
    *
    */
    function negocio_find_get() {

        //Load our model class
        $this-> load -> model ('negocioModel','',TRUE);
        $negocios = $this -> negocioModel -> find($this->get('word'));

        if ($negocios){
            $this->response($negocios,200);
        }
        else {
            $this->response(NULL,200);   
        }

    }

    /*
    *
    *
        Products
    *
    *
    */
    function productos_get() {
        
        $where = array();

        //Array of conditions
        //Unique ID
        if ($this->get('id')){
            $where['id'] = $this->get('id');
        }

        //By ID of the parent business
        if ($this->get('idNegocio')){
            $where['idNegocio'] = $this->get('idNegocio');
        }
        
        //Load our model class
        $this-> load -> model ('productoModel','',TRUE);
        $productos = $this -> productoModel -> getByNegocioId($where,$this->get('page'));

        if ($productos){
            $this->response($productos,200);
        }
        else {
            $this->response(NULL,200);   
        }

    }

    /***   Older code. Testing porpuse only     ***/

	function profile_get()
    {
        if(!$this->get('username'))
        {
        	$this->response(NULL, 400);
        }

        $this -> load -> model('usuariosModel', '', TRUE);
        $profile = $this -> usuariosModel ->  getByUsername ($this->get('username')); 
        
        //$user = $this->user_model->get( $this->get('id') );

        if($profile)
        {
            $this->response($profile,200); // 200 being the HTTP response code
        }

        else
        {
            $this->response(NULL, 204); //Successfull put not content found
        }
    }

    function user_post()
    {
        $result = $this->user_model->update( $this->post('id'), array(
        	'name' => $this->post('name'),
        	'email' => $this->post('email')
        ));

        if($result === FALSE)
        {
        	$this->response(array('status' => 'failed'));
        }

        else
        {
        	$this->response(array('status' => 'success'));
        }

    }

    function users_get()
    {
        $users = $this->user_model->get_all();

        if($users)
        {
            $this->response($users, 200);
        }

        else
        {
            $this->response(NULL, 404);
        }
    }
}
?>
