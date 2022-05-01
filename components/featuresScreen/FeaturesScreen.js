import classes from './featuresScreen.module.scss'
import { Backlight } from '../backlight/Backlight'

export function FeaturesScreen() {
  const icon = (
    <svg
      className={classes.svg}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  )

  return (
    <Backlight>
      <div className={classes.content}>
        <div className={classes.block}>
          <h1 className={classes.heading}>
            {icon}
            Nice & easy
          </h1>
          <div className={classes.description}>
            Connect to Pando in just a few clicks to trade your future smart
            contract revenue. Receive the capital immediately. Keep building.
            Repeat.
          </div>
        </div>
        <div className={classes.block}>
          <h1 className={classes.heading}>
            {icon}
            Get in there
          </h1>
          <div className={classes.description}>
            Get the capital you need from investors and partners in a single
            step. No deck, no meetings, no presentations. The future of access
            to capital is now.
          </div>
        </div>
        <div className={classes.block}>
          <h1 className={classes.heading}>
            {icon}
            Stop. Selling. Equity
          </h1>
          <div className={classes.description}>
            You are growing and your equity value is growing faster. Selling
            equity to raise capital is the most expensive form of capital when
            you are a growing company (that’s why VCs love it). Pando finance
            gives projects a cheaper alternative.
          </div>
        </div>
        <div className={classes.block}>
          <h1 className={classes.heading}>
            {icon}
            Your choice
          </h1>
          <div className={classes.description}>
            You can choose to sell however much or however little based on your
            current capital needs. Need to extend your runway by a couple of
            months? Sure. Looking to raise enough to build out a 12-person team?
            No problem. You choose.
          </div>
        </div>
      </div>
    </Backlight>
  )
}
