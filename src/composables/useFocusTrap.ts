import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Composable per implementare focus trap (utile per modali, chatbot, etc.)
 */
export function useFocusTrap() {
  let trapElement: HTMLElement | null = null
  let firstFocusable: HTMLElement | null = null
  let lastFocusable: HTMLElement | null = null

  const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ')

    return Array.from(container.querySelectorAll(focusableSelectors))
  }

  const trapFocus = (element: HTMLElement | Ref<HTMLElement | null>): (() => void) => {
    const el = element instanceof HTMLElement ? element : element.value
    if (!el) return () => {}

    trapElement = el
    const focusableElements = getFocusableElements(el)

    if (focusableElements.length === 0) return () => {}

    firstFocusable = focusableElements[0]
    lastFocusable = focusableElements[focusableElements.length - 1]

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault()
          lastFocusable?.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault()
          firstFocusable?.focus()
        }
      }
    }

    // Focus sul primo elemento
    firstFocusable?.focus()

    // Aggiungi event listener
    trapElement.addEventListener('keydown', handleKeyDown)

    // Return cleanup function
    return () => {
      trapElement?.removeEventListener('keydown', handleKeyDown)
      trapElement = null
      firstFocusable = null
      lastFocusable = null
    }
  }

  return {
    trapFocus,
  }
}
