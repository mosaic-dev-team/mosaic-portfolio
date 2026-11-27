import { createMemoryHistory, createRouter, RouterProvider } from '@tanstack/react-router'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { LanguageContext } from './context/language'
import { ThemeContext } from './context/theme'
import { filterProjects, projects } from './data/projects'
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

test('reads shareable project filters and clears them from the URL', async () => {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/projects?q=mosaic&member=demo&tag=react'] }),
  })

  await router.load()

  const search = router.state.matches.at(-1)?.search
  expect(search).toEqual({ q: 'mosaic', member: 'demo', tag: 'react' })
  expect(filterProjects(projects, search ?? {})).toEqual(projects)

  expect(router.buildLocation({ to: '/projects', search: {} }).searchStr).toBe('')
})

test('normalizes numeric searches while ignoring repeated and blank filters', async () => {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/projects?q=123&member=a&member=b&tag='] }),
  })

  await router.load()

  expect(router.matchRoutes(router.state.location).at(-1)?.search).toEqual({ q: '123' })
})

test.each([
  ['/team/demo', {
    member: { slug: 'demo' },
    projects: [{ slug: 'mosaic-portfolio' }],
    posts: [{ slug: 'why-a-shared-data-model' }],
  }],
  ['/projects/mosaic-portfolio', {
    project: { slug: 'mosaic-portfolio' },
    makers: [{ slug: 'demo' }],
  }],
  ['/blog/why-a-shared-data-model', {
    post: { slug: 'why-a-shared-data-model' },
    author: { slug: 'demo' },
    otherPosts: [],
  }],
])('loads related records for %s', async (pathname, data) => {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [pathname] }),
  })

  await router.load()

  expect(router.state.matches.at(-1)?.loaderData).toMatchObject(data)
})

test.each(['/team/missing', '/projects/missing', '/blog/missing', '/missing'])('renders the root layout and a 404 for %s', async (pathname) => {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [pathname] }),
  })

  await router.load()

  const markup = renderToStaticMarkup(
    createElement(
      ThemeContext.Provider,
      { value: { theme: 'light', toggleTheme() {} } },
      createElement(
        LanguageContext.Provider,
        { value: { language: 'fa', setLanguage() {} } },
        createElement(RouterProvider, { router }),
      ),
    ),
  )

  expect(markup).toContain('<header')
  expect(markup).toContain('<h1>صفحه پیدا نشد</h1>')
  expect(markup).toContain('<footer')
})
