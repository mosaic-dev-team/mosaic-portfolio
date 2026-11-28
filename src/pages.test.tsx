import { createMemoryHistory, createRouter, RouterProvider } from '@tanstack/react-router'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, test } from 'vitest'
import { LanguageContext } from './context/language'
import { ThemeContext } from './context/theme'
import { sampleMember } from './data/fixtures'
import { members } from './data/members'
import { publishedPosts } from './lib/relations'
import { projects } from './data/projects'
import type { Post, ProjectFilters } from './data/types'
import { routeTree } from './routeTree.gen'

async function renderRoute(pathname: string, projectFilters?: ProjectFilters) {
  const history = createMemoryHistory({ initialEntries: [pathname] })
  if (projectFilters) history.replace(pathname, { projectFilters })

  const router = createRouter({
    routeTree,
    history,
  })

  await router.load()

  return renderToStaticMarkup(
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme() {} }}>
      <LanguageContext.Provider value={{ language: 'fa', setLanguage() {} }}>
        <RouterProvider router={router} />
      </LanguageContext.Provider>
    </ThemeContext.Provider>,
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

test('returns from project details to the originating filters or to the unfiltered list', async () => {
  const pathname = '/projects/shard-market'
  const filters = { q: 'shard', member: 'alireza', tag: 'ecommerce' }
  const fromListing = await renderRoute(pathname, filters)
  const direct = await renderRoute(pathname)

  const returnQuery = fromListing.match(/href="\/projects\?([^"]+)"[^>]*>بازگشت به پروژه‌ها<\/a>/)?.[1]
  const params = new URLSearchParams(returnQuery?.replaceAll('&amp;', '&'))
  const actualFilters: Record<string, string> = {}
  params.forEach((value, key) => {
    actualFilters[key] = value
  })

  expect(actualFilters).toEqual(filters)
  expect(direct).toMatch(/href="\/projects"[^>]*>بازگشت به پروژه‌ها<\/a>/)
})

test('links Homepage and Footer content to the shared public profiles and projects', async () => {
  const markup = await renderRoute('/')
  const main = markup.match(/<main\b[\s\S]*?<\/main>/)?.[0]
  const footer = markup.match(/<footer\b[\s\S]*?<\/footer>/)?.[0]

  for (const { slug, name, contact } of members) {
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

test('shows tags in the blog list and links only to other published posts in details', async () => {
  const first: Post = {
    status: 'published',
    slug: 'test-first-post',
    title: { en: 'First post', fa: 'نوشته اول' },
    summary: { en: 'Summary', fa: 'خلاصه' },
    body: { en: 'Text', fa: 'متن' },
    authorSlug: 'baran',
    publishedAt: '2026-11-27',
    tags: ['typescript'],
  }
  const second: Post = { ...first, slug: 'test-second-post', title: { en: 'Second post', fa: 'نوشته دوم' } }
  const originalLength = publishedPosts.length
  publishedPosts.push(first, second)

  try {
    const list = await renderRoute('/blog')
    expect(list).toContain('<bdi lang="en">typescript</bdi>')

    const details = await renderRoute(`/blog/${first.slug}`)
    const related = details.match(/<section aria-labelledby="other-posts"[\s\S]*?<\/section>/)?.[0]
    expect(related).toContain(`href="/blog/${second.slug}"`)
    expect(related).not.toContain(`href="/blog/${first.slug}"`)
    expect(related).not.toContain('why-a-shared-data-model')
  } finally {
    publishedPosts.splice(originalLength)
  }
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

test.each([
  '/team/missing', '/projects/missing', '/blog/missing', '/missing-page',
  `/team/${sampleMember.slug}`, '/blog/why-a-shared-data-model',
])('renders the root layout and a 404 for %s', async (pathname) => {
  const markup = await renderRoute(pathname)
  const main = markup.match(/<main\b[\s\S]*?<\/main>/)?.[0]

  expect(markup).toContain('<header')
  expect(main).toMatch(/<h1>.*۴۰۴: صفحه پیدا نشد\. .*یک قطعه گمشده\.<\/h1>/)
  expect(main).toMatch(/<img[^>]*light-404[^>]*alt=""/)
  expect(main).toMatch(/href="\/"[^>]*>بازگشت به خانه<\/a>/)
  expect(main).toMatch(/href="\/projects"[^>]*>مشاهده پروژه‌ها<\/a>/)
  expect(markup).toContain('<footer')
})
