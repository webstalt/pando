import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../components/mintingScreen/sellerView/sellerSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  })
}

const store = makeStore()

export default store
