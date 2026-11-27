import { expect, test } from 'vitest'
import { formatDate } from './formatDate'
import { members } from './members'
import { posts } from './posts'
import { filterProjects, projects } from './projects'
import type { ProjectFilters } from './types'

function filteredSlugs(filters: ProjectFilters) {
  return filterProjects(projects, filters).map((project) => project.slug)
}

test('project contributors and post authors resolve to members', () => {
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

test('searches both titles and tags with case-insensitive, trimmed queries', () => {
  expect(filteredSlugs({ q: '  MOSAIC ' })).toEqual(['mosaic-portfolio'])
  expect(filteredSlugs({ q: 'شارد' })).toEqual(['shard-market'])
  expect(filteredSlugs({ q: 'ECOMMERCE' })).toEqual(['idempotency', 'shard-market'])
  expect(filteredSlugs({ tag: 'portfolio' })).toEqual(['mosaic-portfolio'])
  expect(filterProjects(projects, { q: ' ' })).toEqual(projects)
})

test('requires the query, member and tag filters to all match', () => {
  const filters = { q: 'shard', member: 'alireza', tag: 'ecommerce' }

  expect(filteredSlugs(filters)).toEqual(['shard-market'])
  expect(filteredSlugs({ ...filters, q: 'idempotency' })).toEqual([])
  expect(filteredSlugs({ ...filters, member: 'baran' })).toEqual([])
  expect(filteredSlugs({ ...filters, tag: 'portfolio' })).toEqual([])
})
