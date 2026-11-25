import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog_/$slug')({
  component: () => <h1>نوشته</h1>,
})
