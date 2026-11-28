import { getRouteApi } from '@tanstack/react-router'
import { filterProjects, validateProjectFilters } from '../lib/projectFilters'
import { projects } from '../data/projects'
import type { ProjectFilters } from '../data/types'

const route = getRouteApi('/projects/')

export function useProjectFilters() {
  const filters = route.useSearch()
  const navigate = route.useNavigate()
  const results = filterProjects(projects, filters)

  return {
    filters,
    results,
    onChange: (patch: ProjectFilters) => {
      const onlyQueryChanges = 'q' in patch && !('member' in patch) && !('tag' in patch)
      const startsSearch = !filters.q?.trim() && Boolean(patch.q?.trim())

      return navigate({
        search: (previous) => validateProjectFilters({ ...previous, ...patch }),
        replace: onlyQueryChanges && !startsSearch,
        resetScroll: false,
      })
    },
    onClear: () => navigate({ search: {}, resetScroll: false }),
  }
}
