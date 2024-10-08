import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'
import API from '../../api/config'
import { User } from '../../types/user'
import { toast } from 'react-toastify'
import { getList } from '../list/listSlice'

interface UserState {
  user: User | null
  status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: UserState = {
  user: null,
  status: 'idle'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload
      state.status = 'success'
    },
    clearUser(state) {
      state.user = null
      state.status = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(me.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(me.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.user = action.payload
        state.status = 'success'
      })
      .addCase(me.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export const { setUser, clearUser } = userSlice.actions

export const logout = (): AppThunk => async (dispatch) => {
  return API.request(`auth/logout`, 'POST')
    .then(() => {
      dispatch(clearUser())
      window.location.replace('/')
    })
    .catch((error) => {
      console.log(error)
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const me = createAsyncThunk<any | null>(
  'user/me',
  async (_, { dispatch }) => {
    const data = await API.request(`auth/me`, 'GET') // Добавлено await
    if (data.user) {
      await dispatch(getList(data.user._id)) // Добавлено получение избранного
    }
    return data.user // Возвращаем данные
  }
)

export const saveProfileAvatar =
  (userId: string, avatar: File): AppThunk =>
  async (dispatch) => {
    const formData = new FormData()
    formData.append('avatar', avatar)
    formData.append('userId', userId)
    return API.request(`profile/updateAvatar`, 'POST', formData, null, {
      contentType: false,
      isFormDataBody: true
    })
      .then((data) => {
        if (data.status === 400) {
          toast(data.message, { type: 'error' })
        } else {
          dispatch(setUser(data.user))
        }
      })
      .catch((error) => {
        toast(error, { type: 'error' })
        console.log(error)
      })
  }

export const addExpToUser =
  (userId: string, experienceGained: number): AppThunk =>
  async () => {
    const payload = {
      userId,
      experienceGained
    }
    return API.request(`profile/addExp`, 'POST', payload)
      .then((data) => {
        if (data.status === 400) {
          toast(data.message, { type: 'error' })
        } else {
          if (data.leveledUp) {
            toast('Поздравляем, вы перешли на новый уровень', {
              type: 'success'
            })
          }
        }
      })
      .catch((error) => {
        toast(error, { type: 'error' })
        console.log(error)
      })
  }

export const deleteProfile =
  (userId: string): AppThunk =>
  async (dispatch) => {
    const payload = {
      userId
    }
    return API.request('auth/delete', 'POST', payload)
      .then((data) => {
        if (data.status === 400) {
          toast(data.message, { type: 'error' })
        } else {
          window.location.replace('/')
          dispatch(clearUser())
        }
      })
      .catch((error) => {
        toast(error, { type: 'error' })
        console.log(error)
      })
  }

export const selectUser = (state: RootState) => state.user.user
export const selectUserStatus = (state: RootState) => state.user.status

export default userSlice.reducer
