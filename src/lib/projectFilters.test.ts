import { expect, test } from 'vitest'
import { projects } from '../data/projects'
import type { ProjectFilters } from '../data/types'
import { filterProjects } from './projectFilters'

function filteredSlugs(filters: ProjectFilters) {
  return filterProjects(projects, filters).map((project) => project.slug)
}

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
