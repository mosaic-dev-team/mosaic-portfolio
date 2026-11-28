import { createContext, useContext } from 'react'
import type { Language } from '../data/types'

export const LanguageContext = createContext<{
  language: Language
  setLanguage: (language: Language) => void
} | null>(null)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
