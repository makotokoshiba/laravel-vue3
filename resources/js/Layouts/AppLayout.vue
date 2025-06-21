<template>
  <v-app>
    <div>
      <!-- ナビゲーションバー：ログイン済みのときだけ表示 -->
      <nav v-if="auth.isAuthenticated" class="navbar">
        <router-link to="/home" class="mr-4">Home</router-link>
        <router-link to="/todo">Todo</router-link>
        <router-link to="/counter" class="mr-4">Counter</router-link>
        <v-btn @click="logout">ログアウト</v-btn>
      </nav>

      <!-- メインコンテンツ -->
      <div v-if="isLoading" class="loading-screen">
          Laoding...
      </div>
      <div v-else>
          <!-- 通常のアプリ画面 -->
          <router-view />
      </div>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import axios from '@/plugins/axios'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const isLoading = ref(false)

function onLoadingEvent(e: CustomEvent) {
  isLoading.value = e.detail
}

onMounted(async () => {
  await axios.get('/sanctum/csrf-cookie')
  await auth.fetchUser()
  window.addEventListener('loading', onLoadingEvent)
})

onBeforeUnmount(() => {
  window.removeEventListener('loading', onLoadingEvent)
})

const logout = async () => {
  await auth.logout()
  router.push('/login') // ログアウト後のリダイレクト
}
</script>

<style scoped>
.navbar {
  padding: 16px;
  background-color: #f5f5f5;
}
.loading-screen {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.3);
  color: white;
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
</style>
