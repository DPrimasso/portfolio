import { ref, watch } from 'vue'

type Theme = 'dark' | 'light'

const theme = ref<Theme>('dark')
let isWatchingTheme = false

function isTheme(value: string | null): value is Theme {
  return value === 'dark' || value === 'light'
}

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem('dp-theme')
    return isTheme(stored) ? stored : null
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Failed to read saved theme', error)
    }
    return null
  }
}

function applyTheme(t: Theme) {
  if (document.documentElement.dataset.theme === t) {
    return
  }
  document.documentElement.dataset.theme = t
  try {
    localStorage.setItem('dp-theme', t)
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Failed to persist theme', error)
    }
  }
}

export function useTheme() {
  function init() {
    const stored = readStoredTheme()
    const preferred: Theme =
      stored ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    theme.value = preferred
  }

  if (!isWatchingTheme) {
    watch(theme, applyTheme)
    isWatchingTheme = true
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme, init, toggleTheme }
}
