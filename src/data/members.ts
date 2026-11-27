import type { Member } from './types'

export const members: readonly Member[] = [
  {
    slug: 'demo',
    name: { en: 'Sara Demo', fa: 'سارا نمونه' },
    role: { en: 'Frontend developer', fa: 'توسعه‌دهندهٔ فرانت‌اند' },
    bio: {
      en: 'A sample profile for building the shared Mosaic résumé page.',
      fa: 'پروفایل نمونه برای ساخت صفحهٔ رزومهٔ مشترک موزاییک.',
    },
    skills: ['React', 'TypeScript', 'CSS'],
    education: [
      {
        title: { en: 'Web development fundamentals', fa: 'مبانی توسعهٔ وب' },
        institution: { en: 'Self-directed study', fa: 'مطالعهٔ خودآموز' },
        period: { en: '2026', fa: '۱۴۰۵' },
      },
    ],
    experience: [
      {
        title: { en: 'Frontend bootcamp participant', fa: 'هنرجوی بوت‌کمپ فرانت‌اند' },
        organization: { en: 'Hamrah Academy', fa: 'آکادمی همراه' },
        period: { en: 'Autumn 2026', fa: 'پاییز ۱۴۰۵' },
      },
    ],
    contact: { email: 'sara@example.com' },
  },
]
