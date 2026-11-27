import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/team/')({
  component: () => <h1>اعضای تیم</h1>,
})
