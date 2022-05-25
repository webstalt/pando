import { Checkbox } from '../../../checkbox/Checkbox'
import { Button, Variants } from '../../../button/Button'
import classes from './step3.module.scss'

export const CardsGrid = ({ selection, handleCheckboxClick, handleSubmit }) => {
  return (
    <>
      <h3 className={classes.stepTitle}>List NFT royalty for sale</h3>
      <div className={classes.nftsGrid}>
        <div className={classes.card}>
          <img
            className={classes.preview}
            src="https://lh3.googleusercontent.com/lhIMUd5XQeJ49qKbgXXOhbEHRXp4uZba-Q0mOGoDpIehIaEkB0mp8ES-AQmto3wigq0Riiwy4DDV-EzDWQyTwTC6sBzrq5hx23J8=w600"
          />
          Aotearoa Dreaming
          <div>price: $350</div>
          <Checkbox
            checked={selection === '1'}
            value={'1'}
            name={'1'}
            onChange={(event) => handleCheckboxClick(event.target)}
          />
        </div>
        <div className={classes.card}>
          <img
            className={classes.preview}
            src="https://lh3.googleusercontent.com/22B9oc-IJCoQUsASC6cI0pA84aV4eRlgXj5ki0yGnvdq4RSWexy37H_S95i0KmOCUpJel8HJU93Nfe3YSiJjyyWOn7ZFr-5a7iRHSA=w600"
          />
          Hanky Panky
          <div>price: $550</div>
          <Checkbox
            checked={selection === '2'}
            value={'2'}
            name={'2'}
            onChange={(event) => handleCheckboxClick(event.target)}
          />
        </div>
        <div className={classes.card}>
          <img
            className={classes.preview}
            src="https://lh3.googleusercontent.com/vfYB4RarIqixy2-wyfP4lIdK6fsOT8uNrmKxvYCJdjdRwAMj2ZjC2zTSxL-YKky0s-4Pb6eML7ze3Ouj54HrpUlfSWx52xF_ZK2TYw=h600"
          />
          Air Blocks
          <div>price: $700</div>
          <Checkbox
            checked={selection === '3'}
            value={'3'}
            name={'3'}
            onChange={(event) => handleCheckboxClick(event.target)}
          />
        </div>
      </div>
      <Button
        disabled={!selection}
        type="submit"
        variant={Variants.PRIMARY}
        onClick={handleSubmit}
      >
        List NFT royalty for sale
      </Button>
    </>
  )
}
