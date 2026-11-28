import { createMemoryHistory, createRouter } from '@tanstack/react-router'
import { expect, test } from 'vitest'
import { filterProjects } from './lib/projectFilters'
import { projects } from './data/projects'
import { routeTree } from './routeTree.gen'

test.each([
  { pathname: '/team/baran', routeId: '/team/$slug', params: { slug: 'baran' } },
  {
    pathname: '/projects/mosaic-portfolio',
    routeId: '/projects/$slug',
    params: { slug: 'mosaic-portfolio' },
  },
  {
    pathname: '/blog/why-a-shared-data-model',
    routeId: '/blog/$slug',
    params: { slug: 'why-a-shared-data-model' },
  },
  { pathname: '/team', routeId: '/team/', params: {} },
  { pathname: '/projects', routeId: '/projects/', params: {} },
  { pathname: '/blog', routeId: '/blog/', params: {} },
])('matches $pathname', async ({ pathname, routeId, params }) => {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [pathname] }),
  })

  await router.load()

  const match = router.state.matches.at(-1)
  expect(match?.routeId).toBe(routeId)
  expect(match?.params).toEqual(params)
})

test.each([
  ['/team/alireza', {
    member: { slug: 'alireza' },
    projects: [{ slug: 'shard-market' }, { slug: 'mosaic-portfolio' }],
    posts: [],
  }],
  ['/projects/mosaic-portfolio', {
    project: { slug: 'mosaic-portfolio' },
    makers: [{ slug: 'baran' }, { slug: 'alireza' }],
  }],
])('loads related records for %s', async (pathname, data) => {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [pathname] }),
  })

  await router.load()

  expect(router.state.matches.at(-1)?.loaderData).toMatchObject(data)
})

test('reads shareable project filters from the URL', async () => {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/projects?q=mosaic&member=baran&tag=react'] }),
  })

  await router.load()

  const search = router.state.matches.at(-1)?.search
  expect(search).toEqual({ q: 'mosaic', member: 'baran', tag: 'react' })
  expect(filterProjects(projects, search ?? {}).map((project) => project.slug)).toEqual(['mosaic-portfolio'])
})

test('normalizes numeric searches while ignoring repeated and blank filters', async () => {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/projects?q=123&member=a&member=b&tag='] }),
  })

  await router.load()

  expect(router.matchRoutes(router.state.location).at(-1)?.search).toEqual({ q: '123' })
})
