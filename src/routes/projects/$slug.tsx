import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$slug')({
  component: () => <h1>جزئیات پروژه</h1>,
})
