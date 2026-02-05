import { config } from '../config/env'

interface ErrorInfo {
  message: string
  stack?: string
  component?: string
  timestamp: string
  userAgent?: string
  url?: string
}

/**
 * Composable per error tracking
 * In development logga in console, in production può inviare a un endpoint
 */
export function useErrorTracking() {
  const trackError = (error: Error, component?: string): void => {
    const errorInfo: ErrorInfo = {
      message: error.message,
      stack: error.stack,
      component,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    }

    if (config.isDev) {
      console.error('Error tracked:', errorInfo)
    } else {
      // In production, puoi inviare a un endpoint
      // fetch('/api/errors', { method: 'POST', body: JSON.stringify(errorInfo) })
      console.error('Error:', errorInfo)
    }
  }

  return {
    trackError,
  }
}
