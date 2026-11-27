import { Link } from '@tanstack/react-router'
import logo from '../../assets/brand/mosaic-logo.svg'
import { useLanguage } from '../../context/language'
import { projects } from '../../data/projects'
import { MemberContacts } from '../ui/MemberContacts'
import styles from './Footer.module.css'
import { navigation } from './navigation'

const repositoryUrl = projects.find((project) => project.slug === 'mosaic-portfolio')?.repositoryUrl

const copy = {
  en: {
    invitation: "Let's build something together.",
    tagline: 'Different pieces. One vision.',
    explore: 'Explore',
    navigation: 'Footer navigation',
    connect: 'Connect',
    repository: 'MOSAIC Repository',
    attribution: 'Designed and built together.',
  },
  fa: {
    invitation: 'بیایید با هم چیزی بسازیم.',
    tagline: 'قطعه‌های متفاوت، یک چشم‌انداز مشترک.',
    explore: 'دسترسی سریع',
    navigation: 'ناوبری پانوشت',
    connect: 'ارتباط با ما',
    repository: 'مخزن موزاییک',
    attribution: 'طراحی و توسعه توسط تیم موزاییک.',
  },
}

export function Footer() {
  const { language } = useLanguage()
  const labels = copy[language]
  const year = new Intl.NumberFormat(language, { useGrouping: false }).format(
    new Date().getFullYear(),
  )

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.invitationRow}>
          <h2 className={styles.invitation}>{labels.invitation}</h2>
          <img src={logo} alt="" width="40" height="40" />
        </div>

        <div className={styles.columns}>
          <div>
            <bdi className={styles.wordmark} lang="en">MOSAIC</bdi>
            <p>{labels.tagline}</p>
          </div>

          <nav aria-label={labels.navigation}>
            <h2>{labels.explore}</h2>
            <ul>
              {navigation.map(({ to, ...name }) => (
                <li key={to}>
                  <Link to={to} activeOptions={{ exact: true, includeSearch: false }}>
                    {name[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2>{labels.connect}</h2>
            <MemberContacts />
            {repositoryUrl && <a className={styles.repository} href={repositoryUrl}>{labels.repository}</a>}
          </div>
        </div>

        <div className={styles.credits}>
          <small>© {year} <bdi lang="en">MOSAIC</bdi></small>
          <small>{labels.attribution}</small>
        </div>
      </div>
    </footer>
  )
}
