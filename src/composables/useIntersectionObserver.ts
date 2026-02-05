import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface UseIntersectionObserverOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
}

/**
 * Composable per Intersection Observer (utile per lazy loading, animations, etc.)
 */
export function useIntersectionObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: UseIntersectionObserverOptions = {}
) {
  const target: Ref<HTMLElement | null> = ref(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback(entry)
            if (options.once && observer) {
              observer.unobserve(entry.target)
            }
          }
        })
      },
      {
        root: options.root || null,
        rootMargin: options.rootMargin || '0px',
        threshold: options.threshold || 0,
      }
    )

    observer.observe(target.value)
  })

  onUnmounted(() => {
    if (observer && target.value) {
      observer.unobserve(target.value)
      observer.disconnect()
    }
  })

  return {
    target,
  }
}
