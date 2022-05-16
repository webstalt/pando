import { Button } from '../../../button/Button'

import classes from './step2.module.scss'

export function Step2({}) {
  return (
    <>
      <h3 className={classes.stepTitle}>Mint NFT</h3>
      <div className={classes.layout}>
        <div className={classes.leftSide}>
          NFT PREVIEW
        </div>
        <Button type="submit">Mint NFT</Button>
      </div>
    </>
  )
}
