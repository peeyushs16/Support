<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserModel extends Model
{
    use HasFactory;
    protected $table = 'users';

    public function get_user_by_username($username){

        $user = $this->where('username', $username)->first()->toArray();
        return $user;
    }
}
