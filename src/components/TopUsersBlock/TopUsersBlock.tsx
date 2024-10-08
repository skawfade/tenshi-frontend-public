import { User } from '../../types/user'
import TomiLogo from '../../assets/icons/tomi.svg?react'
import { Avatar, Card, Link } from '@nextui-org/react'

interface Props {
  usersByLevel: User[]
  usersByPoints: User[]
}

const TopUsersBlock = ({ usersByLevel, usersByPoints }: Props): JSX.Element => {
  return (
    <div className="py-4 px-4 w-full">
      <h2 className="text-3xl font-bold mb-8">Топ пользователей</h2>

      {/* Общий контейнер для двух топов */}
      <Card className="p-6 md:flex md:flex-row md:justify-between">
        {/* Топ по уровню */}
        <div className="md:w-1/2 md:pr-4 mb-6 md:mb-0">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Лучшие по уровню
          </h3>
          <ul>
            {usersByLevel.map((user, index) => (
              <li
                key={index}
                className="flex items-center justify-between mb-4 "
              >
                <div className="flex items-center">
                  <span className="font-bold text-base mr-3">{index + 1}.</span>
                  <Avatar
                    src={user.profile.avatar}
                    alt={user.username}
                    size="sm"
                    className="mr-3"
                  />
                  <Link
                    href={`/user/${user._id}`}
                    className="font-medium text-base text-gray-800 dark:text-gray-200"
                  >
                    {user.username}
                  </Link>
                </div>
                <span className="font-semibold text-base text-gray-600 dark:text-gray-400">
                  Уровень: {user.profile.level}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Разделитель */}
        <div className="border-l border-gray-300 dark:border-gray-600 mx-4" />

        {/* Топ по Томи */}
        <div className="md:w-1/2 md:pl-4">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Самые богатые
          </h3>
          <ul>
            {usersByPoints.map((user, index) => (
              <li
                key={index}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center">
                  <span className="font-bold text-base mr-3">{index + 1}.</span>
                  <Avatar
                    src={user.profile.avatar}
                    alt={user.username}
                    size="sm"
                    className="mr-3"
                  />
                  <Link
                    href={`/user/${user._id}`}
                    className="font-medium text-base text-gray-800 dark:text-gray-200"
                  >
                    {user.username}
                  </Link>
                </div>
                <div className="flex items-center">
                  <TomiLogo className="h-5 w-5 mr-2 text-[#eb5628]" />
                  <span className="font-semibold text-base text-gray-600 dark:text-gray-400">
                    {user.profile.points}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  )
}

export default TopUsersBlock
