import { Link } from '@tanstack/react-router'
import { useLanguage } from '../../context/language'
import { membersOf } from '../../lib/relations'
import type { Project, ProjectFilters } from '../../data/types'
import { Card } from './Card'
import { TagList } from './TagList'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  compact?: boolean
  showContributors?: boolean
  returnFilters?: ProjectFilters
}

const copy = {
  en: { view: 'View Project', contributors: 'Contributors' },
  fa: { view: 'مشاهده پروژه', contributors: 'مشارکت‌کنندگان' },
}

export function ProjectCard({
  project, compact = false, showContributors = false, returnFilters,
}: ProjectCardProps) {
  const { language } = useLanguage()
  const text = copy[language]
  const { slug, image, tools, color } = project
  const title = project.title[language]
  const contributorNames = showContributors
    ? membersOf(project).map((member) => member.name[language])
    : []

  return (
    <Card color={color} className={styles.card}>
      {image && <img className={styles.illustration} src={image.src} alt={image.alt[language]} />}
      <h3 className={styles.title}>{title}</h3>
      <p>{project.summary[language]}</p>
      {!compact && <TagList items={tools} compact />}
      {contributorNames.length > 0 && (
        <p className={styles.contributors}>
          {text.contributors}: {new Intl.ListFormat(language === 'fa' ? 'fa-IR' : 'en').format(contributorNames)}
        </p>
      )}
      <Link
        to="/projects/$slug"
        params={{ slug }}
        state={returnFilters && { projectFilters: returnFilters }}
        className={styles.projectLink}
        aria-label={`${text.view} · ${title}`}
      >
        {text.view}
      </Link>
    </Card>
  )
}
