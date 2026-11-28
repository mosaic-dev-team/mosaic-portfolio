import { useLayoutEffect, useState, type ReactNode } from 'react'
import type { Language } from '../data/types'
import { LanguageContext } from './language'
import { readPreference, savePreference } from './preferences'

const storageKey = 'mosaic-language'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() =>
    readPreference(storageKey) === 'fa' ? 'fa' : 'en',
  )

  useLayoutEffect(() => {
    const html = document.documentElement
    html.lang = language
    html.dir = language === 'fa' ? 'rtl' : 'ltr'
    savePreference(storageKey, language)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
