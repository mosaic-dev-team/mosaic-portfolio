import { createFileRoute, Link } from '@tanstack/react-router'
import { Card } from '../../components/ui/Card'
import { MemberCard } from '../../components/ui/MemberCard'
import { useLanguage } from '../../context/language'
import { members } from '../../data/members'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './TeamPage.module.css'

const copy = {
  en: {
    pageTitle: 'Team',
    eyebrow: 'THE PEOPLE BEHIND MOSAIC',
    heading: 'Meet the makers.',
    description: 'Two perspectives. Different strengths. One shared vision.',
    philosophy: 'Different pieces. One vision.',
    philosophyDescription: 'A shared passion for building, learning, and creating meaningful digital experiences.',
    projectLink: 'Explore MOSAIC',
  },
  fa: {
    pageTitle: 'اعضای تیم',
    eyebrow: 'اعضای موزاییک',
    heading: 'با سازندگان موزاییک آشنا شوید.',
    description: 'دو نگاه متفاوت، توانایی‌های متفاوت، یک هدف مشترک.',
    philosophy: 'قطعات متفاوت، یک چشم‌انداز.',
    philosophyDescription: 'علاقه‌ای مشترک به ساختن، یادگیری و خلق تجربه‌های دیجیتال معنادار.',
    projectLink: 'مشاهده پروژه موزاییک',
  },
}

export const Route = createFileRoute('/team/')({
  component: TeamPage,
})

function TeamPage() {
  const { language } = useLanguage()
  const text = copy[language]
  usePageTitle(text.pageTitle)

  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{text.eyebrow}</p>
        <h1>{text.heading}</h1>
        <p>{text.description}</p>
      </div>

      <div className={styles.members}>
        {members.map((member) => (
          <MemberCard
            key={member.slug}
            member={member}
            headingLevel={2}
          />
        ))}
      </div>

      <Card variant="orange" className={styles.philosophy}>
        <div>
          <h2>{text.philosophy}</h2>
          <p>{text.philosophyDescription}</p>
        </div>
        <Link to="/projects/$slug" params={{ slug: 'mosaic-portfolio' }}>
          {text.projectLink}
        </Link>
      </Card>
    </div>
  )
}
