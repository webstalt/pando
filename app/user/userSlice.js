import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { pinJSONToIPFS } from '../pinata.js'

const mintNftAction = createAction('mintNft')

export const Roles = {
  SELLER: 'seller',
  INVESTOR: 'investor',
}

const initialState = {
  isWalletConnected: false,
  role: null,
  walletAddress: null,
  mintedNftData: null,
}

export const mintNft = createAsyncThunk(
  mintNftAction,
  async ({ name, price, royalty, vmContract }) => {
    const metadata = new Object()
    metadata.name = 'RoyaltyNFT1 ' + name
    metadata.image =
      'https://gateway.pinata.cloud/ipfs/QmcQSgUvy1hLtqioBXDe2g4c6hAtKUc1P2Ec8xixAh3E1Z' //TODO
    metadata.description = royalty

    const pinataResponse = await pinJSONToIPFS(metadata)
    if (!pinataResponse.success) {
      return {
        success: false,
        status: '😢 Something went wrong while uploading your tokenURI.',
      }
    }
    const tokenURI = pinataResponse.pinataUrl
    console.log(address)
    // Make call to smart contract to mint NFT
    try {
      const gasPrice = await web3.eth.getGasPrice()
      gasPrice = parseInt(gasPrice)

      const result = await vmContract.methods.mintNFT().send({
        from: address,
        gasPrice: gasPrice,
        recipient: address, //TODO: Possibly allow the user to change the recipient? Currently the recipient is the same as the minter.
        tokenURI: tokenURI,
      })
      console.log(result)
      return result
    } catch (err) {
      console.log(err)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setIsWalletConnected: (state, action) => {
      state.isWalletConnected = action.payload
    },
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload
    },
    setVmContract: (state, action) => {
      state.vmContract = action.payload
    },
    setRole: (state, action) => {
      state.role = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(mintNft.fulfilled, (state, action) => {
      state.mintedNftData = action.payload
    })
  },
})

export const {
  setIsWalletConnected,
  setRole,
  setWalletAddress,
  setVmContract,
} = userSlice.actions
export default userSlice.reducer
