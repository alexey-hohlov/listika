import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './styles/index.css';
import App from './App.vue';
import { focus } from '@/directives/focus';
import { clickOutside } from '@/directives/clickOutside';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

app.directive('focus', focus);
app.directive('click-outside', clickOutside);

app.mount('#app');
