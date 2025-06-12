import '../css/app.css'
import './bootstrap'

import { createApp } from 'vue'
import router from './router'
import AppLayout from './Layouts/AppLayout.vue'
import { configure, defineRule } from 'vee-validate'
import { required, email } from '@vee-validate/rules'

// ルールをグローバル登録
defineRule('required', required)
defineRule('email', email)

// エラーメッセージと動作を統一設定
configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `${ctx.field} は必須です`,
      email: `正しいメールアドレスを入力してください`,
    }
    // ctx.rule.name が messages にあれば返し、なければデフォルト文言を返す
    return messages[ctx.rule?.name] || `${ctx.field} の入力が正しくありません`
  },
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
  validateOnSubmit: true
})

createApp(AppLayout)
  .use(router)
  .mount('#app')
