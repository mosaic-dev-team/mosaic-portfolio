import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { PostCard } from '../../components/ui/PostCard'
import { Card } from '../../components/ui/Card'
import { ProjectCard } from '../../components/ui/ProjectCard'
import { useLanguage } from '../../context/language'
import { formatDate } from '../../lib/formatDate'
import { getMember, postsBy, projectsOf } from '../../lib/relations'
import { usePageTitle } from '../../hooks/usePageTitle'
import { TagList } from '../../components/ui/TagList'
import sharedStyles from '../../styles/shared.module.css'
import styles from './ResumePage.module.css'

const copy = {
  en: {
    back: 'Back to Team',
    download: 'Download Résumé',
    about: 'About Me',
    skills: 'Technical Skills',
    education: 'Education',
    experience: 'Experience',
    projects: 'Projects',
    noProjects: 'No projects listed yet.',
    articles: 'Articles',
    noArticles: 'No articles listed yet.',
    languages: 'Languages and Certifications',
    ielts: 'IELTS Overall Band',
    contact: 'Contact:',
  },
  fa: {
    back: 'بازگشت به تیم',
    download: 'دانلود رزومه',
    about: 'دربارهٔ من',
    skills: 'مهارت‌های فنی',
    education: 'تحصیلات',
    experience: 'سوابق و فعالیت‌ها',
    projects: 'پروژه‌ها',
    noProjects: 'هنوز پروژه‌ای ثبت نشده است.',
    articles: 'مقاله‌ها',
    noArticles: 'هنوز مقاله‌ای ثبت نشده است.',
    languages: 'زبان‌ها و مدارک',
    ielts: 'نمرهٔ کل آیلتس',
    contact: 'راه‌های ارتباطی:',
  },
}

export const Route = createFileRoute('/team/$slug')({
  loader: ({ params: { slug } }) => {
    const member = getMember(slug)
    if (!member) throw notFound()

    return {
      member,
      projects: projectsOf(slug),
      posts: postsBy(slug),
    }
  },
  component: ResumePage,
})

function ResumePage() {
  const { member, projects, posts } = Route.useLoaderData()
  const { language } = useLanguage()
  usePageTitle(member.name[language])
  const text = copy[language]
  const { name, role, portrait, contact, resumePdfUrl, ielts } = member
  const hasContact = contact?.email || contact?.githubUrl || contact?.linkedinUrl

  return (
    <div className={`${sharedStyles.page} ${styles.page}`}>
      <Link to="/team" className={styles.back}>{text.back}</Link>

      <Card color={member.color} className={`${styles.full} ${styles.card} ${styles.hero}`}>
        {portrait && <img className={styles.portrait} src={portrait.src} alt={portrait.alt[language]} />}
        <div className={styles.profile}>
          <h1>{name[language]}</h1>
          <p className={styles.role}>{role[language]}</p>
          {resumePdfUrl && (
            <a
              className={`${sharedStyles.button} ${styles.download}`}
              href={`${import.meta.env.BASE_URL}${resumePdfUrl}`}
              aria-label={`${text.download} · ${name[language]} (PDF)`}
              download
            >
              {text.download}
            </a>
          )}
          {hasContact && (
            <div className={styles.heroLinks}>
              <p>{text.contact}</p>
              <ul className={styles.links} role="list">
                {contact.email && <li><a href={`mailto:${contact.email}`}><bdi>{contact.email}</bdi></a></li>}
                {contact.githubUrl && <li><a href={contact.githubUrl}><bdi lang="en">GitHub</bdi></a></li>}
                {contact.linkedinUrl && <li><a href={contact.linkedinUrl}><bdi lang="en">LinkedIn</bdi></a></li>}
              </ul>
            </div>
          )}
        </div>
      </Card>

      <Card color="cream" className={styles.card}>
        <section>
          <h2>{text.about}</h2>
          <p>{member.bio[language]}</p>
        </section>
      </Card>

      <Card color="midnight" className={styles.card}>
        <section>
          <h2>{text.skills}</h2>
          <TagList items={member.skills} />
        </section>
      </Card>

      <Card color="orange" className={styles.card}>
        <section>
          <h2>{text.education}</h2>
          <ul className={styles.entries} role="list">
            {member.education.map(({ institution, title, period }) => (
              <li key={title.en}>
                <h3>{institution[language]}</h3>
                <p>{title[language]}</p>
                <p className={styles.period}>{period[language]}</p>
              </li>
            ))}
          </ul>
        </section>
      </Card>

      <Card color="champagne" className={styles.card}>
        <section>
          <h2>{text.experience}</h2>
          <ul className={styles.entries} role="list">
            {member.experience.map(({ title, organization, period, responsibilities }) => (
              <li key={`${organization.en}-${title.en}`}>
                <h3>{title[language]}</h3>
                <p>{organization[language]}</p>
                <p className={styles.period}>{period[language]}</p>
                {!!responsibilities?.length && (
                  <ul className={styles.responsibilities}>
                    {responsibilities.map((item) => <li key={item.en}>{item[language]}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      </Card>

      <section className={`${styles.full} ${styles.projects}`}>
        <h2>{text.projects}</h2>
        {projects.length ? (
          <ul className={styles.projectGrid} role="list">
            {projects.map((project) => (
              <li key={project.slug} data-project={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        ) : <p>{text.noProjects}</p>}
      </section>

      <Card color="berry" className={styles.card}>
        <section>
          <h2>{text.articles}</h2>
          {posts.length ? (
            <div className={styles.related}>
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} showAuthor={false} />
              ))}
            </div>
          ) : <p>{text.noArticles}</p>}
        </section>
      </Card>

      {(!!member.languages?.length || ielts) && (
        <Card color="marigold" className={styles.card}>
          <section>
            <h2>{text.languages}</h2>
            {!!member.languages?.length && (
              <dl className={styles.languages}>
                {member.languages.map(({ name, level }) => (
                  <div key={name.en}>
                    <dt>{name[language]}</dt>
                    <dd>{level[language]}</dd>
                  </div>
                ))}
              </dl>
            )}
            {ielts && (
              <p className={styles.ielts}>
                {text.ielts} <bdi>{ielts.overallBand.toFixed(1)}</bdi>
                {' · '}<time dateTime={ielts.date}>{formatDate(ielts.date, language)}</time>
              </p>
            )}
          </section>
        </Card>
      )}
    </div>
  )
}
