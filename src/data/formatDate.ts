import type { Text } from './types'

export function formatDate(date: string, language: keyof Text): string {
  const locale = language === 'fa' ? 'fa-IR' : 'en-US'

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(date))
}
