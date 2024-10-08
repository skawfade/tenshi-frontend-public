import { AnimeType } from '../Types/Anime.type'

export interface AnimesResponseInterface {
  data: {
    animes: AnimeType[]
  }
}
