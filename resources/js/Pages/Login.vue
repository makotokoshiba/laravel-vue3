<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-xl font-bold mb-4">ログイン</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" class="mb-2 p-2 border w-full" />
      <input v-model="password" type="password" placeholder="Password" class="mb-4 p-2 border w-full" />
      <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">ログイン</button>
    </form>
    <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''

  try {
    await auth.login({email: email.value, password: password.value})
  } catch (error: any) {
    if (error.response?.status === 422) {
      errorMessage.value = 'メールアドレスとパスワードは必須です。'
    } else if (error.response?.status === 401) {
      errorMessage.value = '認証に失敗しました。'
    } else {
      errorMessage.value = 'ログインに失敗しました。'
    }
  }
}
</script>

