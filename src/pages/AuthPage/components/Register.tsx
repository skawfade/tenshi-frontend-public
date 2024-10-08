import { Button, Input, Link } from '@nextui-org/react'
import { Formik } from 'formik'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'
import { selectUser } from '../../../features/user/userSlice'
import { Helmet } from 'react-helmet-async'
import API from '../../../api/config'
import { toast } from 'react-toastify'
import { ConfirmCode } from './ConfirmCode'

export const Register = () => {
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [confirmEmailFormShow, setConfirmEmailFormShow] = useState(false)
  const [otp, setOtp] = useState(Array(6).fill(''))

  const handleLoginSubmit = useCallback(async () => {
    setIsLoading(true)
    const payload = {
      email,
      password,
      username
    }
    API.request(`auth/register`, 'POST', payload)
      .then((data) => {
        if (data.success) {
          setConfirmEmailFormShow(true)
        } else {
          toast(data.message)
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [email, password, username])

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
            navigate('/login')
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
    [email, navigate]
  )

  const handleUsernameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value)
    },
    []
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

  const handleConfirmPasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value)
    },
    []
  )

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [navigate, user])

  return (
    <>
      <Helmet>
        <title>Tenshi - Регистрация</title>
        <meta
          name="description"
          content="Зарегистрируйте аккаунт tenshi, чтобы получить полный доступ ко всем преимуществам проекта."
        />
        <link rel="canonical" href="/register" />
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
            Регистрация
          </h2>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: ''
            }}
            onSubmit={handleLoginSubmit}
          >
            {({ errors, touched }) => (
              <>
                <div className="flex flex-col w-full md:w-1/2 gap-4 mb-4">
                  <Input
                    variant="bordered"
                    label="Имя пользователя"
                    placeholder="Введите имя пользователя"
                    id="username"
                    autoComplete="username"
                    value={username}
                    isInvalid={!!errors.username && !!touched.username}
                    errorMessage={errors.username}
                    onChange={handleUsernameChange}
                  />
                  <Input
                    variant="bordered"
                    label="Почта"
                    type="email"
                    placeholder="Введите email"
                    id="email"
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
                    placeholder="Введите новый пароль"
                    value={password}
                    isInvalid={!!errors.password && !!touched.password}
                    errorMessage={errors.password}
                    onChange={handlePasswordChange}
                  />
                  <Input
                    variant="bordered"
                    label="Еще раз пароль"
                    id="password"
                    placeholder="Подтвердите пароль"
                    type="password"
                    value={confirmPassword}
                    isInvalid={
                      !!errors.confirmPassword && !!touched.confirmPassword
                    }
                    errorMessage={errors.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>

                <Button
                  className="border-[#eb5628] text-[#eb5628] hover:!bg-[#eb5628] hover:text-white min-h-10 min-w-[175px]"
                  variant="ghost"
                  isLoading={isLoading}
                  onPress={handleLoginSubmit}
                >
                  Зарегистрироваться
                </Button>
              </>
            )}
          </Formik>

          <div className="font-light text-slate-400 mt-4 text-sm">
            Уже есть аккаунт ?{' '}
            <Link href="/login" className="text-[#eb5628]">
              Войти
            </Link>
          </div>
        </>
      )}
    </>
  )
}
