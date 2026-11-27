import { createFileRoute, notFound } from '@tanstack/react-router'
import { members } from '../../data/members'
import { posts } from '../../data/posts'
import { projects } from '../../data/projects'

export const Route = createFileRoute('/team/$slug')({
  loader: ({ params: { slug } }) => {
    const member = members.find((entry) => entry.slug === slug)
    if (!member) throw notFound()

    return {
      member,
      projects: projects.filter((project) => project.memberSlugs.includes(slug)),
      posts: posts.filter((post) => post.authorSlug === slug),
    }
  },
  component: () => <h1>رزومه عضو</h1>,
})
