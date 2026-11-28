export type Language = 'fa' | 'en'
/** Text in every supported language, e.g. { fa: 'سارا', en: 'Sara' }. */
export type Localized = Record<Language, string>

export type CardColor =
  | 'neutral'
  | 'midnight'
  | 'marigold'
  | 'darkGreen'
  | 'berry'
  | 'cream'
  | 'creamAdaptive'
  | 'magenta'
  | 'orange'
  | 'forestGreen'
  | 'champagne'

export type Image = {
  src: string
  alt: Localized
}

export type Member = {
  slug: string
  color: CardColor
  name: Localized
  role: Localized
  bio: Localized
  skills: readonly string[]
  education: readonly { title: Localized; institution: Localized; period: Localized }[]
  experience: readonly { title: Localized; organization: Localized; period: Localized; responsibilities?: readonly Localized[] }[]
  languages?: readonly { name: Localized; level: Localized }[]
  ielts?: { overallBand: number; date: string }
  contact?: {
    email?: string
    githubUrl?: string
    linkedinUrl?: string
  }
  portrait?: Image
  resumePdfUrl?: string
}

export type Project = {
  slug: string
  color: CardColor
  title: Localized
  summary: Localized
  problem: Localized
  solution: Localized
  lessons: Localized
  achievements: readonly Localized[]
  /** Tool display names, e.g. 'TanStack Router'. */
  tools: readonly string[]
  /** Lowercase English keys for the URL filter, e.g. 'react'. */
  tags: readonly string[]
  memberSlugs: readonly string[]
  featured?: boolean
  image?: Image
  repositoryUrl?: string
  liveUrl?: string
}

export type ProjectFilters = { q?: string; member?: string; tag?: string }

export type Post = {
  status: 'draft' | 'published'
  slug: string
  title: Localized
  summary: Localized
  body: Localized
  cover?: Image
  authorSlug: string
  /** Publication date in YYYY-MM-DD format. */
  publishedAt: string
  tags: readonly string[]
}
