<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class UserModel extends Model
{
    use HasApiTokens, HasFactory;
    protected $table = 'users';

    public function get_user_by_username($username){
        return $this->where(['username'=> $username])->first();
    }

    // public function change_password(){
    //     $user =  User::find($req->id);
    //     $user->name = $req->input('name');
    //     $user->email = $req->input('email');
    //     $user->mobile = $req->input('mobile');
    //     $user->password = $req->input('password');
    //     $user->save();
    // }
}
