import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import './assets/portfolio.css'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()
app.use(pinia)
app.use(head)
app.mount('#app')
