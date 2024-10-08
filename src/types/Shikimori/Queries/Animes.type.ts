import { OrderType } from './Order.type'
import { StatusType } from '../General/Status.type'

export type AnimesType = {
  ids?: string
  search?: string
  limit?: number
  genre?: string
  status?: StatusType | string
  studio?: string | null
  year?: string
  order?: OrderType | string | null
  page?: number
  kind?: string
  season?: string
  score?: string
  durations?: string
  rating?: string
  censored?: boolean
  franchise?: string
  filter?: string
}
