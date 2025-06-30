<template>
  <v-app>
    <div>
      <!-- ナビゲーションバー -->
      <nav v-if="auth.isAuthenticated" class="navbar">
        <router-link to="/home" class="mr-4">Home</router-link>
        <router-link to="/todo">Todo</router-link>
        <router-link to="/counter" class="mr-4">Counter</router-link>
        <v-btn @click="logout">ログアウト</v-btn>
      </nav>

      <router-view />
      <div v-if="isLoading || !isReady" class="loading-screen">
        Loading...
      </div>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import axios from '@/plugins/axios'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const isReady = ref(false)
const isLoading = ref(false)

function onLoadingEvent(e: CustomEvent) {
  isLoading.value = e.detail
}

onMounted(async () => {
  window.addEventListener('loading', onLoadingEvent)

  try {
    isLoading.value = true

    await axios.get('/sanctum/csrf-cookie')
    await auth.fetchUser()

  } catch (e) {
    console.warn('初期処理失敗:', e)
  } finally {
    isReady.value = true
    isLoading.value = false
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('loading', onLoadingEvent)
})

const logout = async () => {
  await auth.logout()
  router.push('/login')
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
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
</style>
