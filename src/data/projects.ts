import type { Project, ProjectFilters } from './types'

export const projects: readonly Project[] = [
  {
    slug: 'mosaic-portfolio',
    title: { en: 'Mosaic Portfolio', fa: 'نمونه‌کار موزاییک' },
    summary: {
      en: 'A bilingual portfolio for the Mosaic team.',
      fa: 'سایت نمونه‌کار دوزبانه برای تیم موزاییک.',
    },
    problem: {
      en: 'Each team member needs a shareable résumé, while the team needs a common home for its work.',
      fa: 'هر عضو به رزومه‌ای قابل اشتراک نیاز دارد و تیم هم به یک سایت مشترک برای معرفی کارهایش.',
    },
    solution: {
      en: 'Use a shared data model and page templates for member profiles, projects, and posts.',
      fa: 'از مدل داده و قالب‌های مشترک برای معرفی اعضا، پروژه‌ها و نوشته‌ها استفاده کنیم.',
    },
    lessons: {
      en: 'Stable slugs let us link related content across pages.',
      fa: 'شناسه‌های ثابت کمک می‌کنند محتوای مرتبط را بین صفحه‌ها به هم وصل کنیم.',
    },
    achievements: [
      {
        en: 'Added linked sample records for members, projects, and posts.',
        fa: 'داده‌های نمونهٔ مرتبط برای اعضا، پروژه‌ها و نوشته‌ها اضافه شدند.',
      },
    ],
    tools: ['React', 'TypeScript', 'TanStack Router'],
    tags: ['react', 'typescript'],
    memberSlugs: ['demo'],
    repositoryUrl: 'https://github.com/mosaic-dev-team/mosaic-portfolio',
  },
]

export function validateProjectFilters(search: Record<string, unknown>): ProjectFilters {
  const { q, member, tag } = search

  return {
    // The router parses an unquoted numeric or boolean query as a scalar.
    q: typeof q === 'number' || typeof q === 'boolean' ? String(q) : nonBlank(q),
    member: nonBlank(member),
    tag: nonBlank(tag),
  }
}

function nonBlank(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined
}

export function filterProjects(
  list: readonly Project[],
  { q, member, tag }: ProjectFilters,
): Project[] {
  const query = q?.trim().toLowerCase()

  return list.filter((project) =>
    (!member || project.memberSlugs.includes(member)) &&
    (!tag || project.tags.includes(tag)) &&
    (!query ||
      [project.title.fa, project.title.en, ...project.tags].some((text) =>
        text.toLowerCase().includes(query),
      )),
  )
}
