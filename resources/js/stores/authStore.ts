// stores/authStore.ts
import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | {id: number; name: string; email: string },
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async login(credentials: { email: string; password: string }) {
      try {
        await axios.get('/sanctum/csrf-cookie')
        await axios.post('/login', credentials)

        await this.fetchUser()

        router.push('/home')
      } catch (error) {
        console.error('ログイン失敗:', error)
        throw error
      }
    },

    async logout() {
      try {
       const res =  await axios.post('/logout')
      } catch (error) {
        console.error('ログアウト失敗:', error)
        // ログアウト失敗しても user を null に
      } finally {
        this.user = null
        router.push('/login')
      }
    },

    async fetchUser() {
      try {
        await axios.get('/sanctum/csrf-cookie')
        const res = await axios.get('/api/user', {
          withCredentials: true,
        })
        this.user = res.data;
        console.log('fetchUser: user is', this.user)
      } catch (error: any) {
        console.warn('ユーザー取得失敗', error?.response?.status)
        this.user = null
      }
    },
  },
})
