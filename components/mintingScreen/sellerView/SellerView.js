import { useSelector } from 'react-redux'

import 'react-step-progress-bar/styles.css'
import { ProgressBar, Step } from 'react-step-progress-bar'
import { useEffect, useState } from 'react'

import { Step1 } from './step1/Step1'
import classes from './sellerView.module.scss'

export function SellerView() {
  const isWalletConnected = useSelector((state) => state.user.isWalletConnected)
  const [percentageComplete, setPercentageComplete] = useState(0)
  const isNftFormSubmitted = false

  useEffect(() => {
    if (isNftFormSubmitted) {
      setPercentageComplete(25)
    }
  }, [isWalletConnected])

  return (
    <>
      <div className={classes.progressBar}>
        <ProgressBar
          width="90%"
          percent={percentageComplete}
          filledBackground="linear-gradient(to right, #66a3cd, mediumaquamarine)"
        >
          <Step transition="scale" position={0}>
            {({ accomplished }) => (
              <div className={classes.stepName}>
                Complete NFT information form
              </div>
            )}
          </Step>
          <Step transition="scale" position={25}>
            {({ accomplished }) => (
              <div className={classes.stepName}>Mint NFT</div>
            )}
          </Step>
          <Step transition="scale" position={50}>
            {({ accomplished }) => (
              <div className={classes.stepName}>List NFT royalty for sale</div>
            )}
          </Step>
          <Step transition="scale" position={76}>
            {({ accomplished }) => (
              <div className={classes.stepName}>Accept offer</div>
            )}
          </Step>
          <Step transition="scale" position={100}>
            {({ accomplished }) => (
              <div className={classes.stepName}>Receive funds</div>
            )}
          </Step>
        </ProgressBar>
      </div>
      {!isNftFormSubmitted && <Step1 isWalletConnected={isWalletConnected} />}
    </>
  )
}
