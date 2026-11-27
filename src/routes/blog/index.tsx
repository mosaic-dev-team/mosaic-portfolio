import { createFileRoute } from '@tanstack/react-router'
import { ArticleCard } from '../../components/ui/ArticleCard'
import { Card, type CardProps } from '../../components/ui/Card'
import palettes from '../../components/ui/ProjectPalette.module.css'
import { useLanguage } from '../../context/language'
import { formatDate } from '../../data/formatDate'
import { members } from '../../data/members'
import { posts } from '../../data/posts'
import styles from './BlogPage.module.css'

const publishedPosts = posts.filter((post) => post.authorSlug !== 'demo')

const placeholders: readonly Pick<CardProps, 'className' | 'variant'>[] = [
  { className: styles.buttermilk },
  { className: palettes.magenta },
  { className: palettes.orange },
  { variant: 'team-forest' },
]

const copy = {
  en: {
    eyebrow: 'THE MOSAIC JOURNAL',
    heading: 'Ideas, Lessons & Stories.',
    description: 'Thoughts, technical decisions, and lessons from our development journey.',
    article: 'Article',
    published: 'Published articles',
    comingSoon: 'Coming soon',
  },
  fa: {
    eyebrow: 'مجله موزاییک',
    heading: 'ایده‌ها، آموخته‌ها و داستان‌ها',
    description: 'مجموعه‌ای از ایده‌ها، تصمیم‌های فنی و آموخته‌های ما در مسیر توسعه نرم‌افزار.',
    article: 'مقاله',
    published: 'مقاله‌های منتشرشده',
    comingSoon: 'به‌زودی',
  },
}

export const Route = createFileRoute('/blog/')({
  component: function BlogPage() {
    const { language } = useLanguage()
    const text = copy[language]

    return (
      <div className={styles.page}>
        <Card variant="midnight" className={styles.hero}>
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
                  <ArticleCard
                    slug={post.slug}
                    title={post.title[language]}
                    summary={post.summary[language]}
                    cover={post.cover && { src: post.cover.src, alt: post.cover.alt[language] }}
                    author={members.find((member) => member.slug === post.authorSlug)?.name[language]}
                    publishedOn={formatDate(post.publishedAt, language)}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <ul className={styles.grid} role="list">
            {placeholders.map(({ className, variant }, index) => (
              <li key={index}>
                <Card variant={variant} className={className ? `${styles.placeholder} ${className}` : styles.placeholder}>
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
  },
})
