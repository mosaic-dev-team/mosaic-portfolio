import { Link } from '@tanstack/react-router'
import heroImage from '../../assets/illustrations/hero.webp'
import alirezaPortrait from '../../assets/portraits/alireza.webp'
import baranPortrait from '../../assets/portraits/baran.webp'
import idempotencyImage from '../../assets/projects/idempotency.webp'
import mosaicImage from '../../assets/projects/mosaic.webp'
import shardingImage from '../../assets/projects/sharding.webp'
import { useLanguage } from '../../context/language'
import { Card } from '../ui/Card'
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
    personA: 'Person A',
    personB: 'Person B',
    member: 'A member of the MOSAIC team.',
    teamProfiles: 'Team profiles are coming soon.',
    about: 'About MOSAIC',
    aboutText: 'MOSAIC is our shared frontend portfolio for team and individual work.',
    projects: 'Selected Projects',
    allProjects: 'View All Projects',
    journal: 'Our Journal',
    journalText: 'A space for future technical articles from the team.',
    visitJournal: 'Visit the Blog',
    contact: 'Contact',
    contactText: 'Contact details will be added here.',
  },
  fa: {
    eyebrow: 'تیم توسعهٔ فرانت‌اند',
    title: 'قطعه‌های متفاوت،',
    titleEnd: 'یک چشم‌انداز مشترک.',
    introduction: 'ما موزاییک هستیم، تیمی دونفره که با هم پروژه‌های فرانت‌اند می‌سازیم.',
    exploreProjects: 'دیدن پروژه‌ها',
    meetTeam: 'آشنایی با تیم',
    team: 'تیم و دربارهٔ ما',
    personA: 'نفر اول',
    personB: 'نفر دوم',
    member: 'عضوی از تیم موزاییک.',
    teamProfiles: 'معرفی کامل اعضای تیم به‌زودی اضافه می‌شود.',
    about: 'دربارهٔ موزاییک',
    aboutText: 'موزاییک نمونه‌کار مشترک فرانت‌اند ما برای معرفی کارهای تیمی و فردی است.',
    projects: 'پروژه‌های منتخب',
    allProjects: 'دیدن همهٔ پروژه‌ها',
    journal: 'نوشته‌های ما',
    journalText: 'جایی برای نوشته‌های فنی آیندهٔ تیم.',
    visitJournal: 'رفتن به وبلاگ',
    contact: 'ارتباط با ما',
    contactText: 'اطلاعات تماس اینجا اضافه می‌شود.',
  },
}

const projects = [
  {
    image: idempotencyImage,
    height: 750,
    variant: 'burgundy',
    en: { title: 'Idempotency', description: 'Person B’s frontend e-commerce project.' },
    fa: { title: 'آیدمپوتنسی', description: 'پروژهٔ فرانت‌اند فروشگاهی نفر دوم.' },
  },
  {
    image: shardingImage,
    height: 715,
    variant: 'forest',
    en: { title: 'Sharding', description: 'Person A’s frontend e-commerce project.' },
    fa: { title: 'شاردینگ', description: 'پروژهٔ فرانت‌اند فروشگاهی نفر اول.' },
  },
  {
    image: mosaicImage,
    height: 667,
    variant: 'velvet',
    en: { title: 'MOSAIC', description: 'Our shared team portfolio project.' },
    fa: { title: 'موزاییک', description: 'پروژهٔ نمونه‌کار مشترک تیم.' },
  },
] as const

export function HomePage() {
  const { language } = useLanguage()
  const text = homeCopy[language]
  // Replace these previews with MemberCard once shared member records are available.
  const members = [
    { name: text.personA, portrait: alirezaPortrait, variant: 'midnight' },
    { name: text.personB, portrait: baranPortrait, variant: 'blush' },
  ] as const

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
          {members.map(({ name, portrait, variant }) => (
            <Card key={name} variant={variant} className={styles.visualCard}>
              <img src={portrait} alt={name} width="1000" height="1000" loading="lazy" />
              <h3>{name}</h3>
              <p>{text.member}</p>
            </Card>
          ))}
          <Card variant="deep-green" className={`${styles.feature} ${styles.about}`}>
            <h3>{text.about}</h3>
            <p>{text.aboutText}</p>
            <p>{text.teamProfiles}</p>
            <Link to="/team">{text.meetTeam}</Link>
          </Card>
        </div>
      </section>

      <section aria-labelledby="home-projects">
        <div className={styles.sectionHeader}>
          <h2 id="home-projects" className={styles.sectionTitle}>{text.projects}</h2>
          <Link to="/projects">{text.allProjects}</Link>
        </div>
        <div className={styles.grid}>
          {projects.map(({ image, height, variant, [language]: project }) => (
            <Card key={image} variant={variant} className={styles.visualCard}>
              <img src={image} alt="" width="1000" height={height} loading="lazy" />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <div className={`${styles.grid} ${styles.closingGrid}`}>
        <Card className={styles.feature}>
          <h2>{text.journal}</h2>
          <p>{text.journalText}</p>
          <Link to="/blog">{text.visitJournal}</Link>
        </Card>
        <Card variant="midnight" className={`${styles.feature} ${styles.contact}`}>
          <h2>{text.contact}</h2>
          <p>{text.contactText}</p>
        </Card>
      </div>
    </div>
  )
}
