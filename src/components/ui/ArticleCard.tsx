import { Link } from '@tanstack/react-router'
import { useLanguage } from '../../context/language'
import { formatDate } from '../../data/formatDate'
import { members } from '../../data/members'
import type { Post } from '../../data/types'
import { Card } from './Card'
import styles from './ArticleCard.module.css'

interface ArticleCardProps {
  post: Post
  showAuthor?: boolean
}

export function ArticleCard({ post, showAuthor = true }: ArticleCardProps) {
  const { language } = useLanguage()
  const { slug, cover } = post
  const author = showAuthor && members.find((member) => member.slug === post.authorSlug)

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
    </Card>
  )
}
