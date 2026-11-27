import {
  createMemoryHistory,
  createRouter,
  RouterContextProvider,
  RouterProvider,
} from '@tanstack/react-router'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { LanguageContext } from './context/language'
import { ThemeContext } from './context/theme'
import { filterProjects, projects } from './data/projects'
import { useProjectFilters } from './hooks/useProjectFilters'
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

test('reads shareable project filters from the URL', async () => {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/projects?q=mosaic&member=demo&tag=react'] }),
  })

  await router.load()

  const search = router.state.matches.at(-1)?.search
  expect(search).toEqual({ q: 'mosaic', member: 'demo', tag: 'react' })
  expect(filterProjects(projects, search ?? {})).toEqual(projects)
})

function createProjectSearchRouter() {
  const history = createMemoryHistory({ initialEntries: ['/projects'] })
  const router = createRouter({ routeTree, history, isServer: false, origin: 'http://localhost' })

  function readFilters() {
    let filters: ReturnType<typeof useProjectFilters> | undefined

    function ReadFilters() {
      filters = useProjectFilters()
      return null
    }

    renderToStaticMarkup(
      createElement(RouterContextProvider, { router, children: createElement(ReadFilters) }),
    )
    if (!filters) throw new Error('Project filters did not render')
    return filters
  }

  return { history, router, readFilters }
}

test('pushes the first non-blank query and replaces subsequent edits', async () => {
  const { history, router, readFilters } = createProjectSearchRouter()
  await router.load()

  await readFilters().onChange({ q: '   ' })
  expect(history.location.href).toBe('/projects')
  expect(history.length).toBe(1)

  await readFilters().onChange({ q: 'm' })
  expect(history.length).toBe(2)
  await readFilters().onChange({ q: 'mosaic' })
  expect(history.length).toBe(2)
  expect(readFilters().filters.q).toBe('mosaic')

  history.back()
  await router.load()
  expect(history.location.href).toBe('/projects')
  expect(readFilters().filters.q).toBeUndefined()

  history.forward()
  await router.load()
  expect(readFilters().filters.q).toBe('mosaic')

  await readFilters().onChange({ q: '' })
  expect(history.location.href).toBe('/projects')
  expect(history.length).toBe(2)
})

test('preserves member and tag history when searching and clearing filters', async () => {
  const { history, router, readFilters } = createProjectSearchRouter()
  await router.load()

  await readFilters().onChange({ member: 'demo' })
  await readFilters().onChange({ tag: 'react' })
  expect(history.length).toBe(3)
  const beforeSearch = history.location.href

  await readFilters().onChange({ q: 'mosaic' })
  expect(history.length).toBe(4)
  expect(readFilters().filters).toEqual({ q: 'mosaic', member: 'demo', tag: 'react' })

  history.back()
  await router.load()
  expect(history.location.href).toBe(beforeSearch)
  expect(readFilters().filters).toEqual({ member: 'demo', tag: 'react' })

  history.forward()
  await router.load()
  expect(readFilters().filters).toEqual({ q: 'mosaic', member: 'demo', tag: 'react' })

  await readFilters().onClear()
  expect(history.location.href).toBe('/projects')
  expect(history.length).toBe(5)
  expect(readFilters().filters).toEqual({})

  history.back()
  await router.load()
  expect(readFilters().filters).toEqual({ q: 'mosaic', member: 'demo', tag: 'react' })
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
