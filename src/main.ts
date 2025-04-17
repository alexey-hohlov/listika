import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './styles/index.css';
import App from './App.vue';
import { focus } from '@/directives/focus';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');

app.directive('focus', focus);
