import { useSelector } from 'react-redux'
import 'react-step-progress-bar/styles.css'
import { ProgressBar, Step } from 'react-step-progress-bar'
import { useEffect, useState } from 'react'

import { Step1 } from './step1/Step1'
import { Step2 } from './step2/Step2'
import { Step3 } from './step3/Step3'
import classes from './investorView.module.scss'

const Steps = [0, 1, 2]

const PercentageOfStep = {
  [Steps[0]]: 0,
  [Steps[1]]: 50,
  [Steps[2]]: 100,
}

export function InvestorView() {
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
                Select NFT royalty stream to buy
              </div>
            )}
          </Step>

          <Step transition="scale" position={50}>
            {({ accomplished }) => (
              <div className={classes.stepName}>
                Submit offer for NFT royalty stream
              </div>
            )}
          </Step>

          <Step transition="scale" position={100}>
            {({ accomplished }) => (
              <div className={classes.stepName}>Seed funds</div>
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
    </>
  )
}
