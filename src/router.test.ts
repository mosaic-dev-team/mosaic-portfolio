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
import { members } from './data/members'
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
    history: createMemoryHistory({ initialEntries: ['/projects?q=mosaic&member=baran&tag=react'] }),
  })

  await router.load()

  const search = router.state.matches.at(-1)?.search
  expect(search).toEqual({ q: 'mosaic', member: 'baran', tag: 'react' })
  expect(filterProjects(projects, search ?? {}).map((project) => project.slug)).toEqual(['mosaic-portfolio'])
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
    projects: [],
    posts: [{ slug: 'why-a-shared-data-model' }],
  }],
  ['/projects/mosaic-portfolio', {
    project: { slug: 'mosaic-portfolio' },
    makers: [{ slug: 'baran' }, { slug: 'alireza' }],
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

async function renderRoute(pathname: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [pathname] }),
  })

  await router.load()

  return renderToStaticMarkup(
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
}

test('renders URL filters and the matching project in the public listing', async () => {
  const markup = await renderRoute('/projects?q=shard&member=alireza&tag=ecommerce')

  expect(markup).toContain('type="search" value="shard"')
  expect(markup).toContain('<option value="alireza" selected="">علیرضا عربشاهی</option>')
  expect(markup).not.toContain('value="demo"')
  expect(markup).toContain('href="/projects/shard-market"')
  expect(markup).not.toContain('href="/projects/mosaic-portfolio"')
})

test('links Homepage and Footer content to the shared public profiles and projects', async () => {
  const markup = await renderRoute('/')
  const main = markup.match(/<main\b[\s\S]*?<\/main>/)?.[0]
  const footer = markup.match(/<footer\b[\s\S]*?<\/footer>/)?.[0]

  for (const { slug, name, contact } of members.filter((member) => member.slug !== 'demo')) {
    expect(main).toContain(`href="/team/${slug}"`)
    expect(main).toContain(name.fa)
    expect(footer).toContain(name.fa)
    for (const href of [contact?.email && `mailto:${contact.email}`, contact?.githubUrl, contact?.linkedinUrl]) {
      if (href) {
        expect(main).toContain(`href="${href}"`)
        expect(footer).toContain(`href="${href}"`)
      }
    }
  }

  expect(main).toContain('href="/projects/idempotency"')
  expect(main).toContain('href="/projects/shard-market"')
  expect(main).toContain('href="/projects/mosaic-portfolio"')
  expect(main).not.toContain('href="/projects/civilization-vi"')
  const repository = projects.find((project) => project.slug === 'mosaic-portfolio')?.repositoryUrl
  expect(repository).toBeDefined()
  expect(footer).toContain(`href="${repository}"`)
  expect(main).not.toContain('href="/blog/why-a-shared-data-model"')
  expect(markup).not.toContain('sara@example.com')
})

test('shows four coming-soon cards without publishing the sample article', async () => {
  const markup = await renderRoute('/blog')

  for (const number of ['۱', '۲', '۳', '۴']) {
    expect(markup).toContain(`<h2>مقاله ${number}</h2>`)
  }
  expect(markup.match(/>به‌زودی<\/p>/g)).toHaveLength(4)
  expect(markup).not.toContain('href="/blog/')
  expect(markup).not.toContain('چرا از مدل دادهٔ مشترک استفاده می‌کنیم؟')
})

test('renders the sample article, date and author link without an absent cover', async () => {
  const markup = await renderRoute('/blog/why-a-shared-data-model')
  const article = markup.match(/<article\b[\s\S]*?<\/article>/)?.[0]

  expect(article).toContain('<h1>چرا از مدل دادهٔ مشترک استفاده می‌کنیم؟</h1>')
  expect(article).toMatch(/<time datetime="2026-11-27">/i)
  expect(article).toContain('href="/team/demo"')
  expect(article).toContain('data-modeling')
  expect(article).toContain('هر پروژه اعضای سازنده را با شناسهٔ آن‌ها معرفی می‌کند.')
  expect(article).not.toContain('<img')
})

