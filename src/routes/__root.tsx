import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { NotFoundPage } from '../components/layout/NotFoundPage'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})

function RootLayout() {
  return (
    <>
      <Header />
      <main><Outlet /></main>
      <Footer />
    </>
  )
}
