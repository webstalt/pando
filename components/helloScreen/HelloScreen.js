import ScrollAnimation from 'react-animate-on-scroll'
import { Button } from '../button/Button'

import classes from './helloScreen.module.scss'

export function HelloScreen() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.description}>
          Unlock value from your smart contracts
        </div>
        <div className={classes.description2}>
          Smart contracts are changing the world.
          <br />
          Pando Finance turns your future smart contract revenue into a
          tradeable asset.
          <br />
          Our marketplace allows projects to
          <span className={classes.highlight}>
            {' '}
            sell specific periods of future revenue to investors
          </span>
          .
          <br />
          <br />
          Raise capital, reduce risk, and form partnerships without having to
          sell equity.
        </div>
      </div>
      <div className={classes.buttons}>
        <Button title="For companies">Sell Revenue Stream</Button>
        <Button title="For investors">Buy Revenue Stream</Button>
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
