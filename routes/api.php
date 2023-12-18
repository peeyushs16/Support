<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\StateController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\CheckLogin;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/add_user', [AuthController::class, 'create_user']);
Route::post('/process_login_api', [AuthController::class, 'process_login_api']);


// ::prefix('admin')
Route::group(['middleware' => 'auth:sanctum'], function(){
    //All secure URL's
    Route::post('/state/save', [StateController::class, 'save_state']);
    Route::post('/state/update/{id}', [StateController::class, 'update_state']);
    Route::get('/state/getlist', [StateController::class, 'get_list']);
    Route::get('/state/edit_state/{id}', [StateController::class, 'edit_state']);
    Route::post('/change_password', [AuthController::class, 'change_password']);
});


