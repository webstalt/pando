import { useSelector } from 'react-redux'
import 'react-step-progress-bar/styles.css'
import { ProgressBar, Step } from 'react-step-progress-bar'
import { useEffect, useState } from 'react'

import { Step1 } from './step1/Step1'
import { Step2 } from './step2/Step2'
import { Step3 } from './step3/Step3'
import { Step4 } from './step4/Step4'
import { Step5 } from './step5/Step5'
import classes from './sellerView.module.scss'

//import { pinJSONToIPFS } from "./pinata.js";

//import { mintNFT } from '../../connectWalletButton/ConnectWalletButton'

//require('dotenv').config();
//const key = process.env.REACT_APP_PINATA_KEY;
//const secret = process.env.REACT_APP_PINATA_SECRET;

const Steps = [0, 1, 2, 3, 4]

const PercentageOfStep = {
  [Steps[0]]: 0,
  [Steps[1]]: 25,
  [Steps[2]]: 50,
  [Steps[3]]: 75,
  [Steps[4]]: 100,
}

export function SellerView() {
  const isWalletConnected = useSelector((state) => state.user.isWalletConnected)
  const [percentageComplete, setPercentageComplete] = useState(0)
  const [currentStep, setCurrentStep] = useState(Steps[0])

  useEffect(() => {
    setPercentageComplete(PercentageOfStep[currentStep])
  }, [currentStep])

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
      {currentStep === Steps[0] && (
        <Step1
          isWalletConnected={isWalletConnected}
          forwardToCheckOffers={() => setCurrentStep(Steps[3])}
        />
      )}
      {currentStep === Steps[1] && <Step2 />}
      {currentStep === Steps[2] && <Step3 />}
      {currentStep === Steps[3] && <Step4 />}
      {currentStep === Steps[4] && <Step5 />}
      <button
        className={classes.fakeButton}
        onClick={() => setCurrentStep(currentStep + 1)}
      >
        next step
      </button>
    </>
  )
}
