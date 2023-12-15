<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserModel;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{

    public function signin(){

        if(session()->get('logged_in')){
            return redirect()->to('/home');
        }

        return view('auth/login');
    }

    public function signout(){
        $session = session();
        $session->destroy();

        return redirect('/');
    }

    public function process_login(Request $request){
        // $data =  $request->all();


        if ($request->isMethod('POST')) {

            $username = $request->input('username');
            $password = $request->input('password');
            

            $user_model = new UserModel();
            $user =  $user_model->get_user_by_username($username);
            // print_r($user);die;
            if(!isset($user['user_id']) || $user['user_id'] == ''){
                echo json_encode(['success' => false, 'message' => 'Incorrect username or password']);
                die;
            }


            $ses_data  = [
                'user_id' => $user['user_id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'logged_in' => TRUE,
            ];
            Session::put('user', $ses_data);

            $this->set_global_data();
            
            echo json_encode(['success' => true, 'message' => 'Login success']);
        }
        
    }

    public function set_global_data(){
        $session = session();
        $this->user = $session->get('user');
    }
}
