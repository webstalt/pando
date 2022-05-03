import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isWalletConnected: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setIsWalletConnected: (state, action) => {
      state.isWalletConnected = action.payload
    },
  },
})

export const { setIsWalletConnected } = userSlice.actions
export default userSlice.reducer
