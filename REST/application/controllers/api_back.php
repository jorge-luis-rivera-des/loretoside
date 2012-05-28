<?php
require(APPPATH.'/libraries/REST_Controller.php');

class Api extends REST_Controller
{
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
