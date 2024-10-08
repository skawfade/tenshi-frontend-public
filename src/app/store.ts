import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import animeReducer from '../features/animes/animesSlice'
import animeTitleReducer from '../features/animeTitle/animeTitleSlice'
import userReducer from '../features/user/userSlice'
import listReducer from '../features/list/listSlice'
import dashboardReducer from '../features/dashboard/dashboardSlice'
import searchReducer from '../features/search/searchSlice'
import commentsReducer from '../features/comments/commentsSlice'

export const store = configureStore({
  reducer: {
    animes: animeReducer,
    animeTitle: animeTitleReducer,
    user: userReducer,
    list: listReducer,
    dashboard: dashboardReducer,
    search: searchReducer,
    comments: commentsReducer,
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
