import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Card } from '../../components/ui/Card'
import { useLanguage } from '../../context/language'
import { formatDate } from '../../data/formatDate'
import { members } from '../../data/members'
import { publishedPosts } from '../../data/posts'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './ArticleDetailsPage.module.css'

const copy = {
  en: { back: 'Back to Blog', resume: 'View Résumé', tags: 'Article tags' },
  fa: { back: 'بازگشت به وبلاگ', resume: 'مشاهده رزومه', tags: 'برچسب‌های مقاله' },
}

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params: { slug } }) => {
    const post = publishedPosts.find((entry) => entry.slug === slug)
    if (!post) throw notFound()

    const author = members.find((member) => member.slug === post.authorSlug)
    if (!author) throw new Error(`Unknown author: ${post.authorSlug}`)

    return { post, author, otherPosts: publishedPosts.filter((entry) => entry.slug !== slug) }
  },
  component: function ArticleDetailsPage() {
    const { post, author } = Route.useLoaderData()
    const { language } = useLanguage()
    usePageTitle(post.title[language])
    const text = copy[language]
    const paragraphs = post.body[language].trim().split(/\r?\n(?:[ \t]*\r?\n)+/)

    return (
      <div className={styles.page}>
        <Link to="/blog" className={styles.back}>{text.back}</Link>

        <article className={styles.article}>
          <Card variant="team-burgundy" className={styles.hero}>
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

            {post.tags.length > 0 && (
              <ul className={styles.tags} role="list" aria-label={text.tags}>
                {post.tags.map((tag) => <li key={tag}><bdi>{tag}</bdi></li>)}
              </ul>
            )}
          </Card>

          {post.cover && <img className={styles.cover} src={post.cover.src} alt={post.cover.alt[language]} />}

          <Card className={styles.reading}>
            <div className={styles.prose}>
              {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </Card>
        </article>
      </div>
    )
  },
})
