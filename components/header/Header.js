import { StyledLink } from '../styledLink/StyledLink'

import classes from './header.module.scss'

import Web3 from 'web3'
import stakingContract from '../../blockchain/contract.js'
import { useState, useEffect } from 'react'




export function Header() {

/* ---------Web3--------- */
const [web3, setWeb3] = useState({})
const [address, setAddress] = useState({});
const [vmContract, setVmContract] = useState(null)
const [showConnect, setShowConnect] = useState(true);
const [switchNetwork, setSwitchNetwork] = useState(true);



/* ---------UseEffects--------- */
//Run these functions if either address or vmContract changes.
useEffect(() => {
  
  if (vmContract && address) setShowConnect(false)

}, [vmContract, address])


const connectWalletHandler = async () => {
  console.log("connectWalletHandler Called")
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      console.log("MetaMask Detected")
      try {
          await window.web3.currentProvider.enable();
          web3 = new Web3(window.ethereum)
          setWeb3(web3)
          //console.log("web3 set")

          const accounts = await web3.eth.getAccounts() //Get list of accounts associated with the wallet
          setAddress(accounts[0])
          //console.log("Account address set")

          const vm = stakingContract(web3)
          setVmContract(vm)

          
          if (window.ethereum.networkVersion == "4") { //TODO: Change chain ID, currently set to Rinkeby network
              console.log(window.ethereum.networkVersion, 'window.ethereum.networkVersion');
              setSwitchNetwork(false)

          }
          else {
              console.log('ERROR: Initial window.ethereum.networkVersion:', window.ethereum.networkVersion);
              setSwitchNetwork(true)

          }
      } catch (err) {
          console.log(err.message)
      }

  }
  else {
      alert("Please Install The Metamask Wallet")
  }

}

//Event listner for address changes
const addressChangedListener = async () => {
  window.ethereum.on('accountsChanged', (accounts) => {
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
      setAddress(accounts[0])
      console.log("Account changed to:", accounts[0])
      //Check if a user has disconnected all addresses from the website
      if(accounts[0] == null){
        setShowConnect(true)
        console.log("User disconnected all addresses")
      }
  });
}


//Event listener for chainId changes
const chainChangedListener = async () => {
    //console.log("chainChangedListener Called: ", window.ethereum.networkVersion)
    ethereum.on('chainChanged', (chainId) => {
        //console.log("Inner chain:", chainId)
        if (chainId != "0x4") {
            setSwitchNetwork(true)
            console.log("setting Switch Network to True")
            
        }
        else {
            setSwitchNetwork(false)
            console.log("setting Switch Network to False")
        }
    });
}

//Handle the change of network
const switchNetworkHandler = async () => {
  try {
      const result = await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x4' }], //TODO: Change before deployment
      })
      if (result == null) {
          //console.log("Network Set to Rinkeby") //TODO: Change before deployment
          setSwitchNetwork(false)
          
      }
  } catch (err) {
      console.log(err)
  }
}


  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <img
          src={
            'https://assets-global.website-files.com/5f6b7190899f41fb70882d08/5f760a499b56c47b8fa74fbb_chainlink-logo.svg'
          }
        ></img>
      </div>
      <div className={classes.navigation}>
        <StyledLink href="/" className={classes.navigationItem}>
          Main
        </StyledLink>
        <StyledLink href="/about">About</StyledLink>
        <StyledLink href="/contacts">Contacts</StyledLink>
        
        
        {showConnect ?
          <button onClick={function (event) { connectWalletHandler(); addressChangedListener(); chainChangedListener(); }}
              className="nav_button_connect">Connect Wallet
          </button> :

          <div className="nav_button_connect_switched">
              {switchNetwork ?
                  <button className="nav_button_network" onClick={switchNetworkHandler}>Switch Network</button> :

                  <button onClick={() => { copyToClipboardToast(); }}
                      className="nav_button_address">{address.substring(0, 5).concat("...").concat(address.substring(38, 43))}
                  </button>

              }

          </div>
        }
      </div>
    </div>
  )
}
