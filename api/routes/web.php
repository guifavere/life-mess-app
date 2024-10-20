<?php

use Illuminate\Support\Facades\Route;

// auth
Route::post('login', 'Infra\Http\Controllers\Auth\LoginUserController');
Route::post('logout', 'Infra\Http\Controllers\Auth\LogoutUserController');
