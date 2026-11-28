import { Link } from '@tanstack/react-router'
import { useLanguage } from '../../context/language'
import type { Member } from '../../data/types'
import { Card } from './Card'
import { TagList } from './TagList'
import styles from './MemberCard.module.css'

interface MemberCardProps {
  member: Member
  compact?: boolean
  headingLevel?: 2 | 3
  className?: string
}

const copy = {
  en: { resume: 'View Résumé' },
  fa: { resume: 'مشاهده رزومه' },
}

export function MemberCard({
  member, compact = false, headingLevel = 3, className,
}: MemberCardProps) {
  const { language } = useLanguage()
  const text = copy[language]
  const { slug, color, portrait } = member
  const name = member.name[language]
  const role = member.role[language]
  const description = !compact && member.bio[language]
  const skills = compact ? [] : member.skills.slice(0, 8)
  const contact = compact ? undefined : member.contact
  const NameHeading = headingLevel === 2 ? 'h2' : 'h3'

  return (
    <Card color={color} className={className ? `${styles.card} ${className}` : styles.card}>
      {portrait && <img className={styles.portrait} src={portrait.src} alt={portrait.alt[language]} />}
      <NameHeading className={styles.name}><bdi>{name}</bdi></NameHeading>
      {role && <p className={styles.role}>{role}</p>}
      {description && <p>{description}</p>}
      <TagList items={skills} />
      <div className={styles.actions}>
        <Link className={styles.resume} to="/team/$slug" params={{ slug }} aria-label={`${text.resume} · ${name}`}>
          {text.resume}
        </Link>
        {contact?.githubUrl && <a href={contact.githubUrl}><bdi lang="en">GitHub</bdi></a>}
        {contact?.linkedinUrl && <a href={contact.linkedinUrl}><bdi lang="en">LinkedIn</bdi></a>}
      </div>
    </Card>
  )
}
