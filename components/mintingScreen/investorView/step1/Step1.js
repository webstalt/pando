import classnames from 'classnames'
import { ConnectWalletButton } from '../../../connectWalletButton/ConnectWalletButton'
import { Button, Variants } from '../../../button/Button'

import classes from './step1.module.scss'

export function Step1({
  isWalletConnected,
  forwardStep,
  forwardToCheckOffers,
}) {
  return (
    <>
      <h3 className={classes.stepTitle}>Select NFT royalty stream to buy</h3>

      <div className={classes.table}>
        <div className={classes.row}>
          <div className={classnames(classes.cell, classes.th)}>Bidder</div>
          <div className={classnames(classes.cell, classes.th)}>Bid price</div>
          <div className={classnames(classes.cell, classes.th)}>List date</div>
          <div className={classnames(classes.cell, classes.th)}></div>
        </div>
        <div
          className={classes.row}
          onClick={isWalletConnected ? forwardStep : () => {}}
        >
          <div className={classes.cell}>
            <img
              className={classes.preview}
              src="https://lh3.googleusercontent.com/lhIMUd5XQeJ49qKbgXXOhbEHRXp4uZba-Q0mOGoDpIehIaEkB0mp8ES-AQmto3wigq0Riiwy4DDV-EzDWQyTwTC6sBzrq5hx23J8=w600"
            />
            Aotearoa Dreaming
          </div>
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
