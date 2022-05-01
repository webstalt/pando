import ScrollAnimation from 'react-animate-on-scroll'
import { Button } from '../button/Button'

import classes from './helloScreen.module.scss'

export function HelloScreen() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        {/* <h1 className={classes.heading}>Pando Finance</h1> */}
        <div className={classes.description}>
          Enabling trade in a trustless economy
        </div>
        <div className={classes.description2}>
          Unlock the value in your smart contracts
        </div>
        <div className={classes.description2}>
          Fast, flexible, non-dilutive capital
        </div>
      </div>
      <div className={classes.buttons}>
        <Button>Mint now</Button>
        <Button>Start earning</Button>
      </div>
      <ScrollAnimation
        initiallyVisible={true}
        animatePreScroll={true}
        animateIn="fadeInUp"
        animateOnce={false}
        duration={1.5}
      ></ScrollAnimation>
    </div>
  )
}
