import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import './assets/portfolio.css'

function showRuntimeOverlay(message) {
  const id = 'dp-runtime-error-overlay'
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('div')
    el.id = id
    el.style.position = 'fixed'
    el.style.left = '0'
    el.style.right = '0'
    el.style.bottom = '0'
    el.style.zIndex = '999999'
    el.style.padding = '10px 14px'
    el.style.background = '#7f1d1d'
    el.style.color = '#fff'
    el.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, monospace'
    el.style.fontSize = '12px'
    el.style.lineHeight = '1.45'
    el.style.whiteSpace = 'pre-wrap'
    el.style.borderTop = '1px solid rgba(255,255,255,0.2)'
    document.body.appendChild(el)
  }
  el.textContent = `Runtime error: ${message}`
}

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

app.config.errorHandler = (err, _instance, info) => {
  const msg = err instanceof Error ? `${err.name}: ${err.message}` : String(err)
  showRuntimeOverlay(`${msg}\n${info}`)
}

window.addEventListener('error', e => {
  const msg = e.error?.message || e.message || 'Unknown window error'
  showRuntimeOverlay(msg)
})

window.addEventListener('unhandledrejection', e => {
  const reason = e.reason
  const msg = reason instanceof Error ? `${reason.name}: ${reason.message}` : String(reason)
  showRuntimeOverlay(`Unhandled rejection: ${msg}`)
})

app.use(pinia)
app.use(head)
app.use(router)
app.mount('#app')
