import { Suspense, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AuthLayoutWrapper } from '../pages/AuthPage/AuthLayout'
import { Login } from '../pages/AuthPage/components/Login'
import { Register } from '../pages/AuthPage/components/Register'
import Layout from '../components/Layout/Layout'

const AnimeListPage = lazy(() => import('../pages/AnimeListPage/AnimeListPage'))
const AnimePage = lazy(() => import('../pages/AnimePage/AnimePage'))
const DashboardPage = lazy(() => import('../pages/DashboardPage/DashboardPage'))
const ContactPage = lazy(() => import('../pages/ContactPage/ContactPage'))
const SettingsPage = lazy(() => import('../pages/SettingsPage/SettingsPage'))
const UserPage = lazy(() => import('../pages/UserPage/UserPage'))

const PublicRoutes = () => {
  const location = useLocation()
  const isAuthRoute = ['/login', '/register'].includes(location.pathname)

  return (
    <>
      {isAuthRoute ? (
        <AuthLayoutWrapper>
          <Suspense>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Suspense>
        </AuthLayoutWrapper>
      ) : (
        <Layout>
          <Suspense>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/anime/catalog" element={<AnimeListPage />} />
              <Route path="/anime/:id" element={<AnimePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/user/:id" element={<UserPage />} />
            </Routes>
          </Suspense>
        </Layout>
      )}
    </>
  )
}

export default PublicRoutes
