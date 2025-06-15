<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'todos' => 'required|array',
            'todos.*' => 'required|string|max:255',
        ]);

        foreach ($request->todos as $task) {
            Todo::create(['task' => $task]);
        }

        return response()->json(['message' => '登録完了']);
    }
}
