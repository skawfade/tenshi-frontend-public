import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  saveProfileAvatar,
  selectUser
} from '../../features/user/userSlice'
import AvatarSelect from '../../components/AvatarSelect/AvatarSelect'
import { useCallback, useMemo } from 'react'
import { Divider, Tooltip } from '@nextui-org/react'
import { Helmet } from 'react-helmet-async'
import {
  getAchievementProfileById,
  getBadgeProfileById
} from '../../utils/profile'

const ProfilePage = (): JSX.Element | null => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  const userAvatar = useMemo(() => {
    return user?.profile?.avatar ? user.profile.avatar : ''
  }, [user])

  const handleSaveAvatarUser = useCallback(
    (avatar: File) => {
      if (user) {
        dispatch(saveProfileAvatar(user._id, avatar))
      }
    },
    [user, dispatch]
  )

  // const handleDeleteAccount = useCallback(() => {
  //   if (user && window.confirm('Вы уверены?')) {
  //     dispatch(deleteProfile(user._id))
  //   }
  // }, [user, dispatch])

  return user ? (
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
            <AvatarSelect
              userAvatar={userAvatar}
              onSaveAvatar={handleSaveAvatarUser}
            />
            {/* <Button color="danger" size='sm' onClick={handleDeleteAccount}>
              Удалить аккаунт
            </Button> */}
          </div>
          <div className="flex flex-col gap-1 h-full items-center justify-between md:items-start">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold">
                Уровень: {user.profile.level}
              </h3>
              <div className="progress-bar bg-gray-200 h-3 rounded-full">
                <div
                  className="bg-orange-500 h-3 rounded-full"
                  style={{ width: `${user.profile.experience}%` }}
                />
              </div>
              <p className="text-center md:text-left">
                {user.profile.experience} / 100 XP
              </p>
            </div>
            <div className="flex-col flex gap-1 min-h-[68px] items-center md:items-start">
              <h3 className="text-xl font-bold">{user?.username}</h3>
              <p className="text-lg font-medium text-gray-600">{user?.email}</p>
            </div>
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
      <div className="flex flex-col p-6 "></div>
    </div>
  ) : null
}

export default ProfilePage
