import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects_/$id')({
  component: () => <h1>جزئیات پروژه</h1>,
})
