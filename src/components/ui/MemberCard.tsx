import { Link } from '@tanstack/react-router'
import { useLanguage } from '../../context/language'
import { Card, type CardVariant } from './Card'
import styles from './MemberCard.module.css'

interface MemberCardProps {
  name: string
  role: string
  description?: string
  portraitSrc?: string
  portraitAlt?: string
  skills?: readonly string[]
  githubUrl?: string
  linkedinUrl?: string
  headingLevel?: 2 | 3
  slug: string
  variant?: CardVariant
}

export function MemberCard({
  name, role, description, portraitSrc, portraitAlt, skills,
  githubUrl, linkedinUrl, headingLevel = 3, slug, variant,
}: MemberCardProps) {
  const { language } = useLanguage()
  const resumeLabel = language === 'fa' ? 'دیدن رزومه' : 'View Résumé'
  const NameHeading = headingLevel === 2 ? 'h2' : 'h3'

  return (
    <Card variant={variant} className={styles.card}>
      {portraitSrc && <img className={styles.portrait} src={portraitSrc} alt={portraitAlt ?? name} />}
      <NameHeading className={styles.name}><bdi>{name}</bdi></NameHeading>
      {role && <p className={styles.role}>{role}</p>}
      {description && <p>{description}</p>}
      {!!skills?.length && (
        <ul className={styles.skills} role="list">
          {skills.map((skill) => <li key={skill}><bdi lang="en">{skill}</bdi></li>)}
        </ul>
      )}
      <div className={styles.actions}>
        <Link className={styles.resume} to="/team/$slug" params={{ slug }} aria-label={`${resumeLabel} · ${name}`}>
          {resumeLabel}
        </Link>
        {githubUrl && <a href={githubUrl}><bdi lang="en">GitHub</bdi></a>}
        {linkedinUrl && <a href={linkedinUrl}><bdi lang="en">LinkedIn</bdi></a>}
      </div>
    </Card>
  )
}