test.each([
  {
    slug: 'idempotency',
    title: 'ایدمپوتنسی — تازه‌خانه',
    makers: ['baran'],
    live: 'https://shop.baranbuilds.com/',
    source: 'https://github.com/Baran-06/idempotency-shop',
  },
  {
    slug: 'shard-market',
    title: 'شارد مارکت',
    makers: ['alireza'],
    live: 'https://shardmarket.ir/',
    source: 'https://github.com/AlirezaArabshahi/sharding-shop',
  },
  {
    slug: 'mosaic-portfolio',
    title: 'موزاییک',
    makers: ['baran', 'alireza'],
    live: undefined,
    source: 'https://github.com/mosaic-dev-team/mosaic-portfolio',
  },
  {
    slug: 'civilization-vi',
    title: 'Civilization VI — بازی استراتژیک چندنفره',
    makers: ['baran'],
    live: undefined,
    source: 'https://github.com/Baran-06/civilization-vi-simulation',
  },
])('renders the project details and available links for $slug', async ({ slug, title, makers, live, source }) => {
  const markup = await renderRoute(`/projects/${slug}`)

  expect(markup).toContain(`<h1>${title}</h1>`)
  expect(markup).toContain('<h2>فناوری‌ها و ابزارها</h2>')
  expect(markup).toContain('<h2>سازندگان پروژه</h2>')
  const resumeLinks = Array.from(markup.matchAll(/href="\/team\/([^"]+)"/g), (match) => match[1])
  expect(resumeLinks).toEqual(makers)

  if (live) expect(markup).toContain(`href="${live}">مشاهده سایت</a>`)
  else expect(markup).not.toContain('مشاهده سایت')

  expect(markup).toContain(`href="${source}">کد منبع</a>`)
})

test.each([
  ['/team/baran', 'باران شیخ ستانی', 'BaranSheikhestaniResume.pdf', 'طراحی و تألیف تمرین‌های برنامه‌نویسی جاوا.', ['idempotency', 'mosaic-portfolio', 'civilization-vi']],
  ['/team/alireza', 'علیرضا عربشاهی', 'AlirezaArabshahiResume.pdf', 'ASP.NET Core', ['shard-market', 'mosaic-portfolio']],
])('renders the shared résumé for %s', async (pathname, name, pdf, detail, expectedProjects) => {
  const markup = await renderRoute(pathname)

  expect(markup).toContain(`<h1>${name}</h1>`)
  expect(markup).toContain(`/resumes/${pdf}`)
  expect(markup).toContain('download=""')
  expect(markup).toContain(detail)
  const projectLinks = Array.from(markup.matchAll(/href="\/projects\/([^"]+)"/g), (match) => match[1])
  expect(projectLinks).toEqual(expectedProjects)
  expect(markup).toContain('مشاهده پروژه')
  expect(markup).not.toContain('هنوز پروژه‌ای ثبت نشده است.')
  expect(markup).toContain('هنوز مقاله‌ای ثبت نشده است.')
})

test('renders associated work and omits unavailable résumé fields', async () => {
  const markup = await renderRoute('/team/demo')

  expect(markup).toContain('هنوز پروژه‌ای ثبت نشده است.')
  expect(markup).toContain('href="/blog/why-a-shared-data-model"')
  expect(markup).not.toContain('download=""')
  expect(markup).not.toContain('زبان‌ها و مدارک')
})

test.each(['/team/missing', '/projects/missing', '/blog/missing', '/missing-page'])('renders the root layout and a 404 for %s', async (pathname) => {
  const markup = await renderRoute(pathname)
  const main = markup.match(/<main\b[\s\S]*?<\/main>/)?.[0]

  expect(markup).toContain('<header')
  expect(main).toMatch(/<h1>.*۴۰۴: صفحه پیدا نشد\. .*یک قطعه گمشده\.<\/h1>/)
  expect(main).toMatch(/<img[^>]*light-404[^>]*alt=""/)
  expect(main).toMatch(/href="\/"[^>]*>بازگشت به خانه<\/a>/)
  expect(main).toMatch(/href="\/projects"[^>]*>مشاهده پروژه‌ها<\/a>/)
  expect(markup).toContain('<footer')
})
