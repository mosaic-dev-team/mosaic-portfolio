import type { Language } from '../data/types'

export function formatDate(date: string, language: Language): string {
  const locale = language === 'fa' ? 'fa-IR' : 'en-US'

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(date))
}
