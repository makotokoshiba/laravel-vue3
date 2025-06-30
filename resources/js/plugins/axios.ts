// resources/js/plugins/axios.ts
import axios from 'axios'

// ローディングの状態を管理するためにシンプルなオブザーバーやイベントを使うか、
// Vueのリアクティブな変数にするパターンもありますが、
// ここでは最もシンプルにカスタムイベントで通知する例を示します。

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
})

// ローディング開始を通知
function showLoading() {
  window.dispatchEvent(new CustomEvent('loading', { detail: true }))
}

// ローディング終了を通知
function hideLoading() {
  window.dispatchEvent(new CustomEvent('loading', { detail: false }))
}

// リクエスト開始時
instance.interceptors.request.use(config => {
  showLoading()
  return config
}, error => {
  hideLoading()
  return Promise.reject(error)
})

// レスポンス受信時
instance.interceptors.response.use(response => {
  hideLoading()
  return response
}, error => {
  hideLoading()
  return Promise.reject(error)
})

export default instance
