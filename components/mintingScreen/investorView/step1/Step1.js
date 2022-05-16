import { ConnectWalletButton } from '../../../connectWalletButton/ConnectWalletButton'
import { Button } from '../../../button/Button'

import classes from './step1.module.scss'

export function Step1({ isWalletConnected, forwardToCheckOffers }) {
  return (
    <>
      <h3 className={classes.stepTitle}>Select NFT royalty stream to buy</h3>
      <ConnectWalletButton />
    </>
  )
}
