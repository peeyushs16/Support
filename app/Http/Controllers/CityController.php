<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\CityModel;
use App\Models\StateModel;
use Validator;

class CityController extends Controller
{
    public function get_view(){

        $state_model = new StateModel();
        $data['state_list'] = $state_model->get_state_list();
        return view('city', $data);
    }

    public function get_list(Request $request){

        $city_model =new CityModel();

        $response =  $city_model->get_city_list();

        $html = '<table class="table table-hover full-width" id="tblCityList">
                    <thead>
                        <tr>
                            <td style="width:35%;">State Name</td>
                            <td style="width:35%;">City Name</td>
                            <td style="width:20%;">Status</td>
                            <td style="width:10%;">Action</td>
                        </tr>
                    </thead>
                    <tbody>';
        foreach($response as $row){
            $html .= "<tr id='tr_city_".$row->city_id."'>
                        <td>".$row->state_name."</td>
                        <td>".$row->city_name."</td>
                        <td>". ($row->active == 1 ? 'Active' : 'Inactive')."</td>
                        <td>
                            <button class='btn btn-warning btn-xs' onclick='edit_city(".$row->city_id.");'>Edit</button>
                            <button class='btn btn-danger btn-xs' onclick='delete_city(".$row->city_id.");'>Delete</button>
                        </td>
                    </tr>";
        }
        $html .= '</tbody></table>';
        return $html;

    }

    public function save_city(Request $request){

        $rules = [
            'city_name' => 'required|unique:city',
            'state_id' => 'required|int',
            'active' => 'required'
        ];

        $validate = Validator::make($request->all(), $rules);

        if($validate->fails()){
            return response([
                "success" => false,
                'result' => $validate->errors()
            ], 200);
        }

        $city = new CityModel();
        $city->city_name = $request->city_name;
        $city->state_id = $request->state_id;
        $city->active = $request->active;
        $res = $city->save();

        if(!$res){
            return response([
                "success" => false,
                'result' => 'City not saved!'
            ], 404);
        }
        return response([
            "success" => true,
            'result' => 'City saved successfully!'
        ], 200);

    }
    
    public function update_city(Request $request, $city_id){

        $rules = [
            'active' => 'required',
            'state_id' => 'required|int',
            'city_name' => [
                'required',
                Rule::unique('city', 'city_name')->ignore($city_id, 'city_id'),
            ],
        ];

        $validate = Validator::make($request->all(), $rules);

        if($validate->fails()){
            return response([
                "success" => false,
                'result' => $validate->errors()
            ], 404);
        }
 
        $city = CityModel::where('city_id', $city_id)->first();
        if($city){
            $update_array = [
                'city_name' => $request->city_name,
                'state_id' => $request->state_id,
                'active' => $request->active,
            ];
            CityModel::where('city_id', $city_id)->update($update_array);
                
            return response([
                "success" => true,
                'result' => 'City updated successfully!'
            ], 200);
        }else {
            return response([
                "success" => false,
                'result' => 'City not updated!'
            ], 404);
        }
    }

    public function edit_city($city_id){
        return CityModel::where('city_id', $city_id)->first();
    }

    public function delete_city($city_id){

        $check = CityModel::where('city_id', $city_id)->first();

        if(!$check){
            return response([
                "success" => false,
                'result' => 'City not found!'
            ], 404);
        }

        CityModel::where('city_id', $city_id)->delete();
        

        return response([
            "success" => true,
            'result' => 'City deleted successfully!'
        ], 200);
    }
}
