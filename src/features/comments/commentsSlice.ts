import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import API from '../../api/config'
import { Comment } from '../../types/comments'

interface CommentsState {
  loaded: Comment[]
  status: 'idle' | 'loading' | 'success' | 'failed'
  createStatus: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: CommentsState = {
  loaded: [],
  status: 'idle',
  createStatus: 'idle'
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments(state) {
      state.loaded = []
      state.status = 'idle'
      state.createStatus = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        getComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loaded = action.payload
          state.status = 'success'
        }
      )
      .addCase(getComments.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(createComment.pending, (state) => {
        state.createStatus = 'loading'
      })
      .addCase(createComment.fulfilled, (state) => {
        state.createStatus = 'success'
      })
      .addCase(createComment.rejected, (state) => {
        state.createStatus = 'failed'
      })
      .addCase(
        likeComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          const index = state.loaded.findIndex(
            (comment) => comment._id === action.payload._id
          )
          if (index !== -1) {
            state.loaded[index] = action.payload // Обновляем комментарий в массиве loaded
          }
        }
      )
  }
})

export const getComments = createAsyncThunk<
  Comment[],
  { animeId: string; limit: number; offset: number }
>('comments/getComments', async (params) => {
  const response = await API.request(`comments/list/${params.animeId}`, 'GET')

  return response.comments
})

export const createComment = createAsyncThunk<
  Comment[],
  {
    userId: string
    animeId: string
    text: string
    replyCommentId: string | null
    parentCommentId: string | null
  }
>('comments/createComment', async (params) => {
  const response = await API.request(`comments/add`, 'POST', params)
  return response.comments
})

export const likeComment = createAsyncThunk<
  Comment,
  {
    userId: string
    commentId: string
  }
>('comments/likeComment', async (params) => {
  const response = await API.request(`comments/like`, 'POST', params)
  return response.comment
})

export const selectComments = (state: RootState) => state.comments.loaded
export const selectCommentsStatus = (state: RootState) => state.comments.status
export const selectCreateCommentStatus = (state: RootState) =>
  state.comments.createStatus

export default commentsSlice.reducer
