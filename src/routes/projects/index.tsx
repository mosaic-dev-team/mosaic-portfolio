import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'
import { Card } from '../../components/ui/Card'
import { ProjectCard } from '../../components/ui/ProjectCard'
import { useLanguage } from '../../context/language'
import { projects, validateProjectFilters } from '../../data/projects'
import { useProjectFilters } from '../../hooks/useProjectFilters'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './ProjectsPage.module.css'

const contributorSlugs = new Set(projects.flatMap((project) => project.memberSlugs))

const copy = {
  en: {
    eyebrow: 'THE THINGS WE BUILD',
    heading: 'Our Projects.',
    description: "From individual ideas to collaborative experiences. Explore what we've built along the way.",
    search: 'Search projects',
    member: 'Team member',
    allMembers: 'All members',
    tag: 'Tag',
    allTags: 'All tags',
    unavailable: 'Unavailable filter',
    clear: 'Clear filters',
    singular: 'project',
    plural: 'projects',
    contributors: 'Contributors',
    view: 'View Project',
    noResults: 'No projects found',
    tryAgain: 'Try a different search or clear your filters.',
  },
  fa: {
    eyebrow: 'آنچه می‌سازیم',
    heading: 'پروژه‌های ما',
    description: 'از ایده‌های فردی تا تجربه‌های مشترک؛ با پروژه‌هایی که در این مسیر ساخته‌ایم آشنا شوید.',
    search: 'جست‌وجوی پروژه‌ها',
    member: 'عضو تیم',
    allMembers: 'همهٔ اعضا',
    tag: 'برچسب',
    allTags: 'همهٔ برچسب‌ها',
    unavailable: 'فیلتر نامعتبر',
    clear: 'پاک کردن فیلترها',
    singular: 'پروژه',
    plural: 'پروژه',
    contributors: 'مشارکت‌کنندگان',
    view: 'مشاهده پروژه',
    noResults: 'پروژه‌ای پیدا نشد',
    tryAgain: 'عبارت دیگری جست‌وجو کنید یا فیلترها را پاک کنید.',
  },
}

export const Route = createFileRoute('/projects/')({
  validateSearch: validateProjectFilters,
  component: function ProjectsPage() {
    const { language } = useLanguage()
    const { filters, members, tags, results, count, onChange, onClear } = useProjectFilters()
    const returnFilters = validateProjectFilters(filters)
    const searchInput = useRef<HTMLInputElement>(null)
    const text = copy[language]
    usePageTitle(language === 'fa' ? 'پروژه‌ها' : 'Projects')
    const memberOptions = members.filter((member) => contributorSlugs.has(member.slug))
    const nameList = new Intl.ListFormat(language === 'fa' ? 'fa-IR' : 'en')
    const resultCount = new Intl.NumberFormat(language === 'fa' ? 'fa-IR' : 'en').format(count)

    function clearFromEmptyState() {
      searchInput.current?.focus()
      void onClear()
    }

    return (
      <div className={styles.page}>
        <Card variant="team-forest" className={styles.hero}>
          <p className={styles.eyebrow}>{text.eyebrow}</p>
          <h1>{text.heading}</h1>
          <p>{text.description}</p>
        </Card>

        <Card className={styles.filters}>
          <form role="search" aria-label={text.search} onSubmit={(event) => event.preventDefault()}>
            <label>
              {text.search}
              <input
                ref={searchInput}
                type="search"
                value={filters.q ?? ''}
                onChange={(event) => void onChange({ q: event.currentTarget.value })}
              />
            </label>
            <label>
              {text.member}
              <select
                value={filters.member ?? ''}
                onChange={(event) => void onChange({ member: event.currentTarget.value || undefined })}
              >
                <option value="">{text.allMembers}</option>
                {filters.member && !memberOptions.some((member) => member.slug === filters.member) && (
                  <option value={filters.member} disabled>{text.unavailable}</option>
                )}
                {memberOptions.map((member) => (
                  <option key={member.slug} value={member.slug}>{member.name[language]}</option>
                ))}
              </select>
            </label>
            <label>
              {text.tag}
              <select
                value={filters.tag ?? ''}
                onChange={(event) => void onChange({ tag: event.currentTarget.value || undefined })}
              >
                <option value="">{text.allTags}</option>
                {filters.tag && !tags.includes(filters.tag) && (
                  <option value={filters.tag} disabled>{text.unavailable}</option>
                )}
                {tags.map((tag) => <option key={tag} value={tag} lang="en">{tag}</option>)}
              </select>
            </label>
            <button type="button" className={styles.clear} onClick={() => void onClear()}>
              {text.clear}
            </button>
          </form>
        </Card>

        <section className={styles.results}>
          <h2 className={styles.count} aria-live="polite">
            {resultCount} {count === 1 ? text.singular : text.plural}
          </h2>
          {count ? (
            <ul className={styles.grid} role="list">
              {results.map((project) => {
                const names = memberOptions
                  .filter((member) => project.memberSlugs.includes(member.slug))
                  .map((member) => member.name[language])

                return (
                  <li key={project.slug}>
                    <ProjectCard
                      slug={project.slug}
                      title={project.title[language]}
                      description={project.summary[language]}
                      imageSrc={project.image?.src}
                      imageAlt={project.image?.alt[language]}
                      tools={project.tools}
                      linkLabel={text.view}
                      returnFilters={returnFilters}
                      contributors={names.length ? `${text.contributors}: ${nameList.format(names)}` : undefined}
                    />
                  </li>
                )
              })}
            </ul>
          ) : (
            <Card className={styles.empty}>
              <h2>{text.noResults}</h2>
              <p>{text.tryAgain}</p>
              <button type="button" className={styles.clear} onClick={clearFromEmptyState}>
                {text.clear}
              </button>
            </Card>
          )}
        </section>
      </div>
    )
  },
})
