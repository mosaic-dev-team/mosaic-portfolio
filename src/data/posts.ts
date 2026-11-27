import type { Post } from './types'

export const posts: readonly Post[] = [
  {
    slug: 'why-a-shared-data-model',
    title: { en: 'Why share a data model?', fa: 'چرا از مدل دادهٔ مشترک استفاده می‌کنیم؟' },
    summary: {
      en: 'How stable slugs connect team members and their work.',
      fa: 'شناسه‌های ثابت چطور اعضای تیم و کارهایشان را به هم وصل می‌کنند؟',
    },
    body: {
      en: 'A project can refer to its contributors by slug. Their profile links and display names then come from a single member record. Adding a Persian translation or correcting a name is a change to that record, and every page can use the updated version.',
      fa: 'هر پروژه اعضای سازنده را با شناسهٔ آن‌ها معرفی می‌کند. لینک رزومه و نام نمایشی هر نفر از همان دادهٔ مشترک اعضا می‌آید. برای افزودن ترجمه یا اصلاح نام، کافی است دادهٔ عضو را به‌روز کنیم تا همهٔ صفحه‌ها از نسخهٔ جدید استفاده کنند.',
    },
    authorSlug: 'demo',
    publishedAt: '2026-11-27',
    tags: ['data-modeling'],
  },
]
