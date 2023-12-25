<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class StateModel extends Model
{
    use HasFactory;
    public $table = "state";
    protected $fillable = ['state_name', 'active'];

    public function get_state_list(){
        return DB::table($this->table)->get()->toArray();
    }
}
