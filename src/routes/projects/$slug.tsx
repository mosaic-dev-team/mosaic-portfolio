import { createFileRoute, notFound } from '@tanstack/react-router'
import { members } from '../../data/members'
import { projects } from '../../data/projects'

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params: { slug } }) => {
    const project = projects.find((entry) => entry.slug === slug)
    if (!project) throw notFound()

    return {
      project,
      makers: members.filter((member) => project.memberSlugs.includes(member.slug)),
    }
  },
  component: () => <h1>جزئیات پروژه</h1>,
})
