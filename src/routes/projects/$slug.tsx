import { createFileRoute, Link, notFound, useLocation } from '@tanstack/react-router'
import { Card } from '../../components/ui/Card'
import { TagList } from '../../components/ui/TagList'
import { useLanguage } from '../../context/language'
import { getProject, membersOf } from '../../lib/relations'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './ProjectDetailsPage.module.css'

const copy = {
  en: {
    back: 'Back to Projects',
    showcase: 'Project Showcase',
    problem: 'The Problem',
    solution: 'The Solution',
    tools: 'Technologies & Tools',
    achievements: 'Achievements',
    lessons: 'Lessons Learned',
    contributors: 'Behind the Project',
    resume: 'View Résumé',
    live: 'Live Demo',
    source: 'Source Code',
  },
  fa: {
    back: 'بازگشت به پروژه‌ها',
    showcase: 'معرفی پروژه',
    problem: 'مسئله',
    solution: 'راه‌حل',
    tools: 'فناوری‌ها و ابزارها',
    achievements: 'دستاوردها',
    lessons: 'آموخته‌ها',
    contributors: 'سازندگان پروژه',
    resume: 'مشاهده رزومه',
    live: 'مشاهده سایت',
    source: 'کد منبع',
  },
}

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params: { slug } }) => {
    const project = getProject(slug)
    if (!project) throw notFound()

    return {
      project,
      makers: membersOf(project),
    }
  },
  component: ProjectDetailsPage,
})

function ProjectDetailsPage() {
  const { project, makers } = Route.useLoaderData()
  const { language } = useLanguage()
  const returnFilters = useLocation({ select: (location) => location.state.projectFilters })
  usePageTitle(project.title[language])
  const text = copy[language]

  return (
    <div className={styles.page}>
      <Link to="/projects" search={returnFilters ?? {}} className={styles.back}>{text.back}</Link>

      <Card color={project.color} className={`${styles.full} ${styles.hero}`}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{text.showcase}</p>
          <h1>{project.title[language]}</h1>
          <p className={styles.summary}>{project.summary[language]}</p>
          {(project.liveUrl || project.repositoryUrl) && (
            <div className={styles.actions}>
              {project.liveUrl && <a href={project.liveUrl}>{text.live}</a>}
              {project.repositoryUrl && <a href={project.repositoryUrl}>{text.source}</a>}
            </div>
          )}
        </div>
        {project.image && (
          <img
            className={styles.illustration}
            src={project.image.src}
            alt={project.image.alt[language]}
          />
        )}
      </Card>

      <Card color="berry">
        <section>
          <h2>{text.problem}</h2>
          <p>{project.problem[language]}</p>
        </section>
      </Card>

      <Card color="darkGreen">
        <section>
          <h2>{text.solution}</h2>
          <p>{project.solution[language]}</p>
        </section>
      </Card>

      <Card color="midnight" className={styles.full}>
        <section>
          <h2>{text.tools}</h2>
          <TagList items={project.tools} />
        </section>
      </Card>

      <Card color="orange">
        <section>
          <h2>{text.achievements}</h2>
          <ul className={styles.achievements}>
            {project.achievements.map((item) => <li key={item.en}>{item[language]}</li>)}
          </ul>
        </section>
      </Card>

      <Card color="marigold">
        <section>
          <h2>{text.lessons}</h2>
          <p>{project.lessons[language]}</p>
        </section>
      </Card>

      {makers.length > 0 && (
        <Card color="magenta" className={styles.full}>
          <section>
            <h2>{text.contributors}</h2>
            <ul className={styles.makers} role="list">
              {makers.map((maker) => (
                <li key={maker.slug}>
                  {maker.portrait && (
                    <img
                      className={styles.portrait}
                      src={maker.portrait.src}
                      alt={maker.portrait.alt[language]}
                    />
                  )}
                  <div>
                    <h3><bdi>{maker.name[language]}</bdi></h3>
                    <p>{maker.role[language]}</p>
                    <Link to="/team/$slug" params={{ slug: maker.slug }} aria-label={`${text.resume} · ${maker.name[language]}`}>
                      {text.resume}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </Card>
      )}
    </div>
  )
}
