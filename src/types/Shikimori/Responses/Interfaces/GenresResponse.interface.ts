import { GenreType } from '../Types/Genre.type'

export interface GenresResponseInterface {
  data: {
    data: {
      animes: GenreType[]
    }
  }
}
