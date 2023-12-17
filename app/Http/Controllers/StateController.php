<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StateModel;

class StateController extends Controller
{
    public function save_state(Request $request){

        // return Request::post();
        // echo json_encode('success');
        print_r($request->all());

        $check = StateModel::where('state_name', $request->state_name)->first();
        print_r($check);die('test');
        if($check){
            return response(['result' => ['Duplicate state!']], 404);
        }

        $state = new StateModel();
        $state->state_name = $request->state_name;
        $state->active = $request->active;
        $res = $state->save();

        print_r($res);
        if(!$res){
            return ['status' => 'error', 'msg' => 'State not saved!'];
        }

        return ['status' => 'success', 'msg' => 'State saved successfully!'];

    }

    public function get_list(){

        return view('state');
    }
}
