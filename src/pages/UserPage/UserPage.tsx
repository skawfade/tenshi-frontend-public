import { useCallback, useEffect, useState } from 'react'
import { Avatar, Divider, Tooltip } from '@nextui-org/react'
import { Helmet } from 'react-helmet-async'
import {
  getAchievementProfileById,
  getBadgeProfileById
} from '../../utils/profile'
import { User } from '../../types/user'
import { useParams } from 'react-router-dom'
import API from '../../api/config'


const UserPage = (): JSX.Element | null => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)


  const { id } = useParams<{ id: string }>()

  const loadProfileUser = useCallback(async () => {
    setIsLoading(true)

    await API.request(`users/${id}`, 'GET')
      .then((data) => {
        setUser(data.user)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  useEffect(() => {
    loadProfileUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return user && !isLoading ? (
    <div className="flex h-full w-full flex-col">
      <Helmet>
        <title>Tenshi - Профиль</title>
        <meta
          name="description"
          content="Просматривайте и редактируйте свой профиль, управляйте аватаром и следите за своими любимыми аниме. Все ваши данные в одном месте."
        />
        <link rel="canonical" href="/profile" />
      </Helmet>
      <div className="flex flex-col md:flex-row min-h-28 justify-between p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex flex-col items-center gap-4">
            <Avatar
              src={user.profile.avatar}
              className="w-40 h-40 text-large"
            />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <div className="flex-col flex gap-1 items-center md:items-start">
              <h3 className="text-xl font-bold">{user?.username}</h3>
            </div>
            <h3 className="text-xl font-bold w-max">Уровень: {user.profile.level}</h3>
          </div>
          <div className="flex flex-col gap-1 h-full justify-between w-full items-start">
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-xl">Значки</h3>
              <div className="flex gap-2">
                {user.profile.badges.map((id) => {
                  const badge = getBadgeProfileById(id)
                  return (
                    <Tooltip
                      classNames={{
                        content: ['text-white bg-[#eb5628]']
                      }}
                      placement="bottom"
                      content={badge?.name}
                      key={id}
                    >
                      <div className="rounded-lg h-9 w-9 flex items-center dark:bg-white dark:border-none justify-center bg-[#eb5628]">
                        {badge?.icon}
                      </div>
                    </Tooltip>
                  )
                })}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-xl">Достижения</h3>
              <div className="flex gap-2">
                {user.profile.achievements.map((id) => {
                  const achievement = getAchievementProfileById(id)
                  return (
                    <Tooltip
                      classNames={{
                        content: ['text-white bg-[#eb5628]']
                      }}
                      placement="bottom"
                      content={achievement?.name}
                      key={id}
                    >
                      <div className="rounded-lg h-9 w-9 flex items-center justify-center">
                        {achievement?.icon}
                      </div>
                    </Tooltip>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col p-6 ">
      </div>
    </div>
  ) : (
    <div>Профиль не найден</div>
  )
}

export default UserPage
