import classnames from 'classnames'
import { Button } from '../../../button/Button'

import classes from './step3.module.scss'

export function Step3({}) {
  return (
    <>
      <h3 className={classes.stepTitle}>Seed funds</h3>
      <div className={classes.table}>
        <div className={classes.row}>
          <div className={classnames(classes.cell, classes.th)}></div>
          <div className={classnames(classes.cell, classes.th)}>bid price</div>
          <div className={classnames(classes.cell, classes.th)}>bid date</div>
          <div className={classnames(classes.cell, classes.th)}>status</div>
        </div>
        <div className={classes.row}>
          <div className={classes.cell}>name</div>
          <div className={classes.cell}>$350</div>
          <div className={classes.cell}>12/11/2022</div>
          <div className={classes.cell}></div>
        </div>
        <div className={classes.row}>
          <div className={classes.cell}>name</div>
          <div className={classes.cell}>$350</div>
          <div className={classes.cell}>12/11/2022</div>
          <div className={classes.cell}></div>
        </div>
      </div>
    </>
  )
}
