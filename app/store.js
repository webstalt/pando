import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../app/user/userSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

const store = makeStore()

export default store
