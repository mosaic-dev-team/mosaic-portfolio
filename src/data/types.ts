export type Text = {
  en: string
  fa: string
}

export type Member = {
  slug: string
  name: Text
  role: Text
  bio: Text
  skills: readonly string[]
  experience: readonly { title: Text; organization: Text; period: Text }[]
  resumePdfUrl?: string
}

export type Project = {
  slug: string
  title: Text
  summary: Text
  problem: Text
  solution: Text
  lessons: Text
  tools: readonly string[]
  tags: readonly string[]
  memberSlugs: readonly string[]
  repositoryUrl?: string
  liveUrl?: string
}

export type Post = {
  slug: string
  title: Text
  summary: Text
  body: Text
  authorSlug: string
  /** Publication date in YYYY-MM-DD format. */
  publishedAt: string
  tags: readonly string[]
}
