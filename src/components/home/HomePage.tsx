import { Link } from '@tanstack/react-router'
import heroImage from '../../assets/illustrations/hero.webp'
import { useLanguage } from '../../context/language'
import { formatDate } from '../../data/formatDate'
import { members } from '../../data/members'
import { publishedPosts } from '../../data/posts'
import { projects } from '../../data/projects'
import { usePageTitle } from '../../hooks/usePageTitle'
import { ArticleCard } from '../ui/ArticleCard'
import { Card } from '../ui/Card'
import { MemberCard } from '../ui/MemberCard'
import { MemberContacts } from '../ui/MemberContacts'
import { ProjectCard } from '../ui/ProjectCard'
import styles from './HomePage.module.css'

const homeCopy = {
  en: {
    eyebrow: 'Frontend Development Team',
    title: 'Different pieces.',
    titleEnd: 'One vision.',
    introduction: 'We’re MOSAIC, a two-person team building frontend projects together.',
    exploreProjects: 'Explore Projects',
    meetTeam: 'Meet the Team',
    team: 'Team and About',
    about: 'About MOSAIC',
    aboutText: 'MOSAIC is our shared frontend portfolio, bringing together individual projects, collaborative work, and our experiences as developers.',
    projects: 'Selected Projects',
    allProjects: 'View All Projects',
    viewProject: 'View Project',
    journal: 'Our Journal',
    journalText: 'Thoughts, stories, and lessons from our development journey.',
    visitJournal: 'Visit the Blog',
    contact: 'Contact',
    contactText: 'Great things start with a conversation.',
  },
  fa: {
    eyebrow: 'تیم توسعهٔ فرانت‌اند',
    title: 'قطعه‌های متفاوت،',
    titleEnd: 'یک چشم‌انداز مشترک.',
    introduction: 'ما موزاییک هستیم، تیمی دونفره که با هم پروژه‌های فرانت‌اند می‌سازیم.',
    exploreProjects: 'دیدن پروژه‌ها',
    meetTeam: 'آشنایی با تیم',
    team: 'تیم و دربارهٔ ما',
    about: 'دربارهٔ موزاییک',
    aboutText: 'موزاییک پورتفولیوی مشترک ماست؛ فضایی برای نمایش پروژه‌های فردی، کارهای تیمی و تجربه‌های ما در مسیر توسعه نرم‌افزار.',
    projects: 'پروژه‌های منتخب',
    allProjects: 'دیدن همهٔ پروژه‌ها',
    viewProject: 'مشاهده پروژه',
    journal: 'نوشته‌های ما',
    journalText: 'ایده‌ها، تجربه‌ها و آموخته‌های ما در مسیر توسعه نرم‌افزار.',
    visitJournal: 'رفتن به وبلاگ',
    contact: 'ارتباط با ما',
    contactText: 'کارهای بزرگ با یک گفت‌وگو آغاز می‌شوند.',
  },
}

const homeMembers = ['alireza', 'baran']
  .map((slug) => members.find((member) => member.slug === slug))
  .filter((member) => member !== undefined)
const selectedProjects = projects.filter((project) =>
  ['idempotency', 'shard-market', 'mosaic-portfolio'].includes(project.slug),
)
const journalPosts = publishedPosts.slice(0, 2)

export function HomePage() {
  const { language } = useLanguage()
  usePageTitle(language === 'fa' ? 'نمونه‌کار فرانت‌اند' : 'Frontend Portfolio')
  const text = homeCopy[language]

  return (
    <div className={styles.home}>
      <Card className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>{text.eyebrow}</p>
          <h1>
            {text.title}{' '}
            <span>{text.titleEnd}</span>
          </h1>
          <p className={styles.introduction}>{text.introduction}</p>
          <div className={styles.actions}>
            <Link to="/projects" className={styles.primaryLink}>{text.exploreProjects}</Link>
            <Link to="/team" className={styles.secondaryLink}>{text.meetTeam}</Link>
          </div>
        </div>
        <img className={styles.heroImage} src={heroImage} alt="" width="1000" height="667" />
      </Card>

      <section aria-labelledby="home-team">
        <h2 id="home-team" className={styles.sectionTitle}>{text.team}</h2>
        <div className={`${styles.grid} ${styles.teamGrid}`}>
          {homeMembers.map((member) => (
            <MemberCard
              key={member.slug}
              className={styles.visualCard}
              slug={member.slug}
              name={member.name[language]}
              role={member.role[language]}
              portraitSrc={member.portrait?.src}
              portraitAlt={member.portrait?.alt[language]}
              variant={member.slug === 'baran' ? 'team-forest' : 'team-burgundy'}
            />
          ))}
          <Card variant="midnight" className={`${styles.feature} ${styles.about}`}>
            <h3>{text.about}</h3>
            <p>{text.aboutText}</p>
            <Link to="/team">{text.meetTeam}</Link>
          </Card>
        </div>
      </section>

      <section aria-labelledby="home-projects">
        <div className={styles.sectionHeader}>
          <h2 id="home-projects" className={styles.sectionTitle}>{text.projects}</h2>
          <Link to="/projects" search={{}}>{text.allProjects}</Link>
        </div>
        <div className={`${styles.grid} ${styles.projectGrid}`}>
          {selectedProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title[language]}
              description={project.summary[language]}
              imageSrc={project.image?.src}
              imageAlt={project.image?.alt[language]}
              linkLabel={text.viewProject}
            />
          ))}
        </div>
      </section>

      <div className={`${styles.grid} ${styles.closingGrid}`}>
        <Card variant="team-forest" className={styles.feature}>
          <h2>{text.journal}</h2>
          <p>{text.journalText}</p>
          <Link to="/blog">{text.visitJournal}</Link>
          {journalPosts.length > 0 && (
            <div className={styles.articles}>
              {journalPosts.map((post) => (
                <ArticleCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title[language]}
                  summary={post.summary[language]}
                  cover={post.cover && { src: post.cover.src, alt: post.cover.alt[language] }}
                  author={members.find((member) => member.slug === post.authorSlug)?.name[language]}
                  publishedOn={formatDate(post.publishedAt, language)}
                />
              ))}
            </div>
          )}
        </Card>
        <Card variant="midnight" className={`${styles.feature} ${styles.contact}`}>
          <h2>{text.contact}</h2>
          <p>{text.contactText}</p>
          <MemberContacts />
        </Card>
      </div>
    </div>
  )
}
