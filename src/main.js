import { createApp } from 'vue'
import App from './App.vue'

// importa il tour per Vue3
import Vue3Tour from 'vue3-tour'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/style.css'

import 'vue3-tour/dist/vue3-tour.css'

const app = createApp(App)

// registra il plugin sul tuo app instance
app.use(Vue3Tour)

app.mount('#app')