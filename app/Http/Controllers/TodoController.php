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
logger($request->todos);
        $user = $request->user();
        foreach ($request->todos as $todo) {
            Todo::create([
                'task' => $todo->task,
                'user_id' => $user->id,
                'content' => $todo->content,
                'start_date' => $todo->start_time,
                'end_date' => $todo->end_time,
            ]);
        }

        return response()->json(['message' => '登録完了']);
    }
}
