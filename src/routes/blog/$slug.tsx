import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Card } from '../../components/ui/Card'
import { PostCard } from '../../components/ui/PostCard'
import { TagList } from '../../components/ui/TagList'
import { useLanguage } from '../../context/language'
import { formatDate } from '../../lib/formatDate'
import { getMember, publishedPosts } from '../../lib/relations'
import { usePageTitle } from '../../hooks/usePageTitle'
import sharedStyles from '../../styles/shared.module.css'
import styles from './PostDetailsPage.module.css'

const copy = {
  en: { back: 'Back to Blog', resume: 'View Résumé', tags: 'Article tags', related: 'Other posts' },
  fa: { back: 'بازگشت به وبلاگ', resume: 'مشاهده رزومه', tags: 'برچسب‌های مقاله', related: 'نوشته‌های دیگر' },
}

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params: { slug } }) => {
    const post = publishedPosts.find((entry) => entry.slug === slug)
    if (!post) throw notFound()

    const author = getMember(post.authorSlug)
    if (!author) throw new Error(`Unknown author: ${post.authorSlug}`)

    return { post, author, otherPosts: publishedPosts.filter((entry) => entry.slug !== slug) }
  },
  component: PostDetailsPage,
})

function PostDetailsPage() {
  const { post, author, otherPosts } = Route.useLoaderData()
  const { language } = useLanguage()
  usePageTitle(post.title[language])
  const text = copy[language]
  const paragraphs = post.body[language].trim().split(/\r?\n(?:[ \t]*\r?\n)+/)

  return (
    <div className={`${sharedStyles.page} ${styles.page}`}>
      <Link to="/blog" className={styles.back}>{text.back}</Link>

      <article className={styles.article}>
        <Card color="berry" className={styles.hero}>
          <h1>{post.title[language]}</h1>
          <p className={styles.summary}>{post.summary[language]}</p>

          <div className={styles.meta}>
            <div className={styles.author}>
              {author.portrait && (
                <img src={author.portrait.src} alt={author.portrait.alt[language]} />
              )}
              <div>
                <p className={styles.authorName}><bdi>{author.name[language]}</bdi></p>
                <p>{author.role[language]}</p>
                <Link to="/team/$slug" params={{ slug: author.slug }} aria-label={`${text.resume} · ${author.name[language]}`}>
                  {text.resume}
                </Link>
              </div>
            </div>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, language)}</time>
          </div>

          <TagList items={post.tags} label={text.tags} />
        </Card>

        {post.cover && <img className={styles.cover} src={post.cover.src} alt={post.cover.alt[language]} />}

        <Card className={styles.reading}>
          <div className={styles.prose}>
            {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </Card>
      </article>

      {otherPosts.length > 0 && (
        <section aria-labelledby="other-posts">
          <h2 id="other-posts">{text.related}</h2>
          <ul className={styles.related} role="list">
            {otherPosts.map((entry) => <li key={entry.slug}><PostCard post={entry} /></li>)}
          </ul>
        </section>
      )}
    </div>
  )
}
