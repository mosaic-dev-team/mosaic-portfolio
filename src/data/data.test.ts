import { expect, test } from 'vitest'
import { sampleMember } from './fixtures'
import { members } from './members'
import { posts } from './posts'
import { projects } from './projects'

test('project contributors and post authors resolve to members', () => {
  expect(members.length).toBeGreaterThan(0)
  expect(projects.length).toBeGreaterThan(0)

  const memberSlugs = new Set(members.map((member) => member.slug))
  const contributorSlugs = projects.flatMap((project) => project.memberSlugs)
  const authorSlugs = posts.filter((post) => post.status === 'published').map((post) => post.authorSlug)

  for (const slug of [...contributorSlugs, ...authorSlugs]) {
    expect(memberSlugs.has(slug)).toBe(true)
  }
})

test('keeps the upcoming article as a draft with its sample author', () => {
  const draft = posts.find((post) => post.slug === 'why-a-shared-data-model')

  expect(draft).toMatchObject({ status: 'draft', authorSlug: sampleMember.slug })
  expect(members.some((member) => member.slug === sampleMember.slug)).toBe(false)
})

test.each([
  ['members', members],
  ['projects', projects],
  ['posts', posts],
])('uses unique kebab-case slugs for %s', (_label, records) => {
  const slugs = records.map((record) => record.slug)

  expect(new Set(slugs).size).toBe(slugs.length)
  for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
})

test('provides Persian and English names and titles', () => {
  const labels = [
    ...members.map((member) => member.name),
    ...projects.map((project) => project.title),
    ...posts.map((post) => post.title),
  ]

  for (const label of labels) {
    expect(label.fa.trim()).not.toBe('')
    expect(label.en.trim()).not.toBe('')
  }
})
