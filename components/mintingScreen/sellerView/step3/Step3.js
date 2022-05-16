import { Button } from '../../../button/Button'

import classes from './step3.module.scss'

export function Step3({}) {
  return (
    <>
      <h3 className={classes.stepTitle}>Select NFT</h3>
      <div className={classes.nftsGrid}>
        <div className={classes.card}>A CARD</div>
        <div className={classes.card}>A CARD</div>
        <div className={classes.card}>A CARD</div>
        <div className={classes.card}>A CARD</div>
        <div className={classes.card}>A CARD</div>
        <div className={classes.card}>A CARD</div>
        <div className={classes.card}>A CARD</div>
      </div>
      {/* <Button type="submit">Mint NFT</Button> */}
    </>
  )
}
