import { Helmet } from 'react-helmet-async'

const SettingsPage = (): JSX.Element => {
  return (
    <div className="flex h-full w-full items-center justify-center flex-col">
      <Helmet>
        <title>Tenshi - Настройки</title>
        <meta
          name="description"
          content="Настройте параметры приложения, управляйте уведомлениями и персонализируйте свой опыт использования Tenshi для максимального удобства."
        />
        <link rel="canonical" href="/profile" />
      </Helmet>
      <h1>Настройки приложения</h1>
    </div>
  )
}

export default SettingsPage
