/**
 * Composable per gestire eventi keyboard
 */
export function useKeyboard() {
  const handleEscape = (callback: () => void): (() => void) => {
    const handler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        callback()
      }
    }

    window.addEventListener('keydown', handler)

    return () => {
      window.removeEventListener('keydown', handler)
    }
  }

  const handleKey = (
    key: string,
    callback: () => void,
    modifiers?: { ctrl?: boolean; shift?: boolean; alt?: boolean }
  ): (() => void) => {
    const handler = (e: KeyboardEvent): void => {
      if (e.key === key) {
        if (modifiers) {
          if (modifiers.ctrl && !e.ctrlKey) return
          if (modifiers.shift && !e.shiftKey) return
          if (modifiers.alt && !e.altKey) return
        }
        callback()
      }
    }

    window.addEventListener('keydown', handler)

    return () => {
      window.removeEventListener('keydown', handler)
    }
  }

  return {
    handleEscape,
    handleKey,
  }
}
