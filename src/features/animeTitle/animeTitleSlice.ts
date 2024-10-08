import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { AnimeType } from '../../types/Shikimori/Responses/Types/Anime.type'
import API from '../../api/config'

export interface AnimeTitleState {
  title: AnimeType | null
  franchise: AnimeType[] | []
  status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: AnimeTitleState = {
  title: null,
  franchise: [],
  status: 'idle'
}

export const fetchAnimeTitle = createAsyncThunk(
  'animes/fetchAnimeTitle',
  async (id: string) => {
    // Отправляем запрос
    const response = await API.request(`animes/${id}`, 'GET')
    return response
  }
)

export const fetchAnimeFranchise = createAsyncThunk(
  'animes/fetchAnimeFranchise',
  async (franchise: string) => {
    const paramsQuery = new URLSearchParams({
      franchise: franchise,
      filter: 'id,name,russian,japanese,licenseNameRu'
    }).toString()

    // Отправляем запрос
    const response = await API.request(`animes/franchise?${paramsQuery}`, 'GET')
    return response.reverse()
  }
)

export const animeTitleSlice = createSlice({
  name: 'animeTitle',
  initialState,
  reducers: {
    resetAnimeTitleState: (state) => {
      state.title = null
      state.franchise = []
      state.status = 'idle'
    },
    updateRating: (state, action: PayloadAction<{ anime: AnimeType }>) => {
      state.title = action.payload.anime
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeTitle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchAnimeTitle.fulfilled,
        (state, action: PayloadAction<AnimeType>) => {
          state.title = action.payload
          state.status = 'success'
        }
      )
      .addCase(fetchAnimeTitle.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(fetchAnimeFranchise.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchAnimeFranchise.fulfilled,
        (state, action: PayloadAction<AnimeType[]>) => {
          state.franchise = action.payload
          state.status = 'success'
        }
      )
      .addCase(fetchAnimeFranchise.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export const { resetAnimeTitleState } = animeTitleSlice.actions

export const selectAnimeTitle = (state: RootState) => state.animeTitle.title
export const selectAnimeFranchise = (state: RootState) =>
  state.animeTitle.franchise
export const selectAnimeTitleStatus = (state: RootState) =>
  state.animeTitle.status

export default animeTitleSlice.reducer
