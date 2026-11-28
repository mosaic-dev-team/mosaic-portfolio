import { members } from '../data/members'
import { posts } from '../data/posts'
import { projects } from '../data/projects'
import type { Project } from '../data/types'

export const publishedPosts = posts.filter((post) => post.status === 'published')

export const getMember = (slug: string) => members.find((member) => member.slug === slug)
export const getProject = (slug: string) => projects.find((project) => project.slug === slug)
export const membersOf = (project: Project) => members.filter((member) => project.memberSlugs.includes(member.slug))
export const projectsOf = (memberSlug: string) => projects.filter((project) => project.memberSlugs.includes(memberSlug))
export const postsBy = (memberSlug: string) => publishedPosts.filter((post) => post.authorSlug === memberSlug)
