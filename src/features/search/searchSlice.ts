import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { AnimeType } from '../../types/Shikimori/Responses/Types/Anime.type'
import { AnimesType } from '../../types/Shikimori/Queries/Animes.type'
import API from '../../api/config'

export interface SearchState {
  list: AnimeType[]
  status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: SearchState = {
  list: [],
  status: 'idle'
}

export const fetchAnimeSearch = createAsyncThunk(
  'animes/fetchAnimeSearch',
  async (params: AnimesType) => {
    const paramsQuery = new URLSearchParams({
      query: params.search || '',
      filter:
        'id,name,russian,japanese,status,score,genres,poster,episodes,episodesAired,updatedAt,releasedOn,airedOn'
    }).toString()

    if (params.search) {
      const response = await API.request(`animes/search?${paramsQuery}`, 'GET')
      return response.list
    } else {
      return []
    }
  }
)

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetState: () => {
      // Очищаем состояние, возвращая его к начальному
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeSearch.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchAnimeSearch.fulfilled,
        (state, action: PayloadAction<AnimeType[]>) => {
          state.list = action.payload
          state.status = 'success'
        }
      )
      .addCase(fetchAnimeSearch.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export const { resetState } = searchSlice.actions

export const selectAnimeSearchList = (state: RootState) => state.search.list
export const selectAnimeSearchStatus = (state: RootState) => state.search.status

export default searchSlice.reducer
