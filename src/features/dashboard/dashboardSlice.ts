import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { AnimeType } from '../../types/Shikimori/Responses/Types/Anime.type'
import API from '../../api/config'

export interface DashboardState {
  trendingList: AnimeType[]
  trendingListStatus: 'idle' | 'loading' | 'success' | 'failed'

  popularityList: AnimeType[]
  popularityListStatus: 'idle' | 'loading' | 'success' | 'failed'

  anonsList: AnimeType[]
  anonsListStatus: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: DashboardState = {
  trendingList: [],
  trendingListStatus: 'idle',
  popularityList: [],
  popularityListStatus: 'idle',
  anonsList: [],
  anonsListStatus: 'idle'
}

export const fetchTrendingAnime = createAsyncThunk(
  'dashboard/fetchTrendingAnime',
  async () => {
    const paramsQuery = new URLSearchParams({
      limit: '5',
      status: 'ongoing',
      order: 'popularity',
      years: '2024',
      filter:
        'id,name,russian,japanese,licenseNameRu,score,poster,genres,screenshots,views'
    }).toString()

    const response = await API.request(`animes/list?${paramsQuery}`, 'GET')

    return response.list
  }
)

export const fetchPopularityAnime = createAsyncThunk(
  'dashboard/fetchPopularityAnime',
  async () => {
    const paramsQuery = new URLSearchParams({
      limit: '5',
      status: 'ongoing,released',
      order: 'popularity',
      filter: 'id,name,russian,japanese,licenseNameRu,score,poster'
    }).toString()

    const response = await API.request(`animes/list?${paramsQuery}`, 'GET')

    return response.list
  }
)

export const fetchAnonsAnime = createAsyncThunk(
  'dashboard/fetchAnonsAnime',
  async () => {
    const paramsQuery = new URLSearchParams({
      limit: '5',
      status: 'anons',
      page: '1',
      filter: 'id,name,russian,japanese,licenseNameRu,poster,updatedAt'
    }).toString()

    const response = await API.request(`animes/list?${paramsQuery}`, 'GET')

    return response.list
  }
)

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingAnime.pending, (state) => {
        state.trendingListStatus = 'loading'
      })
      .addCase(
        fetchTrendingAnime.fulfilled,
        (state, action: PayloadAction<AnimeType[]>) => {
          state.trendingList = action.payload
          state.trendingListStatus = 'success'
        }
      )
      .addCase(fetchTrendingAnime.rejected, (state) => {
        state.trendingListStatus = 'failed'
      })
      .addCase(fetchPopularityAnime.pending, (state) => {
        state.popularityListStatus = 'loading'
      })
      .addCase(
        fetchPopularityAnime.fulfilled,
        (state, action: PayloadAction<AnimeType[]>) => {
          state.popularityList = action.payload
          state.popularityListStatus = 'success'
        }
      )
      .addCase(fetchPopularityAnime.rejected, (state) => {
        state.popularityListStatus = 'failed'
      })
      .addCase(fetchAnonsAnime.pending, (state) => {
        state.anonsListStatus = 'loading'
      })
      .addCase(
        fetchAnonsAnime.fulfilled,
        (state, action: PayloadAction<AnimeType[]>) => {
          state.anonsList = action.payload
          state.anonsListStatus = 'success'
        }
      )
      .addCase(fetchAnonsAnime.rejected, (state) => {
        state.anonsListStatus = 'failed'
      })
  }
})

export const selectDashboardTrendingList = (state: RootState) =>
  state.dashboard.trendingList
export const selectDashboardTrendingListStatus = (state: RootState) =>
  state.dashboard.trendingListStatus

export const selectDashboardPopularityList = (state: RootState) =>
  state.dashboard.popularityList
export const selectDashboardPopularityListStatus = (state: RootState) =>
  state.dashboard.popularityListStatus

export const selectDashboardAnonsList = (state: RootState) =>
  state.dashboard.anonsList
export const selectDashboardAnonsListStatus = (state: RootState) =>
  state.dashboard.anonsListStatus

export default dashboardSlice.reducer
