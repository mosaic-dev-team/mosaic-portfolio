import { Link } from '@tanstack/react-router'
import { useLanguage } from '../../context/language'
import { Card, type CardVariant } from './Card'
import styles from './MemberCard.module.css'

interface MemberCardProps {
  name: string
  role: string
  description: string
  portraitSrc: string
  slug: string
  variant?: CardVariant
}

export function MemberCard({ name, role, description, portraitSrc, slug, variant }: MemberCardProps) {
  const { language } = useLanguage()
  const resumeLabel = language === 'fa' ? 'دیدن رزومه' : 'View résumé'

  return (
    <Card variant={variant} className={styles.card}>
      <img className={styles.portrait} src={portraitSrc} alt={name} />
      <h3 className={styles.name}><bdi>{name}</bdi></h3>
      <p className={styles.role}>{role}</p>
      <p>{description}</p>
      <p>
        <Link to="/team/$slug" params={{ slug }} aria-label={`${resumeLabel} · ${name}`}>
          {resumeLabel}
        </Link>
      </p>
    </Card>
  )
}
