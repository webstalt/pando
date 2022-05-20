import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { pinJSONToIPFS } from '../pinata.js'

import Web3 from 'web3'

const mintNftAction = createAction('mintNftAction')

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

const address = '0x47C6B0C3528d9aDf6D442007F772c73bd85fC901'

export const mintNft = createAsyncThunk(
  mintNftAction,
  async ({ name, price, royalty, nfturi }, { getState }) => {
    const state = getState()
    const metadata = new Object()
    metadata.name = 'RoyaltyNFT1 ' + name
    metadata.image =
      'https://gateway.pinata.cloud/ipfs/QmcQSgUvy1hLtqioBXDe2g4c6hAtKUc1P2Ec8xixAh3E1Z' //TODO
    metadata.description = royalty
    metadata.key = 32342

    const pinataResponse = await pinJSONToIPFS(metadata)
    if (!pinataResponse.success) {
      return {
        success: false,
        status: '😢 Something went wrong while uploading your tokenURI.',
      }
    }
    const tokenURI = pinataResponse.pinataUrl
    console.log(tokenURI, ' tokenURI')
    console.log(state.walletAddress, 'address')
    // Make call to smart contract to mint NFT
    try {
      await window.web3.currentProvider.enable()
      const web3 = new Web3(window.ethereum)
      const gasPrice = await web3.eth.getGasPrice()
      gasPrice = parseInt(gasPrice)
      console.log(gasPrice, ' gasPrice')

      const result = await state.vmContract.methods
        .mintNFT(address, tokenURI)
        .send({
          from: state.walletAddress,
          gasPrice: gasPrice,
        })
      console.log(result, 'mintNft thunk result')
      return result
    } catch (err) {
      console.log(err, 'mintNft thunk error')
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
