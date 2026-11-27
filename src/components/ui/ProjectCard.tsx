import { Link } from '@tanstack/react-router'
import { Card, type CardVariant } from './Card'
import styles from './ProjectCard.module.css'
import palettes from './ProjectPalette.module.css'

interface ProjectCardProps {
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  slug: string
  variant?: CardVariant
  tools?: readonly string[]
  linkLabel: string
  contributors?: string
}

export function ProjectCard({
  title, description, imageSrc, imageAlt, slug, variant, tools, linkLabel, contributors,
}: ProjectCardProps) {
  const palette = palettes[`project-${slug}`]

  return (
    <Card variant={variant} className={palette ? `${styles.card} ${palette}` : styles.card}>
      {imageSrc && <img className={styles.illustration} src={imageSrc} alt={imageAlt ?? ''} />}
      <h3 className={styles.title}>{title}</h3>
      <p>{description}</p>
      {!!tools?.length && (
        <ul className={styles.tools} role="list">
          {tools.map((tool) => <li key={tool}><bdi lang="en">{tool}</bdi></li>)}
        </ul>
      )}
      {contributors && <p className={styles.contributors}>{contributors}</p>}
      <Link
        to="/projects/$slug"
        params={{ slug }}
        className={styles.projectLink}
        aria-label={`${linkLabel} · ${title}`}
      >
        {linkLabel}
      </Link>
    </Card>
  )
}
