<template>
    <h1 class="text-2xl font-bold mb-4">Todoリスト</h1>
  
    <div class="mb-4">
        <input
          v-model="newTodo"
          @keyup.enter="addTodo"
          placeholder="新しいタスクを入力"
          class="border p-2 rounded w-64"
        />
        <button @click="addTodo" class="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          追加
        </button>
    </div>
  
    <ul>
        <li
          v-for="(todo, index) in todos"
          :key="index"
          class="mb-2 flex items-center"
        >
          <span class="flex-1">{{ todo }}</span>
          <button @click="removeTodo(index)" class="text-red-500">削除</button>
        </li>
      </ul>
  </template>
  
  
<script setup lang="ts">
import { ref } from 'vue'

const newTodo = ref<string>('')
const todos = ref<string[]>([])

const addTodo = () => {
    if (newTodo.value.trim()) {
        todos.value.push(newTodo.value.trim())
        newTodo.value = ''
    }
}

const removeTodo = (index: number) => {
    todos.value.splice(index, 1)
}
</script>
  