import classnames from 'classnames'
import { ConnectWalletButton } from '../../../connectWalletButton/ConnectWalletButton'
import { Button, Variants } from '../../../button/Button'

import classes from './step1.module.scss'

export function Step1({ isWalletConnected, forwardToCheckOffers }) {
  return (
    <>
      <h3 className={classes.stepTitle}>Select NFT royalty stream to buy</h3>

      <div className={classes.table}>
        <div className={classes.row}>
          <div className={classnames(classes.cell, classes.th)}>bidder</div>
          <div className={classnames(classes.cell, classes.th)}>bid price</div>
          <div className={classnames(classes.cell, classes.th)}>bid date</div>
          <div className={classnames(classes.cell, classes.th)}></div>
        </div>
        <div className={classes.row}>
          <div className={classes.cell}>name</div>
          <div className={classes.cell}>$350</div>
          <div className={classes.cell}>12/11/2022</div>
          <div className={classes.cell}></div>
        </div>
      </div>

      {!isWalletConnected && <ConnectWalletButton />}

      <h3 className={classes.checkOffersTitle}>
        Already chosen NFT royalty stream?
      </h3>
      <div>
        <Button
          onClick={forwardToCheckOffers}
          disabled={!isWalletConnected}
          type="submit"
          variant={Variants.PRIMARY}
        >
          Check offers
        </Button>
        {!isWalletConnected && (
          <span className={classes.hint}>
            ?<span className={classes.hintContent}>Connect Wallet first</span>
          </span>
        )}
      </div>
    </>
  )
}
