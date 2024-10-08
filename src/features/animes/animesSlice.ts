import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { AnimeType } from '../../types/Shikimori/Responses/Types/Anime.type'
import { AnimesType } from '../../types/Shikimori/Queries/Animes.type'
import API from '../../api/config'
import { ListResponse, Pagination } from '../../types/animes/animes'
import { GenreType } from '../../types/Shikimori/Responses/Types/Genre.type'

export interface AnimesState {
  list: AnimeType[]
  pagination: Pagination | null
  genres: GenreType[]
  status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: AnimesState = {
  list: [],
  pagination: null,
  genres: [],
  status: 'idle'
}

export const fetchAnime = createAsyncThunk(
  'animes/fetchAnime',
  async (params: AnimesType) => {
    // Преобразуем параметры в строку запроса
    const paramsQuery = new URLSearchParams({
      limit: String(params.limit || 15),
      order: params.order || 'popularity',
      filter: params.filter || '',
      ids: params.ids || '',
      page: String(params.page || 1),
      ...(params.genre && { genres: params.genre }),
      ...(params.year && { years: params.year }),
      ...(params.status && { status: params.status }),
      ...(params.kind && { kind: params.kind })
    }).toString()

    // Отправляем запрос
    const response = await API.request(`animes/list?${paramsQuery}`, 'GET')

    return response
  }
)

export const fetchGenres = createAsyncThunk('animes/fetchGenres', async () => {
  // Отправляем запрос
  const response = await API.request('animes/genres', 'GET')

  return response.genres
})

export const animesSlice = createSlice({
  name: 'animes',
  initialState,
  reducers: {
    resetState: () => {
      // Очищаем состояние, возвращая его к начальному
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnime.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchAnime.fulfilled,
        (state, action: PayloadAction<ListResponse>) => {
          const pagination: Pagination = {
            totalCount: action.payload.totalCount,
            totalPages: action.payload.totalPages,
            currentPage: action.payload.currentPage
          }
          state.list = action.payload.list
          state.pagination = pagination
          state.status = 'success'
        }
      )
      .addCase(fetchAnime.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(
        fetchGenres.fulfilled,
        (state, action: PayloadAction<GenreType[]>) => {
          state.genres = action.payload
        }
      )
  }
})

export const { resetState } = animesSlice.actions

export const selectAnimeList = (state: RootState) => state.animes.list
export const selectAnimePagination = (state: RootState) =>
  state.animes.pagination
export const selectGenres = (state: RootState) => state.animes.genres

export const selectAnimeStatus = (state: RootState) => state.animes.status

export default animesSlice.reducer
