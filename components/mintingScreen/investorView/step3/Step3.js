import classnames from 'classnames'
import { Button } from '../../../button/Button'

import classes from './step3.module.scss'

const Statuses = {
  FUNDED: 'Funded',
  PENDING: 'Pending',
}

export function Step3({}) {
  return (
    <>
      <h3 className={classes.stepTitle}>Seed funds</h3>
      <div className={classes.table}>
        <div className={classes.row}>
          <div className={classnames(classes.cell, classes.th)}></div>
          <div className={classnames(classes.cell, classes.th)}>Bid price</div>
          <div className={classnames(classes.cell, classes.th)}>Bid date</div>
          <div className={classnames(classes.cell, classes.th)}>Status</div>
        </div>
        <div className={classes.row}>
          <div className={classes.cell}>
            <img
              className={classes.preview}
              src="https://lh3.googleusercontent.com/lhIMUd5XQeJ49qKbgXXOhbEHRXp4uZba-Q0mOGoDpIehIaEkB0mp8ES-AQmto3wigq0Riiwy4DDV-EzDWQyTwTC6sBzrq5hx23J8=w600"
            />
            Aotearoa Dreaming
          </div>
          <div className={classes.cell}>$350</div>
          <div className={classes.cell}>05/04/2022</div>
          <div className={classes.cell}>{Statuses.FUNDED}</div>
        </div>
        <div className={classes.row}>
          <div className={classes.cell}>
            <img
              className={classes.preview}
              src="https://lh3.googleusercontent.com/22B9oc-IJCoQUsASC6cI0pA84aV4eRlgXj5ki0yGnvdq4RSWexy37H_S95i0KmOCUpJel8HJU93Nfe3YSiJjyyWOn7ZFr-5a7iRHSA=w600"
            />
            Hanky Panky
          </div>
          <div className={classes.cell}>$550</div>
          <div className={classes.cell}>05/12/2022</div>
          <div className={classes.cell}>{Statuses.FUNDED}</div>
        </div>
      </div>
    </>
  )
}
