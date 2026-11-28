import { Link } from '@tanstack/react-router'
import { useLanguage } from '../../context/language'
import { formatDate } from '../../lib/formatDate'
import { getMember } from '../../lib/relations'
import type { Post } from '../../data/types'
import { Card } from './Card'
import styles from './PostCard.module.css'
import { TagList } from './TagList'

interface PostCardProps {
  post: Post
  showAuthor?: boolean
}

export function PostCard({ post, showAuthor = true }: PostCardProps) {
  const { language } = useLanguage()
  const { slug, cover } = post
  const author = showAuthor && getMember(post.authorSlug)

  return (
    <Card className={styles.card}>
      {cover && <img className={styles.cover} src={cover.src} alt={cover.alt[language]} />}
      <h3 className={styles.title}>
        <Link to="/blog/$slug" params={{ slug }}>{post.title[language]}</Link>
      </h3>
      <p className={styles.metadata}>
        {author && <bdi>{author.name[language]}</bdi>}
        <bdi>{formatDate(post.publishedAt, language)}</bdi>
      </p>
      <p>{post.summary[language]}</p>
      <TagList items={post.tags} compact />
    </Card>
  )
}
