import { Link } from '@tanstack/react-router'
import { Card, type CardVariant } from './Card'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  slug: string
  variant?: CardVariant
  tags?: readonly string[]
}

export function ProjectCard({ title, description, imageSrc, imageAlt, slug, variant, tags }: ProjectCardProps) {
  return (
    <Card variant={variant} className={styles.card}>
      <img className={styles.illustration} src={imageSrc} alt={imageAlt} />
      <h3 className={styles.title}>
        <Link to="/projects/$slug" params={{ slug }}>{title}</Link>
      </h3>
      <p>{description}</p>
      {!!tags?.length && (
        <ul className={styles.tags} role="list">
          {tags.map((tag) => <li key={tag}><bdi>{tag}</bdi></li>)}
        </ul>
      )}
    </Card>
  )
}
