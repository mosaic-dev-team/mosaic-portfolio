import type { CardColor } from '../styles/cardColors'

export type Language = 'fa' | 'en'
export type Localized = Record<Language, string>

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
  tools: readonly string[]
  tags: readonly string[]
  memberSlugs: readonly string[]
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
