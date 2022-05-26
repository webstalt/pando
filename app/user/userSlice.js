import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { pinJSONToIPFS } from '../pinata.js'

import Web3 from 'web3'

const mintNftAction = createAction('mintNftAction')
const escrowCreateAction = createAction('escrowCreateAction')
const escrowConfirmPaymentAction = createAction('escrowConfirmPaymentAction')
const escrowConfirmDeliveryAction = createAction('escrowConfirmDeliveryAction')
const requestConversionAction = createAction('requestConversionAction')

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
  conversion: null,
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
      //console.log(gasPrice, ' gasPrice')

      const result = await state.user.vmContract.methods
        .mintNFT(state.user.walletAddress, tokenURI)
        .send({
          from: state.user.walletAddress,
          gasPrice: gasPrice,
        })
      console.log(result, 'mintNft thunk result')
      console.log('https://ropsten.etherscan.io/tx/' + result.transactionHash)
      return {
        name: state.user.preMintingData.name,
        price: state.user.preMintingData.price,
        image: state.user.preMintingData.nfturi,
        royalty: state.user.preMintingData.royalty,
        tokenId: result.events.Transfer.returnValues.tokenId,
      }
    } catch (err) {
      console.log(err, 'mintNft thunk error')
    }
  }
)

export const createEscrow = createAsyncThunk(
  escrowCreateAction,
  async ({}, { getState }) => {
    const state = getState()
    try {
      await window.web3.currentProvider.enable()
      const web3 = new Web3(window.ethereum)
      const gasPrice = await web3.eth.getGasPrice()
      gasPrice = parseInt(gasPrice)
      //console.log(gasPrice, ' gasPrice')

      const price = state.user.mintedNftData.price

      const result = await state.user.escrowVMContract.methods
        .createEscrow(
          '0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE',
          state.user.mintedNftData.tokenId,
          Web3.utils.toWei(String(price), 'ether')
        ) //NFT address(hard-coded is ok), NFT index, Price
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

export const confirmPaymentEscrow = createAsyncThunk(
  escrowConfirmPaymentAction,
  async ({}, { getState }) => {
    const state = getState()
    try {
      await window.web3.currentProvider.enable()
      const web3 = new Web3(window.ethereum)
      const gasPrice = await web3.eth.getGasPrice()
      gasPrice = parseInt(gasPrice)
      //console.log(gasPrice, ' gasPrice')

      const price = state.user.mintedNftData.price

      const result = await state.user.escrowVMContract.methods
        .confirmPayment(
          '0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE',
          state.user.mintedNftData.tokenId
          //
        ) //NFT address(hard-coded is ok), NFT index, Price
        .send({
          from: state.user.walletAddress,
          gasPrice: gasPrice,
          value: Web3.utils.toWei(String(price), 'ether'),
        })

      console.log(result, 'Confirm payment for escrow')
      const transactionLink =
        'https://ropsten.etherscan.io/tx/' + result.transactionHash
      console.log(transactionLink)
      alert('Transaction Successful: ' + transactionLink)
      return result
    } catch (err) {
      console.log(err, 'confirmPaymentEscrow error')
    }
  }
)

export const confirmDeliveryEscrow = createAsyncThunk(
  escrowConfirmDeliveryAction,
  async ({}, { getState }) => {
    const state = getState()
    try {
      await window.web3.currentProvider.enable()
      const web3 = new Web3(window.ethereum)
      const gasPrice = await web3.eth.getGasPrice()
      gasPrice = parseInt(gasPrice)
      //console.log(gasPrice, ' gasPrice')

      const result = await state.user.escrowVMContract.methods
        .confirmDelivery(
          '0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE',
          state.user.mintedNftData.tokenId
          //
        ) //NFT address(hard-coded is ok), NFT index, Price
        .send({
          from: state.user.walletAddress,
          gasPrice: gasPrice,
        })

      console.log(result, 'Confirm delivery from escrow')
      const transactionLink =
        'https://ropsten.etherscan.io/tx/' + result.transactionHash
      console.log(transactionLink)
      alert('Transaction Successful: ' + transactionLink)
      return result
    } catch (err) {
      console.log(err, 'confirmDeliveryEscrow error')
    }
  }
)

export const requestConversion = createAsyncThunk(
  requestConversionAction,
  async ({}, { getState }) => {
    //make requests here (with fetch)
    // try {
    // ;(function () {
    const result = {
      eth: '1.839,51',
      btc: '29.551,10',
      eur: '1,07',
    } // a mock
    return {
      eth: result.eth,
      btc: result.btc,
      eur: result.eur,
    }
    // })()
    // } catch (err) {
    //   console.log(err, 'requestConversion error')
    // }
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
    builder
      .addCase(mintNft.fulfilled, (state, action) => {
        state.mintedNftData = action.payload
        state.preMintingData = {
          name: null,
          price: null,
          royalty: null,
          nfturi: null,
        }
      })
      .addCase(requestConversion.fulfilled, (state, action) => {
        state.conversion = { ...action.payload }
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
