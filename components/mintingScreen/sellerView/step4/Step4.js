import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import classnames from 'classnames'

import { StyledLink } from '../../../styledLink/StyledLink'
import { confirmDeliveryEscrow } from '../../../../app/user/userSlice'
import { declineDeliveryEscrow } from '../../../../app/user/userSlice'

import classes from './step4.module.scss'

export function Step4({}) {
  const dispatch = useDispatch()
  const mintedNftData = useSelector((state) => state.user.mintedNftData)

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

  const handleAcceptSubmit = useCallback(async () => {
    await dispatch(confirmDeliveryEscrow())
  })

  const handleDeclineSubmit = useCallback(async () => {
    await dispatch(declineDeliveryEscrow())
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
        {mintedNftData ? (
          <div className={classes.row}>
            <div className={classes.cell}>
              <img className={classes.preview} src={mintedNftData.image} />
              {mintedNftData.name}
            </div>
            <div className={classes.cell}>{mintedNftData.price}</div>
            <div className={classes.cell}>
              {new Date().toLocaleDateString()}
            </div>
            <div className={classes.cell}>
              <div className={classes.actionButton}>
                <StyledLink onClick={handleAcceptSubmit}>
                  {iconAccept} Accept
                </StyledLink>
              </div>
              <div className={classes.actionButton}>
              <StyledLink onClick={handleDeclineSubmit}>
                  {iconDecline} Decline
                </StyledLink>
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.cell}>There is no data yet</div>
        )}
      </div>
    </>
  )
}
