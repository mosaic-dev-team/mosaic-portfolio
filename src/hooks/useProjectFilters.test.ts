import { createMemoryHistory, createRouter, RouterContextProvider } from '@tanstack/react-router'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { routeTree } from '../routeTree.gen'
import { useProjectFilters } from './useProjectFilters'

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

  await readFilters().onChange({ member: 'baran' })
  await readFilters().onChange({ tag: 'react' })
  expect(history.length).toBe(3)
  const beforeSearch = history.location.href

  await readFilters().onChange({ q: 'mosaic' })
  expect(history.length).toBe(4)
  expect(readFilters().filters).toEqual({ q: 'mosaic', member: 'baran', tag: 'react' })

  history.back()
  await router.load()
  expect(history.location.href).toBe(beforeSearch)
  expect(readFilters().filters).toEqual({ member: 'baran', tag: 'react' })

  history.forward()
  await router.load()
  expect(readFilters().filters).toEqual({ q: 'mosaic', member: 'baran', tag: 'react' })

  await readFilters().onClear()
  expect(history.location.href).toBe('/projects')
  expect(history.length).toBe(5)
  expect(readFilters().filters).toEqual({})

  history.back()
  await router.load()
  expect(readFilters().filters).toEqual({ q: 'mosaic', member: 'baran', tag: 'react' })
})
