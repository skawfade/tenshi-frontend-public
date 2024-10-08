import { AnimeType } from '../Types/Anime.type'

export interface WrapperResponseInterface {
  data?: {
    animes: AnimeType[]
  }
}
