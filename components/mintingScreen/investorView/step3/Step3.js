import classnames from 'classnames'
import { useSelector } from 'react-redux'

import classes from './step3.module.scss'

export function Step3({}) {
  const mintedNftData = useSelector((state) => state.user.mintedNftData)

  return (
    <>
      <h3 className={classes.stepTitle}>Funding & Bid Dashboard</h3>
      <div className={classes.table}>
        <div className={classes.row}>
          <div className={classnames(classes.cell, classes.th)}></div>
          <div className={classnames(classes.cell, classes.th)}>Bid Price</div>
          <div className={classnames(classes.cell, classes.th)}>Bid Date</div>
          <div className={classnames(classes.cell, classes.th)}>
            Funding Status
          </div>
          <div className={classnames(classes.cell, classes.th)}>Bid Status</div>
        </div>
        <div className={classes.row}>
          <div className={classes.cell}>
            <img
              className={classes.preview}
              src="https://lh3.googleusercontent.com/lhIMUd5XQeJ49qKbgXXOhbEHRXp4uZba-Q0mOGoDpIehIaEkB0mp8ES-AQmto3wigq0Riiwy4DDV-EzDWQyTwTC6sBzrq5hx23J8=w600"
            />
            Aotearoa Dreaming
          </div>
          <div className={classes.cell}>350 ETH</div>
          <div className={classes.cell}>05/04/2022</div>
          <div className={classes.cell}>Funded</div>
          <div className={classes.cell}>
            Pending <br />
            (awaiting accept/decline from Seller)
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.cell}>
            <img
              className={classes.preview}
              src="https://lh3.googleusercontent.com/22B9oc-IJCoQUsASC6cI0pA84aV4eRlgXj5ki0yGnvdq4RSWexy37H_S95i0KmOCUpJel8HJU93Nfe3YSiJjyyWOn7ZFr-5a7iRHSA=w600"
            />
            Hanky Panky
          </div>
          <div className={classes.cell}>550 ETH</div>
          <div className={classes.cell}>05/12/2022</div>
          <div className={classes.cell}>Funded</div>
          <div className={classes.cell}>
            Pending <br />
            (awaiting accept/decline from Seller)
          </div>
        </div>
        {mintedNftData && (
          <div className={classes.row}>
            <div className={classes.cell}>
              <img className={classes.preview} src={mintedNftData.image} />
              {mintedNftData.name}
            </div>
            <div className={classes.cell}>{mintedNftData.price} ETH</div>
            <div className={classes.cell}>
              {new Date().toLocaleDateString()}
            </div>
            <div className={classes.cell}>Funded</div>
            <div className={classes.cell}>
              Pending <br />
              (awaiting accept/decline from Seller)
            </div>
          </div>
        )}
      </div>
    </>
  )
}
