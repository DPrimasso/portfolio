import { onMounted } from 'vue'
import { config } from '../config/env'

interface PerformanceMetrics {
  lcp?: number
  fid?: number
  cls?: number
  fcp?: number
  ttfb?: number
}

interface PerformanceEventTimingLike extends PerformanceEntry {
  processingStart: number
}

interface LayoutShiftLike extends PerformanceEntry {
  value: number
  hadRecentInput: boolean
}

/**
 * Composable per monitorare le performance e Core Web Vitals
 */
export function usePerformance() {
  const metrics: PerformanceMetrics = {}

  const measurePageLoad = (): void => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return
    }

    // Measure LCP (Largest Contentful Paint)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime?: number
          loadTime?: number
        }
        metrics.lcp = lastEntry.renderTime || lastEntry.loadTime || 0
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch {
      // LCP not supported
    }

    // Measure FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEventTimingLike
          metrics.fid = fidEntry.processingStart - fidEntry.startTime
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
    } catch {
      // FID not supported
    }

    // Measure CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          const layoutShift = entry as LayoutShiftLike
          if (!layoutShift.hadRecentInput) {
            clsValue += layoutShift.value
          }
        })
        metrics.cls = clsValue
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    } catch {
      // CLS not supported
    }

    // Measure FCP (First Contentful Paint)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            metrics.fcp = entry.startTime
          }
        })
      })
      fcpObserver.observe({ entryTypes: ['paint'] })
    } catch {
      // FCP not supported
    }

    // Measure TTFB (Time to First Byte)
    if ('PerformanceNavigationTiming' in window) {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming
      if (navigation) {
        metrics.ttfb = navigation.responseStart - navigation.requestStart
      }
    }
  }

  const sendMetrics = (): void => {
    if (config.isDev) {
      console.log('Performance metrics:', metrics)
      return
    }

    // In production, puoi inviare a un endpoint
    // fetch('/api/metrics', { method: 'POST', body: JSON.stringify(metrics) })
  }

  onMounted(() => {
    measurePageLoad()

    // Send metrics quando la pagina è completamente caricata
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        setTimeout(() => {
          sendMetrics()
        }, 2000)
      })
    }
  })

  return {
    metrics,
    measurePageLoad,
    sendMetrics,
  }
}
