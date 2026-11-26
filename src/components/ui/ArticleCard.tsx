import { Link } from '@tanstack/react-router'
import { Card } from './Card'
import styles from './ArticleCard.module.css'

interface ArticleCardProps {
  title: string
  summary: string
  slug: string
  cover?: { src: string; alt: string }
  author?: string
  publishedOn?: string
  readingTime?: string
}

export function ArticleCard({ title, summary, slug, cover, author, publishedOn, readingTime }: ArticleCardProps) {
  return (
    <Card className={styles.card}>
      {cover && <img className={styles.cover} src={cover.src} alt={cover.alt} />}
      <h3 className={styles.title}>
        <Link to="/blog/$slug" params={{ slug }}>{title}</Link>
      </h3>
      {(author || publishedOn || readingTime) && (
        <p className={styles.metadata}>
          {author && <bdi>{author}</bdi>}
          {publishedOn && <bdi>{publishedOn}</bdi>}
          {readingTime && <bdi>{readingTime}</bdi>}
        </p>
      )}
      <p>{summary}</p>
    </Card>
  )
}
