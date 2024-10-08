import {
  Route,
  Routes,
  useNavigate
} from 'react-router-dom'
import PublicRoutes from './routes/PublicRoutes'
import PrivateRoutes from './routes/PrivateRoutes'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { useEffect } from 'react'
import { me, selectUserStatus } from './features/user/userSlice'
import Preloader from './components/Preloader/Preloader'
import useDarkMode from 'use-dark-mode'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { NextUIProvider } from '@nextui-org/react'

dayjs.locale('ru') // Устанавливаем локаль на русский

function App() {
  const darkMode = useDarkMode(false)
  const dispatch = useAppDispatch()
  const userStatus = useAppSelector(selectUserStatus)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(me())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (darkMode.value) {
      document.body.classList.add('dark', 'text-foreground', 'bg-background')
    } else {
      document.body.classList.remove('dark', 'text-foreground', 'bg-background')
    }
  }, [darkMode])

  if (userStatus === 'loading') {
    return <Preloader />
  }

  return (
    <NextUIProvider className="container" navigate={navigate}>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/profile/*" element={<PrivateRoutes />} />
      </Routes>
    </NextUIProvider>
  )
}

export default App
