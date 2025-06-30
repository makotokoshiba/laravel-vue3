<template>
  <main class="p-8">
    <h1 class="text-2xl font-bold mb-4">Todo Form</h1>

    <Form @submit="submitHandler">
      <div class="mb-4">
        <Field
          name="タスク"
          rules="required"
          v-model="task"
          placeholder="新しいタスクを入力"
          class="border p-2 rounded"
        />
        <ErrorMessage name="タスク" class="text-red-500 text-sm mt-1" />
      </div>
      <div class="mb-4">
        <Field
          name="内容"
          rules="required"
          v-model="content"
          placeholder="内容を入力"
          class="border p-2 rounded w-full"
        />
        <ErrorMessage name="内容" class="text-red-500 text-sm mt-1" />
      </div>
      <!-- 日時の設定 -->
      <DatetimeRangePicker
        v-model:start="startDatetime"
        v-model:end="endDatetime"
      />
      <v-btn type="submit" color="primary" class="ml-2 mb-4">追加</v-btn>
      <!-- テーブル表示 -->
      <table v-if="todos.length" class="min-w-full border mb-4">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-2 py-1">タスク</th>
            <th class="border px-2 py-1">内容</th>
            <th class="border px-2 py-1">開始</th>
            <th class="border px-2 py-1">終了</th>
            <th class="border px-2 py-1">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(todo, index) in todos" :key="index">
            <td class="border px-2 py-1">{{ todo.task }}</td>
            <td class="border px-2 py-1">{{ todo.content }}</td>
            <td class="border px-2 py-1">{{ todo.start_time }}</td>
            <td class="border px-2 py-1">{{ todo.end_time }}</td>
            <td class="border px-2 py-1">
              <v-btn @click="removeTodo(index)" class="text-red-500">削除</v-btn>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <v-btn color="green" @click="submitToDatabase" :disabled="todos.length === 0">登録</v-btn>
      </div>
    </Form>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form, Field, ErrorMessage, useForm } from 'vee-validate'
import axios from '@/plugins/axios'
import DatetimeRangePicker from '@/components/DatetimeRangePicker.vue'


interface Todo {
  task: string
  content: string
  start_time: string
  end_time: string
}
const todos = ref<Todo[]>([])
const task = ref<string>('')
const content = ref<string>('')
const startDatetime = ref<string>('')
const endDatetime = ref<string>('')

const { handleSubmit, resetForm } = useForm({
  initialValues: { task: '', content: ''},
})

const onSubmit = () => {
  if (task.value.trim()) {

    todos.value.push({
      task: task.value.trim(),
      content: content.value,
      start_time: startDatetime.value,
      end_time: endDatetime.value,
    })

    resetForm()
    startDatetime.value = ''
    endDatetime.value = ''
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
table {
  border-collapse: collapse;
}
th, td {
  text-align: left;
}
</style>
