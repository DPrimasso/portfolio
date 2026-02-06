/**
 * Configurazione centralizzata per le variabili d'ambiente
 * Tutte le variabili d'ambiente devono essere prefissate con VITE_ per essere accessibili lato client
 */

export const config = {
  // Base URL del sito
  baseUrl: import.meta.env.VITE_BASE_URL || '',

  // URL dell'API chatbot
  apiUrl: import.meta.env.VITE_CHATBOT_API_URL || '/api/chatbot',

  // Environment flags
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,

  // Sentry DSN (opzionale)
  sentryDsn: import.meta.env.VITE_SENTRY_DSN || null,
} as const

/**
 * Verifica che le variabili d'ambiente richieste siano configurate
 * @param requiredVars - Array di nomi di variabili richieste
 */
export function validateEnv(requiredVars: string[] = []): void {
  if (!config.isProd) return

  const missing = requiredVars.filter(varName => {
    const value = import.meta.env[varName]
    return !value || value === ''
  })

  if (missing.length > 0) {
    console.warn(`Missing required environment variables: ${missing.join(', ')}`)
  }
}
