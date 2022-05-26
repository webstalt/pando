import { useSelector } from 'react-redux'

import { Checkbox } from '../../../checkbox/Checkbox'
import { Button, Variants } from '../../../button/Button'
import classes from './step3.module.scss'

export const CardsGrid = ({ selection, handleCheckboxClick, handleSubmit }) => {
  const mintedNftData = useSelector((state) => state.user.mintedNftData)

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
          <div>price: 350 ETH</div>
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
          <div>price: ETH 550</div>
          <Checkbox
            checked={selection === '2'}
            value={'2'}
            name={'2'}
            onChange={(event) => handleCheckboxClick(event.target)}
          />
        </div>
        {mintedNftData && (
          <>
            <div className={classes.card}>
              <img className={classes.preview} src={mintedNftData.image} />
              {mintedNftData.name}
              <div>price: ETH {mintedNftData.price}</div>
              <Checkbox
                checked={selection === '3'}
                value={'3'}
                name={'3'}
                onChange={(event) => handleCheckboxClick(event.target)}
              />
            </div>
          </>
        )}
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
