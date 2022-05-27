import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Logo } from '../logo/Logo'
import { ConnectWalletButton } from '../connectWalletButton/ConnectWalletButton'
import { requestConversion } from '../../app/user/userSlice'

import classes from './header.module.scss'



export function Header() {
  const isWalletConnected = useSelector((state) => state.user.isWalletConnected)
  const dispatch = useDispatch()
  useEffect(() => {
    if(isWalletConnected){
      
      const result = dispatch(requestConversion())
      console.log(result)
      //console.log( (parseInt(result.payload.resultEthUsd) / 1e8).toFixed(2) )
      //console.log( (parseInt(result.payload.resultBtcUsd) / 1e8).toFixed(2) )
      //console.log( (parseInt(result.payload.resultEurUsd) / 1e8).toFixed(2) )
      //conversion.eth = ( (parseInt(result.payload.resultEthUsd) / 1e8).toFixed(2) )
    }

    

  }, [isWalletConnected])
  const conversion = useSelector((state) => state.user.conversion)


  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <Logo />
      </div>
      <div className={classes.navigation}>
        {conversion && (
          <div className={classes.currenciesWrapper}>
            <div className={classes.headerRow}>
              <div className={classes.cell}>ETH/USD</div>
              <div className={classes.cell}>BTC/USD</div>
              <div className={classes.cell}>EUR/USD</div>
            </div>
            <div className={classes.row}>
              <div className={classes.cell}>{conversion.eth}</div>
              <div className={classes.cell}>{conversion.btc}</div>
              <div className={classes.cell}>{conversion.eur}</div>
            </div>
          </div>
        )}
        <ConnectWalletButton />
      </div>
    </div>
  )
}
