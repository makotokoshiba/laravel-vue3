<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">ホーム</h1>
    <ul>
      <li v-for="todo in todos" :key="todo.id" class="mb-2">
        ✅ {{ todo.task }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '@/plugins/axios'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()
const todos = ref<any[]>([])

onMounted(async () => {
  // ✅ 認証済みかつ未取得なら取得
  if (auth.isAuthenticated) {
    console.log('🟢 ユーザー認証済み、Todos取得開始')
    try {
      const response = await axios.get('/api/todos')
      todos.value = response.data
    } catch (error) {
      console.error('Todo取得失敗', error)
    }
  }
})
</script>

<style scoped>
/* 必要ならスタイルを追加 */
</style>
