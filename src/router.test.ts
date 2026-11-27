import { createMemoryHistory, createRouter } from '@tanstack/react-router'
import { expect, test } from 'vitest'
import { routeTree } from './routeTree.gen'

test.each([
  { pathname: '/team/demo', routeId: '/team/$slug', params: { slug: 'demo' } },
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
