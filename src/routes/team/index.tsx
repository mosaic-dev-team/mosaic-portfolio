import { createFileRoute, Link } from '@tanstack/react-router'
import { Card } from '../../components/ui/Card'
import { MemberCard } from '../../components/ui/MemberCard'
import { useLanguage } from '../../context/language'
import { members } from '../../data/members'
import styles from './TeamPage.module.css'

const copy = {
  en: {
    eyebrow: 'THE PEOPLE BEHIND MOSAIC',
    heading: 'Meet the makers.',
    description: 'Two perspectives. Different strengths. One shared vision.',
    philosophy: 'Different pieces. One vision.',
    philosophyDescription: 'A shared passion for building, learning, and creating meaningful digital experiences.',
    projectLink: 'Explore MOSAIC',
  },
  fa: {
    eyebrow: 'اعضای موزاییک',
    heading: 'با سازندگان موزاییک آشنا شوید.',
    description: 'دو نگاه متفاوت، توانایی‌های متفاوت، یک هدف مشترک.',
    philosophy: 'قطعات متفاوت، یک چشم‌انداز.',
    philosophyDescription: 'علاقه‌ای مشترک به ساختن، یادگیری و خلق تجربه‌های دیجیتال معنادار.',
    projectLink: 'مشاهده پروژه موزاییک',
  },
}

// The sample member still owns the sample project and article relationships.
const team = members.filter((member) => member.slug !== 'demo')

export const Route = createFileRoute('/team/')({
  component: function TeamPage() {
    const { language } = useLanguage()
    const text = copy[language]

    return (
      <div className={styles.page}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{text.eyebrow}</p>
          <h1>{text.heading}</h1>
          <p>{text.description}</p>
        </div>

        <div className={styles.members}>
          {team.map((member) => (
            <MemberCard
              key={member.slug}
              slug={member.slug}
              name={member.name[language]}
              role={member.role[language]}
              description={member.bio[language]}
              portraitSrc={member.portrait?.src}
              portraitAlt={member.portrait?.alt[language]}
              skills={member.skills.slice(0, 8)}
              githubUrl={member.contact?.githubUrl}
              linkedinUrl={member.contact?.linkedinUrl}
              headingLevel={2}
              variant={member.slug === 'baran' ? 'team-forest' : 'team-burgundy'}
            />
          ))}
        </div>

        <Card variant="deep-green" className={styles.philosophy}>
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
  },
})
