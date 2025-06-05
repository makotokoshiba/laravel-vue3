import { createRouter, createWebHistory } from 'vue-router';
import Home from '../Pages/Home.vue';
import Todo from '../Pages/Todo.vue';

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/todo', name: 'todo', component: Todo },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;