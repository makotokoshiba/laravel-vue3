import '../css/app.css';
import './bootstrap';

//import { createInertiaApp } from '@inertiajs/vue3';
//import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// import { createApp, h } from 'vue';
import { createApp} from 'vue';
//import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import router from './router';
import AppLayout from './Layouts/AppLayout.vue'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// createInertiaApp({
//     title: (title) => `${title} - ${appName}`,
//     resolve: (name) =>
//         resolvePageComponent(
//             `./Pages/${name}.vue`,
//             import.meta.glob('./Pages/**/*.vue'),
//         ),
//     setup({ el, App, props, plugin }) {
//         return createApp({ render: () => h(App, props) })
//             .use(plugin)
//             .use(ZiggyVue)
//             .use(router) 
//             .mount(el);
//     },
//     progress: {
//         color: '#4B5563',
//     },
// });

// inertia使わない
createApp(AppLayout)
    .use(router)
    .mount('#app')
