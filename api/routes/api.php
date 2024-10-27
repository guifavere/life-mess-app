<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', 'Infra\Http\Controllers\Auth\LoginUserController');
Route::post('logout', 'Infra\Http\Controllers\Auth\LogoutUserController')->middleware('auth:sanctum');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
