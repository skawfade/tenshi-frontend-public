import { Helmet } from 'react-helmet-async'

const ContactPage = (): JSX.Element | null => {
  return (
    <div className="flex h-full w-full flex-col">
      <Helmet>
        <title>Tenshi - Контакты</title>
        <meta
          name="description"
          content="Просматривайте и редактируйте свой профиль, управляйте аватаром и следите за своими любимыми аниме. Все ваши данные в одном месте."
        />
        <link rel="canonical" href="/contact" />
      </Helmet>
      <h1 className="text-3xl font-bold text-[#eb5628]">Контакты</h1>
    </div>
  )
}

export default ContactPage
