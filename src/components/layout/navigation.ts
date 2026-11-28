import type { Localized } from '../../data/types'

export const navigation = [
  { to: '/', label: { en: 'Home', fa: 'خانه' } },
  { to: '/team', label: { en: 'Team', fa: 'تیم' } },
  { to: '/projects', label: { en: 'Projects', fa: 'پروژه‌ها' } },
  { to: '/blog', label: { en: 'Blog', fa: 'وبلاگ' } },
] as const satisfies readonly { to: string; label: Localized }[]
