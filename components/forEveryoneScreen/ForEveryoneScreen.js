import classes from './forEveryoneScreen.module.scss'
import { Backlight } from '../backlight/Backlight'

export function ForEveryoneScreen() {
  return (
    <Backlight>
      <div className={classes.content}>
        <h1 className={classes.heading}>
          Fast, flexible, non-dilutive capital
        </h1>
        <br />
        <div className={classes.description}>
          Smart contracts are changing the world. Pando turns your future smart
          contract revenue into a tradeable asset.
          <br />
          <br />
          Raise capital, reduce risk, and form partnerships without having to
          sell equity.
        </div>
      </div>
    </Backlight>
  )
}
