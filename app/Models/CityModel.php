<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class CityModel extends Model
{
    use HasFactory;
    public $table = "city";
    protected $fillable = ['city_name', 'state_id', 'active'];

    public function get_city_list(){
        return DB::table('city as ct')
        ->select('ct.city_name','ct.city_id','ct.active','st.state_name')
        ->join('state as st', 'st.id', '=', 'ct.state_id')
        ->get()->toArray();
    }
}
