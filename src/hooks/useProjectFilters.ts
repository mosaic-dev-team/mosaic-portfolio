import { getRouteApi } from '@tanstack/react-router'
import { members } from '../data/members'
import { filterProjects, projects, validateProjectFilters } from '../data/projects'
import type { ProjectFilters } from '../data/types'

const route = getRouteApi('/projects/')
const tags = [...new Set(projects.flatMap((project) => project.tags))].sort()

export function useProjectFilters() {
  const filters = route.useSearch()
  const navigate = route.useNavigate()
  const results = filterProjects(projects, filters)

  return {
    filters,
    members,
    tags,
    results,
    count: results.length,
    onChange: (patch: ProjectFilters) =>
      navigate({
        search: (previous) => validateProjectFilters({ ...previous, ...patch }),
        replace: 'q' in patch && !('member' in patch) && !('tag' in patch),
        resetScroll: false,
      }),
    onClear: () => navigate({ search: {}, resetScroll: false }),
  }
}
