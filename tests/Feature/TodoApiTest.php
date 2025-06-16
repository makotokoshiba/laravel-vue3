<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Todo;

class TodoApiTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_todos_can_be_store(): void
    {
       $response = $this->postJson('/api/todos', [
            'todos' => ['テスト1', 'テスト2'],
        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => '登録完了']);

        $this->assertDatabaseHas('todos', ['task' => 'テスト1']);
        $this->assertDatabaseHas('todos', ['task' => 'テスト2']);
    }
}
