export interface User {
  _id: string
  username: string
  email: string
  active: boolean
  profile: Profile
  __v: number
}

export interface Profile {
  avatar: string
  level: number // Уровень пользователя
  experience: number // Очки опыта
  badges: number[] // Массив значков
  achievements: number[] // Массив ачивок
  stats: {
    totalWatchedAnime: number // Количество просмотренных аниме
    totalWatchedEpisodes: number // Количество просмотренных эпизодов
    hoursWatched: number // Время, проведенное за просмотром аниме
    favoriteGenres: string[] // Любимые жанры пользователя
  }
  points: number
  ratedAnimes: [
    {
      animeId: string
      rating: number
    }
  ]
}
