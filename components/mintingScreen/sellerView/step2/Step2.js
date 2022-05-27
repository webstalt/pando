import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Variants } from '../../../button/Button'
import { mintNft } from '../../../../app/user/userSlice'
import { requestConversion } from '../../../../app/user/userSlice'

import classes from './step2.module.scss'

export function Step2({ forwardStep }) {
  const dispatch = useDispatch()

  const preMintingRoyalty = useSelector(
    (state) => state.user.preMintingData.royalty
  )

  const preMintingName = useSelector((state) => state.user.preMintingData.name)

  const preMintingPrice = useSelector(
    (state) => state.user.preMintingData.price
  )

  const preMintingURI = useSelector((state) => state.user.preMintingData.nfturi)

  const handleSubmit = useCallback(async () => {
    //await dispatch(mintNft())
    const result = await dispatch(requestConversion())
    console.log( (parseInt(result.payload.resultEthUsd) / 1e8).toFixed(2) )
    console.log( (parseInt(result.payload.resultBtcUsd) / 1e8).toFixed(2) )
    console.log( (parseInt(result.payload.resultEurUsd) / 1e8).toFixed(2) )
    forwardStep()
  }, [mintNft, forwardStep, dispatch])

  return (
    <>
      <h3 className={classes.stepTitle}>Mint NFT</h3>
      <div className={classes.layout}>
        <div className={classes.leftSide}>
          <img src={preMintingURI} className={classes.imgPreview}></img>
        </div>
        <div className={classes.rightSide}>
          <div className={classes.text}>Name: {preMintingName}</div>
          <div className={classes.text}>Price (ETH): {preMintingPrice}</div>
          <div className={classes.text}>Royalty: {preMintingRoyalty}</div>
          <Button
            type="submit"
            variant={Variants.PRIMARY}
            onClick={handleSubmit}
          >
            Mint NFT
          </Button>
        </div>
      </div>
    </>
  )
}
