import { createFileRoute } from '@tanstack/react-router'
import { PostCard } from '../../components/ui/PostCard'
import { Card } from '../../components/ui/Card'
import { useLanguage } from '../../context/language'
import { publishedPosts } from '../../lib/relations'
import { usePageTitle } from '../../hooks/usePageTitle'
import type { CardColor } from '../../data/types'
import styles from './BlogPage.module.css'

const placeholders: readonly CardColor[] = ['cream', 'magenta', 'orange', 'darkGreen']

const copy = {
  en: {
    pageTitle: 'Blog',
    eyebrow: 'THE MOSAIC JOURNAL',
    heading: 'Ideas, Lessons & Stories.',
    description: 'Thoughts, technical decisions, and lessons from our development journey.',
    article: 'Article',
    published: 'Published articles',
    comingSoon: 'Coming soon',
  },
  fa: {
    pageTitle: 'وبلاگ',
    eyebrow: 'مجله موزاییک',
    heading: 'ایده‌ها، آموخته‌ها و داستان‌ها',
    description: 'مجموعه‌ای از ایده‌ها، تصمیم‌های فنی و آموخته‌های ما در مسیر توسعه نرم‌افزار.',
    article: 'مقاله',
    published: 'مقاله‌های منتشرشده',
    comingSoon: 'به‌زودی',
  },
}

export const Route = createFileRoute('/blog/')({
  component: BlogPage,
})

function BlogPage() {
  const { language } = useLanguage()
  const text = copy[language]
  usePageTitle(text.pageTitle)

  return (
    <div className={styles.page}>
      <Card color="midnight" className={styles.hero}>
        <p className={styles.eyebrow}>{text.eyebrow}</p>
        <h1>{text.heading}</h1>
        <p>{text.description}</p>
      </Card>

      {publishedPosts.length > 0 ? (
        <section>
          <h2 className={styles.publishedTitle}>{text.published}</h2>
          <ul className={styles.grid} role="list">
            {publishedPosts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <ul className={styles.grid} role="list">
          {placeholders.map((color, index) => (
            <li key={color}>
              <Card color={color} className={styles.placeholder}>
                <span className={styles.document} aria-hidden="true" />
                <h2>{text.article} {(index + 1).toLocaleString(language)}</h2>
                <p>{text.comingSoon}</p>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
