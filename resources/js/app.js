import './bootstrap';
import { createApp } from 'vue';
import MainComponent from './components/MainComponent.vue';

const app = createApp({});
app.component('main-component', MainComponent);
app.mount('#app');
