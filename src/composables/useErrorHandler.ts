import { ref } from 'vue'

interface ErrorDetails {
  message: string
  details?: unknown
  code?: number | string
  timestamp: string
}

export function useErrorHandler() {
  const error = ref<string | ErrorDetails | null>(null)
  const retryCount = ref(0)
  const maxRetries = 3

  const setError = (err: unknown, message: string | null = null): void => {
    if (err === null || err === undefined) {
      error.value = null
      return
    }

    if (err && typeof err === 'object') {
      const errorObj = err as { message?: string; response?: { data?: unknown; status?: number }; code?: string }
      error.value = {
        message: message || errorObj.message || 'Si è verificato un errore',
        details: errorObj.response?.data || errorObj.message,
        code: errorObj.response?.status || errorObj.code,
        timestamp: new Date().toISOString(),
      }
    } else {
      error.value = message || (typeof err === 'string' ? err : 'Si è verificato un errore')
    }
    console.error('Error:', error.value)
  }

  const clearError = (): void => {
    error.value = null
    retryCount.value = 0
  }

  const retry = async <T>(fn: () => Promise<T>, delay = 1000): Promise<T | null> => {
    if (retryCount.value >= maxRetries) {
      const lastError = new Error('Numero massimo di tentativi raggiunto')
      setError(lastError)
      return null
    }

    try {
      retryCount.value++
      await new Promise((resolve) => setTimeout(resolve, delay * retryCount.value))
      const result = await fn()
      clearError()
      return result
    } catch (err) {
      // Log dettagliato dell'errore per debugging
      console.error(`Retry attempt ${retryCount.value}/${maxRetries} failed:`, err)
      
      if (retryCount.value < maxRetries) {
        console.log(`Retrying in ${delay * (retryCount.value + 1)}ms...`)
        return retry(fn, delay)
      }
      
      // Ultimo tentativo fallito, salva l'errore originale
      console.error('All retry attempts exhausted. Last error:', err)
      setError(err)
      return null
    }
  }

  return {
    error,
    retryCount,
    setError,
    clearError,
    retry,
  }
}
