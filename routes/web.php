<?php

use Illuminate\Support\Facades\Route;

Route::get('/', 'App\Http\Controllers\MainController@Index')->name('IndexURL');
Route::post('/get-auto-name', 'App\Http\Controllers\MainController@GetAutoName')->name('GetAutoNameURL');