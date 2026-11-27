import { createFileRoute, notFound } from '@tanstack/react-router'
import { members } from '../../data/members'
import { posts } from '../../data/posts'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params: { slug } }) => {
    const post = posts.find((entry) => entry.slug === slug)
    if (!post) throw notFound()

    const author = members.find((member) => member.slug === post.authorSlug)
    if (!author) throw new Error(`Unknown author: ${post.authorSlug}`)

    return { post, author, otherPosts: posts.filter((entry) => entry.slug !== slug) }
  },
  component: () => <h1>نوشته</h1>,
})
