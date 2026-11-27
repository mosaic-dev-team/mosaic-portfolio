import { expect, test } from 'vitest'
import { formatDate } from './formatDate'
import { members } from './members'
import { posts } from './posts'
import { projects } from './projects'

test('sample project contributors and post authors resolve to members', () => {
  expect(members.length).toBeGreaterThan(0)
  expect(projects.length).toBeGreaterThan(0)
  expect(posts.length).toBeGreaterThan(0)

  const memberSlugs = new Set(members.map((member) => member.slug))
  const contributorSlugs = projects.flatMap((project) => project.memberSlugs)
  const authorSlugs = posts.map((post) => post.authorSlug)

  for (const slug of [...contributorSlugs, ...authorSlugs]) {
    expect(memberSlugs.has(slug)).toBe(true)
  }
})

test('formats date-only values in English and Persian', () => {
  expect(formatDate('2026-03-21', 'en')).toBe('March 21, 2026')
  expect(formatDate('2026-03-21', 'fa')).toBe('۱ فروردین ۱۴۰۵')
})
