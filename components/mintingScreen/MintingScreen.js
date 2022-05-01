import { Backlight } from '../backlight/Backlight'
import classes from './mintingScreen.module.scss'

export function MintingScreen({ data }) {
  return (
    <Backlight>
      <div className={classes.table}>
        <div className={classes.row}>
          <div className={classes.cell}>table head</div>
          <div className={classes.cell}>table head2</div>
          <div className={classes.cell}>table head3</div>
        </div>
        <div className={classes.row}>
          <div className={classes.cell}>table cell</div>
          <div className={classes.cell}>table cell2</div>
          <div className={classes.cell}>table cell3</div>
        </div>
      </div>
    </Backlight>
  )
}
