import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects')({
  component: () => <h1>پروژه‌ها</h1>,
})
