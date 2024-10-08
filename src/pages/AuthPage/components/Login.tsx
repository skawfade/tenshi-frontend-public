import { Button, Input, Link } from '@nextui-org/react'
import { Formik } from 'formik'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { me, selectUser } from '../../../features/user/userSlice'
import { Helmet } from 'react-helmet-async'
import { getList } from '../../../features/list/listSlice'
import API from '../../../api/config'
import { toast } from 'react-toastify'
import { ConfirmCode } from './ConfirmCode'

export const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  const [isLoading, setIsLoading] = useState(false)
  const [confirmEmailFormShow, setConfirmEmailFormShow] = useState(false)
  const [otp, setOtp] = useState(Array(6).fill(''))

  const handleLoginSubmit = useCallback(async () => {
    setIsLoading(true)

    const payload = {
      email,
      password
    }

    API.request(`auth/login`, 'POST', payload)
      .then((data) => {
        if (!data?.user && !data?.success) {
          toast(data?.message, { type: 'error' })
          return // Выход из функции при ошибке
        }

        // Проверяем, если пользователь существует и не подтвержден
        if (data?.user && !data.user.isConfirmed) {
          setConfirmEmailFormShow(true) // Показываем форму подтверждения
        } else {
          dispatch(me()) // Все в порядке, продолжаем
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [dispatch, email, password])

  const handleConfirmEmailSubmit = useCallback(
    async (code: string) => {
      const payload = {
        email,
        confirmationCode: code
      }

      API.request(`auth/confirmEmail`, 'POST', payload)
        .then((data) => {
          if (data.success) {
            toast(
              'Успешно. Теперь вы можете зайти под своей почтой и паролем',
              { type: 'success' }
            )
            setConfirmEmailFormShow(false)
          } else {
            setOtp(Array(6).fill(''))
            toast(data.message)
          }
        })
        .catch((error) => {
          setOtp(Array(6).fill(''))
          toast(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
    [email]
  )

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }, [])

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
    },
    []
  )

  useEffect(() => {
    if (user) {
      dispatch(getList(user._id))
      navigate('/')
    }
  }, [dispatch, navigate, user])

  return (
    <>
      <Helmet>
        <title>Tenshi - Авторизация</title>
        <meta
          name="description"
          content="Войдите в свой аккаунт tenshi, чтобы получить полный доступ ко всем преимуществам проекта."
        />
        <link rel="canonical" href="/login" />
      </Helmet>
      {confirmEmailFormShow ? (
        <>
          <h2 className="text-center text-[25px] font-bold mb-6">
            Код отправлен вам на почту
          </h2>
          <ConfirmCode
            otp={otp}
            setOtp={setOtp}
            onSubmit={handleConfirmEmailSubmit}
          />
        </>
      ) : (
        <>
          <h2 className="text-center text-[25px] font-bold mb-6">
            Авторизация
          </h2>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={handleLoginSubmit}
          >
            {({ errors, touched }) => (
              <>
                <div className="flex flex-col w-full md:w-1/2 gap-4 mb-4">
                  <Input
                    variant="bordered"
                    label="Почта"
                    id="email"
                    type="email"
                    placeholder="Введите почту"
                    autoComplete="email"
                    value={email}
                    isInvalid={!!errors.email && !!touched.email}
                    errorMessage={errors.email}
                    onChange={handleEmailChange}
                  />
                  <Input
                    variant="bordered"
                    label="Пароль"
                    id="password"
                    type="password"
                    autoComplete="password"
                    placeholder="Введите пароль"
                    value={password}
                    isInvalid={!!errors.password && !!touched.password}
                    errorMessage={errors.password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <Button
                  className="border-[#eb5628] text-[#eb5628] hover:!bg-[#eb5628] hover:text-white min-h-10"
                  variant="ghost"
                  isLoading={isLoading}
                  onPress={handleLoginSubmit}
                >
                  Войти
                </Button>
              </>
            )}
          </Formik>

          <div className="font-light text-slate-400 mt-4 text-sm">
            Еще нет аккаунта ?{' '}
            <Link href="/register" className="text-[#eb5628]">
              Зарегистрироваться
            </Link>
          </div>
        </>
      )}
    </>
  )
}
