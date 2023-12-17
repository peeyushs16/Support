<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\StateModel;
use Validator;

class StateController extends Controller
{
    public function save_state(Request $request){

        $rules = [
            'state_name' => 'required|unique:state',
            'active' => 'required'
        ];

        $validate = Validator::make($request->all(), $rules);

        if($validate->fails()){
            return response([
                "success" => false,
                'result' => $validate->errors()
            ], 404);
        }

        $state = new StateModel();
        $state->state_name = $request->state_name;
        $state->active = $request->active;
        $res = $state->save();

        if(!$res){
            return response([
                "success" => false,
                'result' => 'State not saved!'
            ], 404);
        }
        return response([
            "success" => true,
            'result' => 'State saved successfully!'
        ], 200);

    }
    
    public function update_state(Request $request, $state_id){

        $rules = [
            'active' => 'required|int',
            'state_name' => [
                'required',
                Rule::unique('state','state_name')->ignore($state_id),
            ]
        ];

        // $rules = [
        //     // 'state_name' => 'required|unique:state,state_name,'.($state_id),
        //     'state_name' => 'required',
        //     'active' => 'required'
        // ];

        $validate = Validator::make($request->all(), $rules);

        if($validate->fails()){
            return response([
                "success" => false,
                'result' => $validate->errors()
            ], 404);
        }
 

        $state = StateModel::find($state_id);

        // print_r($state);die;
        $state->state_name = $request->state_name;
        $state->active = $request->active;
        $res = $state->save();

        if(!$res){
            return response([
                "success" => false,
                'result' => 'State not saved!'
            ], 404);
        }
        return response([
            "success" => true,
            'result' => 'State saved successfully!'
        ], 200);
    }
}
