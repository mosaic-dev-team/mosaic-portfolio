import { useLayoutEffect, useState, type ReactNode } from 'react'
import { readPreference, savePreference } from './preferences'
import { ThemeContext, type Theme } from './theme'

const storageKey = 'mosaic-theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<Theme | null>(() => {
    const stored = readPreference(storageKey)
    return stored === 'light' || stored === 'dark' ? stored : null
  })
  const [systemTheme] = useState<Theme>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )
  const theme = preference ?? systemTheme

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    if (preference !== null) savePreference(storageKey, preference)
  }, [preference, theme])

  function toggleTheme() {
    setPreference((previous) =>
      (previous ?? systemTheme) === 'light' ? 'dark' : 'light',
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
