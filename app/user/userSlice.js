import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { pinJSONToIPFS } from '../pinata.js'

import Web3 from 'web3'

const mintNftAction = createAction('mintNftAction')
const escrowAction = createAction('escrowAction')

export const Roles = {
  SELLER: 'seller',
  INVESTOR: 'investor',
}

const initialState = {
  isWalletConnected: false,
  role: null,
  walletAddress: null,
  mintedNftData: null,
  preMintingData: {
    name: null,
    price: null,
    royalty: null,
    nfturi: null,
  },
}


export const mintNft = createAsyncThunk(
  mintNftAction,
  async ({}, { getState }) => {
    const state = getState()
    const metadata = new Object()
    metadata.name = 'RoyaltyNFT1 ' + state.user.preMintingData.name
    metadata.image = state.user.preMintingData.nfturi
    metadata.royalty = state.user.preMintingData.royalty
    metadata.price = state.user.preMintingData.price

    const pinataResponse = await pinJSONToIPFS(metadata)
    if (!pinataResponse.success) {
      return {
        success: false,
        status: '😢 Something went wrong while uploading your tokenURI.',
      }
    }
    const tokenURI = pinataResponse.pinataUrl
    console.log(tokenURI, ' tokenURI')
    console.log(state.user.walletAddress, 'address')
    // Make call to smart contract to mint NFT
    try {
      await window.web3.currentProvider.enable()
      const web3 = new Web3(window.ethereum)
      const gasPrice = await web3.eth.getGasPrice()
      gasPrice = parseInt(gasPrice)
      console.log(gasPrice, ' gasPrice')

      const result = await state.user.vmContract.methods
        .mintNFT(state.user.walletAddress, tokenURI)
        .send({
          from: state.user.walletAddress,
          gasPrice: gasPrice,
        })
      console.log(result, 'mintNft thunk result')
      console.log('https://ropsten.etherscan.io/tx/' + result.transactionHash)
      return result
      //result.events.Transfer.returnValues.tokenID
    } catch (err) {
      console.log(err, 'mintNft thunk error')
    }
  }
)

export const createEscrow = createAsyncThunk(
  escrowAction,
  async ({}, { getState }) => {
    const state = getState()
    try {
      await window.web3.currentProvider.enable()
      const web3 = new Web3(window.ethereum)
      const gasPrice = await web3.eth.getGasPrice()
      gasPrice = parseInt(gasPrice)
      console.log(gasPrice, ' gasPrice')

      const result = await state.user.escrowVMContract.methods
        .createEscrow("0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE", 1, 1) //NFT address(hard-coded is ok), TODO: NFT index, TODO: Price
        .send({
          from: state.user.walletAddress,
          gasPrice: gasPrice,
        })
      console.log(result, 'createEscrow')
      console.log('https://ropsten.etherscan.io/tx/' + result.transactionHash)
      return result
    } catch (err) {
      console.log(err, 'createEscrow error')
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
    setEscrowVMContract: (state, action) => {
      state.escrowVMContract = action.payload
    },
    setRole: (state, action) => {
      state.role = action.payload
    },
    setPreMintingName: (state, action) => {
      state.preMintingData.name = action.payload
    },
    setPreMintingPrice: (state, action) => {
      state.preMintingData.price = action.payload
    },
    setPreMintingRoyalty: (state, action) => {
      state.preMintingData.royalty = action.payload
    },
    setPreMintingURI: (state, action) => {
      state.preMintingData.nfturi = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(mintNft.fulfilled, (state, action) => {
      state.mintedNftData = action.payload
      state.preMintingData = {
        name: null,
        price: null,
        royalty: null,
        nfturi: null,
      }
    })
  },
})

export const {
  setIsWalletConnected,
  setRole,
  setWalletAddress,
  setVmContract,
  setEscrowVMContract,
  setPreMintingName,
  setPreMintingPrice,
  setPreMintingRoyalty,
  setPreMintingURI,
} = userSlice.actions
export default userSlice.reducer
