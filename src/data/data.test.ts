import { expect, test } from 'vitest'
import { sampleMember } from './fixtures'
import { formatDate } from './formatDate'
import { members } from './members'
import { posts, publishedPosts } from './posts'
import { filterProjects, projects } from './projects'
import type { ProjectFilters } from './types'

function filteredSlugs(filters: ProjectFilters) {
  return filterProjects(projects, filters).map((project) => project.slug)
}

test('project contributors and post authors resolve to members', () => {
  expect(members.length).toBeGreaterThan(0)
  expect(projects.length).toBeGreaterThan(0)

  const memberSlugs = new Set(members.map((member) => member.slug))
  const contributorSlugs = projects.flatMap((project) => project.memberSlugs)
  const authorSlugs = publishedPosts.map((post) => post.authorSlug)

  for (const slug of [...contributorSlugs, ...authorSlugs]) {
    expect(memberSlugs.has(slug)).toBe(true)
  }
})

test('keeps the upcoming article as a draft outside the published list', () => {
  const draft = posts.find((post) => post.slug === 'why-a-shared-data-model')

  expect(draft).toMatchObject({ status: 'draft', authorSlug: sampleMember.slug })
  expect(members.some((member) => member.slug === sampleMember.slug)).toBe(false)
  expect(publishedPosts).not.toContain(draft)
})

test('formats date-only values in English and Persian', () => {
  expect(formatDate('2026-03-21', 'en')).toBe('March 21, 2026')
  expect(formatDate('2026-03-21', 'fa')).toBe('۱ فروردین ۱۴۰۵')
})

test('searches both titles and tags with case-insensitive, trimmed queries', () => {
  expect(filteredSlugs({ q: '  MOSAIC ' })).toEqual(['mosaic-portfolio'])
  expect(filteredSlugs({ q: 'شارد' })).toEqual(['shard-market'])
  expect(filteredSlugs({ q: 'ECOMMERCE' })).toEqual(['idempotency', 'shard-market'])
  expect(filteredSlugs({ tag: 'portfolio' })).toEqual(['mosaic-portfolio'])
  expect(filteredSlugs({ tag: 'java' })).toEqual(['civilization-vi'])
  expect(filteredSlugs({ tag: 'game-development' })).toEqual(['civilization-vi'])
  expect(filterProjects(projects, { q: ' ' })).toEqual(projects)
})

test('requires the query, member and tag filters to all match', () => {
  const filters = { q: 'shard', member: 'alireza', tag: 'ecommerce' }

  expect(filteredSlugs(filters)).toEqual(['shard-market'])
  expect(filteredSlugs({ ...filters, q: 'idempotency' })).toEqual([])
  expect(filteredSlugs({ ...filters, member: 'baran' })).toEqual([])
  expect(filteredSlugs({ ...filters, tag: 'portfolio' })).toEqual([])
})
