import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Web3 from 'web3'

import {
  setIsWalletConnected,
  setWalletAddress,
  setVmContract,
  setEscrowVMContract,
  setChainlinkVMContract,
} from '../../app/user/userSlice'
import mintNFTContract from '../../blockchain/contract.js'
import escrowContract from '../../blockchain/escrowContract.js'
import chainlinkContract from '../../blockchain/chainlink_pricefeeds.js'
import { Button } from '../button/Button'

export function ConnectWalletButton() {
  const [web3, setWeb3] = useState({})
  const address = useSelector((state) => state.user.walletAddress)
  const vmContract = useSelector((state) => state.user.vmContract)
  const escrowVMContract = useSelector((state) => state.user.escrowVMContract)
  const chainLinkVMContract = useSelector((state) => state.user.chainLinkVMContract)

  const isWalletConnected = useSelector((state) => state.user.isWalletConnected)
  const [switchNetwork, setSwitchNetwork] = useState(true)
  const dispatch = useDispatch()

  //Run these functions if either address or vmContract changes.
  useEffect(() => {
    if (vmContract && address) dispatch(setIsWalletConnected(true))
  }, [vmContract, address])

  const connectWalletHandler = async () => {
    console.log('connectWalletHandler Called')
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
    ) {
      console.log('MetaMask Detected')
      try {
        await window.web3.currentProvider.enable()
        web3 = new Web3(window.ethereum)
        setWeb3(web3)

        const accounts = await web3.eth.getAccounts() //Get list of accounts associated with the wallet
        dispatch(setWalletAddress(accounts[0]))

        const vm = mintNFTContract(web3)
        const vm1 = escrowContract(web3)
        const vm2 = chainlinkContract(web3)

        dispatch(setVmContract(vm))
        dispatch(setEscrowVMContract(vm1))
        dispatch(setChainlinkVMContract(vm2))
        
        if (window.ethereum.networkVersion == '4') {
          //TODO: Change chain ID, currently set to Ropsten Test network
          console.log(
            'window.ethereum.networkVersion',
            window.ethereum.networkVersion
          )
          setSwitchNetwork(false)
        } else {
          console.log(
            'ERROR: Initial window.ethereum.networkVersion:',
            window.ethereum.networkVersion
          )
          setSwitchNetwork(true)
        }
      } catch (err) {
        console.log(err.message)
      }
    } else {
      alert('Please Install The Metamask Wallet')
    }
  }

  //Event listener for address changes
  const addressChangedListener = async () => {
    window.ethereum.on('accountsChanged', (accounts) => {
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
      dispatch(setWalletAddress(accounts[0]))
      console.log('Account changed to:', accounts[0])
      //Check if a user has disconnected all addresses from the website
      if (accounts[0] == null) {
        dispatch(setIsWalletConnected(false))
        console.log('User disconnected all addresses')
      }
    })
  }

  //Event listener for chainId changes
  const chainChangedListener = async () => {
    console.log('chainChangedListener Called: ', window.ethereum.networkVersion)

    ethereum.on('chainChanged', (chainId) => {
      console.log('Inner chain:', chainId)
      if (chainId != '0x4') {
        //TODO: Change before deployment
        setSwitchNetwork(true)
        console.log('setting Switch Network to True')
      } else {
        setSwitchNetwork(false)
        console.log('setting Switch Network to False')
      }
    })
  }

  //Handle the change of network
  const switchNetworkHandler = async () => {
    try {
      const result = await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x4' }], //TODO: Change before deployment
      })
      if (result == null) {
        //console.log("Network Set to Ropsten") //TODO: Change before deployment
        setSwitchNetwork(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  //Copy user address to clipboard
  function copyAddressToClipboard() {
    navigator.clipboard.writeText(address)
    console.log('User address copied to clipboard')
  }

  const connectWalletButtonClickHandler = async () => {
    await connectWalletHandler()
    await addressChangedListener()
    await chainChangedListener()
  }

  return !isWalletConnected ? (
    <Button
      onClick={connectWalletButtonClickHandler}
      className="button_connect"
    >
      Connect Wallet
    </Button>
  ) : (
    <div className="button_connect_switched">
      {switchNetwork ? (
        <Button className="button_network" onClick={switchNetworkHandler}>
          Switch Network
        </Button>
      ) : (
        <Button onClick={copyAddressToClipboard} className="button_address">
          {address
            .substring(0, 5)
            .concat('...')
            .concat(address.substring(38, 43))}
        </Button>
      )}
    </div>
  )
}
