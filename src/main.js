import { createApp } from 'vue'
import App from './App.vue'

// Import Pinia
import pinia from './stores'

// Import VueUse Head for SEO
import { createHead } from '@vueuse/head'

// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/style.css'

const app = createApp(App)

// Registra Pinia
app.use(pinia)

// Registra VueUse Head
const head = createHead()
app.use(head)

// Carica i dati iniziali del portfolio
import { usePortfolioStore } from './stores/portfolio'
const portfolioStore = usePortfolioStore()
portfolioStore.loadAll().catch(err => {
  console.error('Error loading initial portfolio data:', err)
})

app.mount('#app')