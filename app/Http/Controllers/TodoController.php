<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $todos = Todo::where('user_id', $user->id)->get();
        return response()->json($todos);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'todos' => 'required|array',
            'todos.*' => 'required|string|max:255',
        ]);

        $user = $request->user();
        foreach ($request->todos as $task) {
            Todo::create([
                'task' => $task,
                'user_id' => $user->id,
            ]);
        }

        return response()->json(['message' => '登録完了']);
    }
}
