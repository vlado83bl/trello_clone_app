import { createApp } from 'vue';

import router from './router';
import store from './store';
import App from './App.vue';
import mitt from 'mitt';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseTemplate from './components/ui/BaseTemplate.vue'

const emitter = mitt();
const app = createApp(App);

app.config.globalProperties.emitter = emitter;

app.use(router);
app.use(store);

app.component('base-badge', BaseBadge);
app.component('base-template', BaseTemplate);

app.mount('#app');
