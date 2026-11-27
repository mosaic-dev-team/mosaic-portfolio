import { createFileRoute, Link } from '@tanstack/react-router'
import { useLanguage } from '../../context/language'
import { validateProjectFilters } from '../../data/projects'
import { useProjectFilters } from '../../hooks/useProjectFilters'

export const Route = createFileRoute('/projects/')({
  validateSearch: validateProjectFilters,
  component: function ProjectsPage() {
    const { language } = useLanguage()
    const { results } = useProjectFilters()

    return (
      <>
        <h1>{language === 'fa' ? 'پروژه‌ها' : 'Projects'}</h1>
        {results.length > 0 && (
          <ul>
            {results.map((project) => (
              <li key={project.slug}>
                <Link to="/projects/$slug" params={{ slug: project.slug }}>
                  {project.title[language]}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    )
  },
})
