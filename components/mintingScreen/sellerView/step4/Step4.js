import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import classnames from 'classnames'

import { StyledLink } from '../../../styledLink/StyledLink'
import { confirmDeliveryEscrow } from '../../../../app/user/userSlice'

import classes from './step4.module.scss'

export function Step4({}) {
  const dispatch = useDispatch()
  const iconAccept = (
    <svg
      className={classnames(classes.svg, classes.accept)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
  const iconDecline = (
    <svg
      className={classnames(classes.svg, classes.decline)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )

  const handleSubmit = useCallback(async () => {
    await dispatch(confirmDeliveryEscrow())
  })

  return (
    <>
      <h3 className={classes.stepTitle}>Current Offers</h3>
      <div className={classes.table}>
        <div className={classes.row}>
          <div className={classnames(classes.cell, classes.th)}>Bidder</div>
          <div className={classnames(classes.cell, classes.th)}>Bid price</div>
          <div className={classnames(classes.cell, classes.th)}>Bid date</div>
          <div className={classnames(classes.cell, classes.th)}></div>
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
          <div className={classes.cell}>04/11/2022</div>
          <div className={classes.cell}>
            <div className={classes.actionButton}>
              <StyledLink>{iconAccept} Accept</StyledLink>
            </div>
            <div className={classes.actionButton}>
              <StyledLink>{iconDecline} Decline</StyledLink>
            </div>
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
          <div className={classes.cell}>$550</div>
          <div className={classes.cell}>05/12/2022</div>
          <div className={classes.cell}>
            <div className={classes.actionButton}>
              <StyledLink onClick={handleSubmit}>
                {iconAccept} Accept
              </StyledLink>
            </div>
            <div className={classes.actionButton}>
              <StyledLink onClick={handleSubmit}>
                {iconDecline} Decline
              </StyledLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
