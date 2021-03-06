import ScrollAnimation from 'react-animate-on-scroll'
import { useDispatch } from 'react-redux'
import { Button } from '../button/Button'
import { Roles, setRole } from '../../app/user/userSlice'

import classes from './helloScreen.module.scss'

export function HelloScreen({ executeScroll }) {
  const dispatch = useDispatch()

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <ScrollAnimation initiallyVisible={true} animateIn="pulse">
          <div className={classes.description}>
            Unlock value from your smart contracts
          </div>
        </ScrollAnimation>
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
        <Button
          title="For companies"
          onClick={() => {
            dispatch(setRole(Roles.SELLER))
            executeScroll()
          }}
        >
          Sell Revenue Stream
        </Button>
        <Button
          title="For investors"
          onClick={() => {
            dispatch(setRole(Roles.INVESTOR))
            executeScroll()
          }}
        >
          Buy Revenue Stream
        </Button>
      </div>
    </div>
  )
}
