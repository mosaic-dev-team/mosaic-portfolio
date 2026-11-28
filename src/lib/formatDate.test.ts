import { expect, test } from 'vitest'
import { formatDate } from './formatDate'

test('formats date-only values in English and Persian', () => {
  expect(formatDate('2026-03-21', 'en')).toBe('March 21, 2026')
  expect(formatDate('2026-03-21', 'fa')).toBe('۱ فروردین ۱۴۰۵')
})
