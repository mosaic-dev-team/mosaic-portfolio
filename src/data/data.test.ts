import { expect, test } from 'vitest'
import { formatDate } from './formatDate'
import { members } from './members'
import { posts } from './posts'
import { filterProjects, projects } from './projects'

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

test('searches both titles and tags with case-insensitive, trimmed queries', () => {
  expect(filterProjects(projects, { q: '  MOSAIC ' })).toEqual(projects)
  expect(filterProjects(projects, { q: 'موزاییک' })).toEqual(projects)
  expect(filterProjects(projects, { q: 'TYPESCRIPT' })).toEqual(projects)
  expect(filterProjects(projects, { q: ' ' })).toEqual(projects)
})

test('requires the query, member and tag filters to all match', () => {
  const filters = { q: 'mosaic', member: 'demo', tag: 'react' }

  expect(filterProjects(projects, filters)).toEqual(projects)
  expect(filterProjects(projects, { ...filters, q: 'missing' })).toEqual([])
  expect(filterProjects(projects, { ...filters, member: 'missing' })).toEqual([])
  expect(filterProjects(projects, { ...filters, tag: 'missing' })).toEqual([])
})
