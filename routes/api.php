<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Auth;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});


// API ルートは "api/" プレフィックス付きでアクセスされます（例：/api/todos）
Route::middleware('api')->group(function () {
    Route::post('/todos', [TodoController::class, 'store']);

});
