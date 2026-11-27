import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/team/$slug')({
  component: () => <h1>رزومه عضو</h1>,
})
