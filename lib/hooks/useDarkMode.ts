import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

export function useDarkMode() {
  const [darkMode, setDarkMode, isLoaded] = useLocalStorage<boolean>('dark-mode', false)

  useEffect(() => {
    if (!isLoaded) return

    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode, isLoaded])

  return [darkMode, setDarkMode] as const
}
