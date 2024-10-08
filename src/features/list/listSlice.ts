import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import API from '../../api/config'
import { RootState } from '../../app/store'
import { Lists } from '../../types/Lists'

interface ListState {
  list: Lists | null
  updateFavoriteStatus: 'idle' | 'loading' | 'success' | 'failed'
  updateListStatus: 'idle' | 'loading' | 'success' | 'failed'
  status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: ListState = {
  list: null,
  updateFavoriteStatus: 'idle',
  updateListStatus: 'idle',
  status: 'idle'
}

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        getList.fulfilled,
        (state, action: PayloadAction<Lists | null>) => {
          state.list = action.payload
          state.status = 'success'
        }
      )
      .addCase(getList.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(updateFavorite.pending, (state) => {
        state.updateFavoriteStatus = 'loading'
      })
      .addCase(
        updateFavorite.fulfilled,
        (state, action: PayloadAction<Lists | null>) => {
          state.list = action.payload
          state.updateFavoriteStatus = 'success'
        }
      )
      .addCase(updateFavorite.rejected, (state) => {
        state.updateFavoriteStatus = 'failed'
      })
      .addCase(updateList.pending, (state) => {
        state.updateListStatus = 'loading'
      })
      .addCase(
        updateList.fulfilled,
        (state, action: PayloadAction<Lists | null>) => {
          state.list = action.payload
          state.updateListStatus = 'success'
        }
      )
      .addCase(updateList.rejected, (state) => {
        state.updateListStatus = 'failed'
      })
  }
})

// Новый thunk для получения избранного
export const getList = createAsyncThunk<Lists | null, string>(
  'list/getList',
  async (userId) => {
    const response = await API.request(`list/${userId}`, 'GET')

    if (response.status === 404) {
      return null
    } else {
      const list = {
        favorites: response?.favorites,
        watched: response?.watched,
        watching: response?.watching,
        planned: response?.planned
      } as Lists

      return list
    }
  }
)

export const updateFavorite = createAsyncThunk<
  Lists | null,
  { userId: string; animeId: string }
>('list/updateFavorite', async ({ userId, animeId }) => {
  const payload = {
    animeId: animeId
  }

  const response = await API.request(
    `list/${userId}/favorites`,
    'POST',
    payload
  )
  const list = {
    favorites: response?.favorites,
    watched: response?.watched,
    watching: response?.watching,
    planned: response?.planned
  } as Lists

  return list
})

export const updateList = createAsyncThunk<
  Lists | null,
  { userId: string; animeId: string; listId: number }
>('list/updateList', async ({ userId, animeId, listId }) => {
  const payload = {
    animeId: animeId,
    listId: listId
  }

  const response = await API.request(
    `list/${userId}/updateList`,
    'POST',
    payload
  )
  const list = {
    favorites: response?.favorites,
    watched: response?.watched,
    watching: response?.watching,
    planned: response?.planned
  } as Lists

  return list
})

export const selectList = (state: RootState) => state.list.list
export const selectListStatus = (state: RootState) => state.list.status
export const selectListUpdateStatus = (state: RootState) =>
  state.list.updateListStatus

export default listSlice.reducer
