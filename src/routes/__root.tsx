import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'

export const Route = createRootRoute({
  component: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minBlockSize: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  ),
  notFoundComponent: () => <h1>صفحه پیدا نشد</h1>,
})
