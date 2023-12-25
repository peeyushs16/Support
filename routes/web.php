<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\StateController;
use App\Http\Controllers\CityController;
use App\Http\Middleware\CheckLogin;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [AuthController::class, 'signin'])->name('login');
Route::post('/process_login', [AuthController::class, 'process_login']);
Route::get('/signout', [AuthController::class, 'signout']);

Route::middleware([CheckLogin::class])->group(function(){
    Route::get('/home', [HomeController::class, 'index'])->name('dashboard');
    Route::get('/dashboard', [HomeController::class, 'index']);
    Route::get('/state', [StateController::class, 'get_list']);

    Route::get('/city', [CityController::class, 'get_view']);
    
    Route::post('/city/save', [CityController::class, 'save_city']);
    Route::post('/city/update/{id}', [CityController::class, 'update_city']);
    Route::get('/city/getlist', [CityController::class, 'get_list']);
    Route::get('/city/edit_city/{id}', [CityController::class, 'edit_city']);
    Route::delete('/city/delete_city/{id}', [CityController::class, 'delete_city']);

});