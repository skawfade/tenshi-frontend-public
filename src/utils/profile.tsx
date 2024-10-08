import BadgeNewbie from '../assets/badges/badge_1.svg?react'

import AchievementNewbie from '../assets/achievements/achievement_newbie.svg?react'

export function getBadgeProfileById(id: number) {
  switch (id) {
    case 1:
      return {
        icon: <BadgeNewbie className="h-6 w-6" />,
        name: 'Новичок'
      }

    default:
      break
  }
}

export function getAchievementProfileById(id: number) {
  switch (id) {
    case 1:
      return {
        icon: <AchievementNewbie className="h-9 w-9 dark:fill-white" />,
        name: 'За регистрацию на Tenshi'
      }

    default:
      break
  }
}
