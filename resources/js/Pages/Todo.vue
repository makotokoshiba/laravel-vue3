<template>
  <main class="p-8">
    <h1 class="text-2xl font-bold mb-4">Todo Form</h1>

    <Form @submit="submitHandler">
      <div class="mb-4">
        <Field
          name="task"
          rules="required"
          v-model="task"
          placeholder="新しいタスクを入力"
          class="border p-2 rounded"
        />
        <ErrorMessage name="task" class="text-red-500 text-sm mt-1" />
        <v-btn type="submit" color="primary" class="ml-2">追加</v-btn>
      </div>
      
    <ul>
        <li
          v-for="(todo, index) in todos"
          :key="index"
          class="mb-2 flex items-center"
        >
          <span class="flex-1">{{ todo }}</span>
          <v-btn @click="removeTodo(index)" class="text-red-500">削除</v-btn>
        </li>
      </ul>
      <div>
        <v-btn color="green" @click="submitToDatabase" :disabled="todos.length === 0">登録</v-btn>
      </div>
    </Form>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form, Field, ErrorMessage, useForm } from 'vee-validate'
import axios from 'axios'

const todos = ref<string[]>([])
const task = ref<string>('')

const { handleSubmit, resetForm } = useForm({
  initialValues: { task: ''},
})

const onSubmit = () => {
  const trimmed = task.value.trim()
  if (trimmed) {
    todos.value.push(trimmed)
    task.value = null;
    
    // フォームリセット リセット後のエラーを回避
    resetForm()
  }
}
const submitHandler = handleSubmit(onSubmit);

const removeTodo = (index: number) => {
    todos.value.splice(index, 1)
}

const submitToDatabase = async () => {
  try {
    const response = await axios.post('/api/todos', {
      todos: todos.value, // 現在の配列を送信
    })
    // 成功したら todos を空にする
    todos.value = []
    console.log('登録成功', response.data)
  } catch (error) {
    console.error('登録失敗', error)
  }
}


</script>

<style>
body {
  font-family: sans-serif;
}
</style>
