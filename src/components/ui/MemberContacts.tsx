import { useLanguage } from '../../context/language'
import { members } from '../../data/members'
import styles from './MemberContacts.module.css'

const publicContacts = members.filter(({ contact }) =>
  contact?.email || contact?.githubUrl || contact?.linkedinUrl,
)

const copy = {
  en: { email: 'Email' },
  fa: { email: 'ایمیل' },
}

export function MemberContacts() {
  const { language } = useLanguage()
  const text = copy[language]

  return (
    <ul className={styles.groups} role="list">
      {publicContacts.map(({ slug, name, contact }) => (
        <li key={slug}>
          <strong><bdi>{name[language]}</bdi></strong>
          <ul className={styles.links} role="list">
            {contact?.email && (
              <li><a href={`mailto:${contact.email}`} aria-label={`${text.email} · ${name[language]}`}>{text.email}</a></li>
            )}
            {contact?.githubUrl && (
              <li><a href={contact.githubUrl} aria-label={`GitHub · ${name[language]}`}><bdi lang="en">GitHub</bdi></a></li>
            )}
            {contact?.linkedinUrl && (
              <li><a href={contact.linkedinUrl} aria-label={`LinkedIn · ${name[language]}`}><bdi lang="en">LinkedIn</bdi></a></li>
            )}
          </ul>
        </li>
      ))}
    </ul>
  )
}
