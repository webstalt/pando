import { Button } from '../../../button/Button'

import classes from './step5.module.scss'

export function Step5({}) {
  return (
    <>
      <h3 className={classes.stepTitle}>Mint NFT</h3>
      <Button type="submit">Mint NFT</Button>
    </>
  )
}
