<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

// API ルートは "api/" プレフィックス付きでアクセスされます（例：/api/todos）
Route::middleware('api')->group(function () {
    Route::post('/todos', [TodoController::class, 'store']);
});
