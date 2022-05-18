import { useState } from 'react'
import { Button, Variants } from '../../../button/Button'
import { Checkbox } from '../../../checkbox/Checkbox'

import classes from './step3.module.scss'

export function Step3({}) {
  const [selection, setSelection] = useState(null)

  const handleCheckboxClick = (target) => {
    if (target.checked) {
      setSelection(target.value)
    } else {
      setSelection(null)
    }
  }

  return (
    <>
      <h3 className={classes.stepTitle}>List NFT royalty for sale</h3>
      <div className={classes.nftsGrid}>
        <div className={classes.card}>
          A CARD
          <div>info</div>
          <div>info</div>
          <div>info</div>
          <Checkbox
            value={'select'}
            name={'select'}
            onChange={(event) => handleCheckboxClick(event.target)}
          />
        </div>
        <div className={classes.card}>A CARD</div>
        <div className={classes.card}>A CARD</div>
        <div className={classes.card}>A CARD</div>
        <div className={classes.card}>A CARD</div>
        <div className={classes.card}>A CARD</div>
        <div className={classes.card}>A CARD</div>
      </div>
      <Button disabled={!selection} type="submit" variant={Variants.PRIMARY}>
        List NFT royalty for sale
      </Button>
    </>
  )
}
