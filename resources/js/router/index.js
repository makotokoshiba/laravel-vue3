import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore'
import Home from '../Pages/Home.vue';
import Todo from '../Pages/Todo.vue';
import Counter from '../Pages/Counter.vue'
import Login from '../Pages/Login.vue'

const routes = [
    { path: '/login', name: 'login', component: Login },
    { path: '/home', name: 'home', component: Home },
    { path: '/todo', name: 'todo', component: Todo },
    { path: '/counter', component: Counter },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// グローバルナビゲーションガード
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.path !== '/login' && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})


export default router;