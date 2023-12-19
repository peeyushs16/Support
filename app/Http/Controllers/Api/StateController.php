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
            ], 200);
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
            'active' => 'required',
            'state_name' => [
                'required',
                Rule::unique('state', 'state_name')->ignore($state_id),
            ],
        ];

        $validate = Validator::make($request->all(), $rules);

        if($validate->fails()){
            // echo json_encode([
            //     "success" => false,
            //     'result' => $validate->errors()
            // ]);die;
            return response([
                "success" => false,
                'result' => $validate->errors()
            ], 404);
        }
 
        $state = StateModel::find($state_id);
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

    public function edit_state($state_id){
        return StateModel::where('id', $state_id)->first();
    }

    public function delete_state($state_id){

        $check = StateModel::find($state_id);

        if(!$check){
            return response([
                "success" => false,
                'result' => 'State not found!'
            ], 404);
        }
        $res = $check->delete();

        return response([
            "success" => true,
            'result' => 'State deleted successfully!'
        ], 200);
    }

    public function get_list(Request $request){

        $query = StateModel::query();

        if ($request->state_name) {
            $query->where('state_name', $request->state_name);
        }

        $response =  $query->get();

        $html = '<table class="table table-hover full-width" id="tblStateList">
                    <thead>
                        <tr>
                            <td style="width:70%;">State Name</td>
                            <td style="width:20%;">Status</td>
                            <td style="width:10%;">Action</td>
                        </tr>
                    </thead>
                    <tbody>';
        foreach($response as $row){
            $html .= "<tr id='tr_state_".$row['id']."'>
                        <td>".$row['state_name']."</td>
                        <td>". ($row['active'] == 1 ? 'Active' : 'Inactive')."</td>
                        <td>
                            <button class='btn btn-warning btn-xs' onclick='edit_state(".$row['id'].");'>Edit</button>
                            <button class='btn btn-danger btn-xs' onclick='delete_state(".$row['id'].");'>Delete</button>
                        </td>
                    </tr>";
        }
        $html .= '</tbody></table>';
        return $html;

    }
}
