import { Button, Variants } from '../../../button/Button'

import classes from './step5.module.scss'

export function Step5({}) {
  return (
    <>
      <h3 className={classes.stepTitle}>Receive funds</h3>
      <Button type="submit" variant={Variants.PRIMARY}>
        Receive funds
      </Button>
    </>
  )
}
