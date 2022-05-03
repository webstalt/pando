import { createSlice } from '@reduxjs/toolkit'

export const Roles = {
  SELLER: 'seller',
  INVESTOR: 'investor',
}

const initialState = {
  isWalletConnected: false,
  role: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setIsWalletConnected: (state, action) => {
      state.isWalletConnected = action.payload
    },
    setRole: (state, action) => {
      state.role = action.payload
    },
  },
})

export const { setIsWalletConnected, setRole } = userSlice.actions
export default userSlice.reducer
