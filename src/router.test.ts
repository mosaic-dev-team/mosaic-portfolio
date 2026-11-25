import { createMemoryHistory, createRouter } from '@tanstack/react-router'
import { expect, test } from 'vitest'
import { routeTree } from './routeTree.gen'

test('reads the member slug from /team/demo', async () => {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/team/demo'] }),
  })

  await router.load()

  const memberMatch = router.state.matches.find(
    (match) => match.routeId === '/team_/$slug',
  )

  expect(memberMatch?.params).toMatchObject({ slug: 'demo' })
})