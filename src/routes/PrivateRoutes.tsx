import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectUser } from '../features/user/userSlice'
import Layout from '../components/Layout/Layout'

const ProfilePage = lazy(() => import('../pages/ProfilePage/ProfilePage'))
const ListsPage = lazy(() => import('../pages/ListsPage/ListsPage'))

const PrivateRoutes = () => {
  const user = useAppSelector(selectUser)

  if (!user) {
    return <div>Доступ запрещен</div>
  }

  return (
    <Layout>
      <Suspense>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/lists" element={<ListsPage />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default PrivateRoutes
