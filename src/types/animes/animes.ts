import { AnimeType } from "../Shikimori/Responses/Types/Anime.type"

export interface Pagination {
  totalCount: number
  totalPages: number
  currentPage: number
}

export interface ListResponse {
  list: AnimeType[]
  totalCount: number
  totalPages: number
  currentPage: number
}