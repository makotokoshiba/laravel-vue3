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
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
          追加
        </button>
      </div>
    </Form>

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
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form, Field, ErrorMessage, useForm } from 'vee-validate'

const todos = ref<string[]>([])
const task = ref<string>('')

const { handleSubmit, resetForm } = useForm({
  initialValues: { task: ''},
})

const onSubmit = () => {
  const trimmed = task.value.trim()
  if (trimmed) {
    todos.value.push(trimmed)
    task.value = null
    
    // フォームリセット リセット後のエラーを回避
    resetForm()
  }
}
const submitHandler = handleSubmit(onSubmit);

const removeTodo = (index: number) => {
    todos.value.splice(index, 1)
}

</script>

<style>
body {
  font-family: sans-serif;
}
</style>
