export type Text = {
  en: string
  fa: string
}

export type Image = {
  src: string
  alt: Text
}

export type Member = {
  slug: string
  name: Text
  role: Text
  bio: Text
  skills: readonly string[]
  education: readonly { title: Text; institution: Text; period: Text }[]
  experience: readonly { title: Text; organization: Text; period: Text; responsibilities?: readonly Text[] }[]
  languages?: readonly { name: Text; level: Text }[]
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
  title: Text
  summary: Text
  problem: Text
  solution: Text
  lessons: Text
  achievements: readonly Text[]
  tools: readonly string[]
  tags: readonly string[]
  memberSlugs: readonly string[]
  image?: Image
  repositoryUrl?: string
  liveUrl?: string
}

export type ProjectFilters = { q?: string; member?: string; tag?: string }

export type Post = {
  slug: string
  title: Text
  summary: Text
  body: Text
  cover?: Image
  authorSlug: string
  /** Publication date in YYYY-MM-DD format. */
  publishedAt: string
  tags: readonly string[]
}
