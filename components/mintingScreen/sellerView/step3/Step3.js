import { useState, useCallback } from 'react'
import { Button, Variants } from '../../../button/Button'
import { CardsGrid } from './CardsGrid'
import { useDispatch} from 'react-redux'

import classes from './step3.module.scss'

import { createEscrow } from '../../../../app/user/userSlice'

export function Step3({ forwardStep }) {
  const [selection, setSelection] = useState(null)
  const [isListed, setIsListed] = useState(false)
  const dispatch = useDispatch()

  const handleCheckboxClick = (target) => {
    if (target.checked) {
      setSelection(target.value)
    } else {
      setSelection(undefined)
    }
  }

  const handleSubmit = useCallback(async () => {
    await dispatch(createEscrow())
    setIsListed(true)
  }, [])

  return !isListed ? (
    <CardsGrid
      selection={selection}
      handleCheckboxClick={handleCheckboxClick}
      handleSubmit={handleSubmit}
    />
  ) : (
    <>
      <br />
      <br />
      <h3 className={classes.stepTitle}>
        Congratulations,
        <br /> Listing Complete!
      </h3>
      <Button type="submit" variant={Variants.PRIMARY} onClick={forwardStep}>
        Continue
      </Button>
    </>
  )
}
