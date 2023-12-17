<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserModel;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Hash;
use Validator;

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
        $session->flush();

        return redirect('/');
    }

    /* login via web routes need csrf token to procceed 
    * session will create because of web routes
    * will proceed with session details or also access api routes using token
    */
    public function process_login(Request $request){

        if ($request->isMethod('POST')) {
            $rules = [
                'username' => 'required',
                'password' => 'required | min:5'
            ];
    
            $validate = Validator::make($request->all(), $rules);
    
            if($validate->fails()){
                echo json_encode(["success" => false, 'message' => $validate->errors(), 'error' => $validate->errors() ]);
                exit();
            }

            $user_model = new UserModel();
            $user =  $user_model->get_user_by_username($request->username);
            if(!isset($user->id) || $user->id == ''){
                echo json_encode(['success' => false, 'message' => ['error'=>['Incorrect username or password']]]);
                die;
            }

            if (!Hash::check($request->password, $user->password)) {
                echo json_encode(['success' => false, 'message' => ['error'=>['Incorrect username or password']]]);
                die;
            }

            $token = $user->createToken(APP_TOKEN)->plainTextToken;

            $ses_data  = [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'logged_in' => TRUE,
                'token' => $token,
            ];
            Session::put('user', $ses_data);
            $this->set_global_data();
            
            echo json_encode(['success' => true, 'message' =>'Login Success']);
        }
        
    }

    /* login via api routes not csrf token required
    * session will not create
    * will return data with token to access other api's
    */
    public function process_login_api(Request $request){

        if ($request->isMethod('POST')) {
            $rules = [
                'username' => 'required',
                'password' => 'required'
            ];
    
            $validate = Validator::make($request->all(), $rules);
    
            if($validate->fails()){
                return response([
                    "success" => false,
                    'result' => $validate->errors()
                ], 404);
            }

            $user= UserModel::where('username', $request->username)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response([
                    "success" => false,
                    'result' => ['Invalid username or password!']
                ], 404);
            }
        
            $token = $user->createToken(APP_TOKEN)->plainTextToken;
        
            $user_data  = [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'logged_in' => TRUE,
                'token' => $token,
            ];

            $response = [
                'success' => true,
                'result' => $user_data,
            ];
        
            return response($response, 201);
        }
        
    }

    public function change_password(Request $request){


        $session = session();
        $user = $session->get('user');
        print_r($user);die('test');
        
        if ($request->isMethod('POST')) {
            $rules = [
                'password' => 'required | min:5'
            ];
    
            $validate = Validator::make($request->all(), $rules);
    
            if($validate->fails()){
                echo json_encode(["success" => false, 'message' => $validate->errors(), 'error' => $validate->errors() ]);
                exit();
            }

            $password = Hash::make($request->input('password'));

            $user_model = new UserModel();
            $user =  $user_model->change_password($password);
            
        }
    }

    public function create_user(Request $req){
       
        $rules = [
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
            'username' => 'required | min:5',
        ];

        $validate = Validator::make($req->all(), $rules);

        if($validate->fails()){
            return $validate->errors();
            exit();
        }

        $user = new UserModel();

        $user->name = $req->name;
        $user->email = $req->email;
        $user->username = $req->username;
        $user->password = Hash::make($req->password);
        $res = $user->save();

        if(!$res){
            return ['status' => 'error', 'msg' => 'Invalid param passed!'];
        }

        return ['status' => 'success', 'msg' => 'User saved successfully!'];

    }
}
