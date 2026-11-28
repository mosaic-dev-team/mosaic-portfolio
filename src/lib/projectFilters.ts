import { members } from '../data/members'
import { projects } from '../data/projects'
import type { Project, ProjectFilters } from '../data/types'

export const projectTags = [...new Set(projects.flatMap((project) => project.tags))].sort()
export const projectMembers = members.filter((member) =>
  projects.some((project) => project.memberSlugs.includes(member.slug)),
)

export function validateProjectFilters(search: Record<string, unknown>): ProjectFilters {
  const { q, member, tag } = search

  return {
    // The router parses an unquoted numeric or boolean query as a scalar.
    q: typeof q === 'number' || typeof q === 'boolean' ? String(q) : nonBlank(q),
    member: nonBlank(member),
    tag: nonBlank(tag),
  }
}

function nonBlank(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined
}

export function filterProjects(
  list: readonly Project[],
  { q, member, tag }: ProjectFilters,
): Project[] {
  const query = q?.trim().toLowerCase()

  return list.filter((project) =>
    (!member || project.memberSlugs.includes(member)) &&
    (!tag || project.tags.includes(tag)) &&
    (!query ||
      [project.title.fa, project.title.en, ...project.tags].some((text) =>
        text.toLowerCase().includes(query),
      )),
  )
}
