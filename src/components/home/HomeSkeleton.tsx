import { Link } from '@tanstack/react-router'
import { useLanguage } from '../../context/language'
import { Card, type CardVariant } from '../ui/Card'
import styles from './HomeSkeleton.module.css'

const copy = {
  en: {
    eyebrow: 'Frontend Development Team',
    title: 'Different pieces. One vision.',
    introduction: 'We’re MOSAIC, a two-person team building frontend projects together.',
    exploreProjects: 'Explore Projects',
    meetTeam: 'Meet the Team',
    team: 'Team and About',
    personA: 'Person A',
    personB: 'Person B',
    member: 'A member of the MOSAIC team.',
    about: 'About MOSAIC',
    aboutText: 'MOSAIC is our shared portfolio for team and individual work.',
    projects: 'Selected Projects',
    idempotency: 'Idempotency',
    idempotencyText: 'Person B’s frontend e-commerce project.',
    sharding: 'Sharding',
    shardingText: 'Person A’s frontend e-commerce project.',
    mosaic: 'MOSAIC',
    mosaicText: 'Our shared team portfolio project.',
    journal: 'Our Journal',
    journalText: 'A space for future technical articles from the team.',
    visitJournal: 'Visit the Blog',
    contact: 'Contact',
    contactText: 'Contact details will be added here.',
  },
  fa: {
    eyebrow: 'تیم توسعهٔ فرانت‌اند',
    title: 'قطعه‌های متفاوت، یک چشم‌انداز مشترک.',
    introduction: 'ما موزاییک هستیم، تیمی دونفره که با هم پروژه‌های فرانت‌اند می‌سازیم.',
    exploreProjects: 'دیدن پروژه‌ها',
    meetTeam: 'آشنایی با تیم',
    team: 'تیم و دربارهٔ ما',
    personA: 'نفر اول',
    personB: 'نفر دوم',
    member: 'عضوی از تیم موزاییک.',
    about: 'دربارهٔ موزاییک',
    aboutText: 'موزاییک نمونه‌کار مشترک ما برای معرفی کارهای تیمی و فردی است.',
    projects: 'پروژه‌های منتخب',
    idempotency: 'آیدمپوتنسی',
    idempotencyText: 'پروژهٔ فرانت‌اند فروشگاهی نفر دوم.',
    sharding: 'شاردینگ',
    shardingText: 'پروژهٔ فرانت‌اند فروشگاهی نفر اول.',
    mosaic: 'موزاییک',
    mosaicText: 'پروژهٔ نمونه‌کار مشترک تیم.',
    journal: 'نوشته‌های ما',
    journalText: 'جایی برای نوشته‌های فنی آیندهٔ تیم.',
    visitJournal: 'رفتن به وبلاگ',
    contact: 'ارتباط با ما',
    contactText: 'اطلاعات تماس اینجا اضافه می‌شود.',
  },
}

const projects = [
  { name: 'idempotency', description: 'idempotencyText', variant: 'burgundy' },
  { name: 'sharding', description: 'shardingText', variant: 'forest' },
  { name: 'mosaic', description: 'mosaicText', variant: 'velvet' },
] as const satisfies readonly {
  name: keyof typeof copy.en
  description: keyof typeof copy.en
  variant: CardVariant
}[]

export function HomeSkeleton() {
  const { language } = useLanguage()
  const text = copy[language]

  return (
    <div className={styles.home}>
      <Card variant="midnight" className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>{text.eyebrow}</p>
          <h1>{text.title}</h1>
          <p>{text.introduction}</p>
          <div className={styles.actions}>
            <Link to="/projects" className={styles.primaryLink}>{text.exploreProjects}</Link>
            <Link to="/team">{text.meetTeam}</Link>
          </div>
        </div>
        <div className={styles.mosaic} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </Card>

      <section aria-labelledby="home-team">
        <h2 id="home-team">{text.team}</h2>
        <div className={styles.grid}>
          {[text.personA, text.personB].map((member) => (
            <Card key={member} variant="blush">
              <span className={styles.avatar} aria-hidden="true" />
              <h3>{member}</h3>
              <p>{text.member}</p>
            </Card>
          ))}
          <Card className={styles.wide}>
            <h3>{text.about}</h3>
            <p>{text.aboutText}</p>
            <Link to="/team">{text.meetTeam}</Link>
          </Card>
        </div>
      </section>

      <section aria-labelledby="home-projects">
        <h2 id="home-projects">{text.projects}</h2>
        <div className={styles.grid}>
          {projects.map(({ name, description, variant }, index) => (
            <Card key={name} variant={variant} className={index === 0 ? styles.wide : undefined}>
              <h3>{text[name]}</h3>
              <p>{text[description]}</p>
              {index === 0 && <Link to="/projects">{text.exploreProjects}</Link>}
            </Card>
          ))}
        </div>
      </section>

      <div className={styles.grid}>
        <Card variant="deep-green" className={styles.wide}>
          <h2>{text.journal}</h2>
          <p>{text.journalText}</p>
          <Link to="/blog">{text.visitJournal}</Link>
        </Card>
        <Card className={styles.wide}>
          <h2>{text.contact}</h2>
          <p>{text.contactText}</p>
        </Card>
      </div>
    </div>
  )
}
