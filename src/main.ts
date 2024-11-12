import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';

import * as buffer from 'buffer';

if (typeof (window as any).Buffer === 'undefined') {
    (window as any).Buffer = buffer.Buffer;
}

const app = createApp(App)
const pinia = createPinia()

app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')