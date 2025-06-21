import '../css/app.css'
import './bootstrap'

import { createApp } from 'vue'
import router from './router'
import AppLayout from './Layouts/AppLayout.vue'
import { configure, defineRule } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import pinia from './stores/pinia'
import vuetify from './plugins/vuetify'
import axios from '@/plugins/axios'
import { useAuthStore } from './stores/authStore'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.baseURL = 'http://localhost:8000'

// vee-validate ルール設定
defineRule('required', required)
defineRule('email', email)
configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `${ctx.field} は必須です`,
      email: `正しいメールアドレスを入力してください`,
    }
    return messages[ctx.rule?.name] || `${ctx.field} の入力が正しくありません`
  },
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
  validateOnSubmit: true,
})

// ✅ すべての処理を非同期でラップ
;(async () => {
  // 1. CSRF Cookie を取得
  await axios.get('/sanctum/csrf-cookie')

  // 2. アプリ初期化
  const app = createApp(AppLayout)
  app.use(router).use(pinia).use(vuetify)

  // 3. 認証ユーザーの取得
  const authStore = useAuthStore()
  await authStore.fetchUser()

  if (authStore.isAuthenticated) {
    console.log('ログイン済み')
  } else {
    console.log('未ログイン')
  }

  // 4. アプリをマウント
  app.mount('#app')
})()
