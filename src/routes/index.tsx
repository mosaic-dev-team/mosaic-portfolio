import { createFileRoute } from '@tanstack/react-router'
import { HomeSkeleton } from '../components/home/HomeSkeleton'

export const Route = createFileRoute('/')({
  component: HomeSkeleton,
})
