import { createApp } from 'vue'
import './assets/reset.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
app.use(router).use(pinia).mount('#app')
