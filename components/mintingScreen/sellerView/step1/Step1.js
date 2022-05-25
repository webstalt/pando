import { Formik, Form, Field, ErrorMessage } from 'formik'

import { useDispatch, useSelector } from 'react-redux'
import {
  setPreMintingName,
  setPreMintingPrice,
  setPreMintingRoyalty,
  setPreMintingURI,
} from '../../../../app/user/userSlice'
import { ConnectWalletButton } from '../../../connectWalletButton/ConnectWalletButton'
import { Button, Variants } from '../../../button/Button'

import classes from './step1.module.scss'

export function Step1({
  isWalletConnected,
  forwardToCheckOffers,
  forwardStep,
}) {
  const dispatch = useDispatch()

  const preMintingRoyalty = useSelector(
    (state) => state.user.preMintingData.royalty
  )

  const preMintingName = useSelector((state) => state.user.preMintingData.name)

  const preMintingPrice = useSelector(
    (state) => state.user.preMintingData.price
  )

  const preMintingURI = useSelector((state) => state.user.preMintingData.nfturi)

  return (
    <>
      <h3 className={classes.stepTitle}>Fill NFT information form</h3>
      <Formik
        validateOnChange={false}
        initialValues={{ name: '', royalty: '', price: '', nfturi: '' }}
        validate={(values) => {
          const errors = {}
          if (!preMintingName) {
            errors.name = 'Required'
          }
          if (!preMintingRoyalty) {
            errors.royalty = 'Required'
          }
          if (!preMintingPrice) {
            errors.price = 'Required'
          }
          if (!preMintingURI) {
            errors.nfturi = 'Required'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <label className={classes.label} htmlFor="name">
              Name
              <Field
                value={preMintingName}
                onChange={(e) => dispatch(setPreMintingName(e.target.value))}
                className={classes.inputField}
                type="name"
                name="name"
              />
            </label>
            <ErrorMessage
              className={classes.error}
              name="name"
              component="div"
            />
            <label className={classes.label} htmlFor="price">
              Price
              <Field
                value={preMintingPrice}
                onChange={(e) => dispatch(setPreMintingPrice(e.target.value))}
                className={classes.inputField}
                type="price"
                name="price"
              />
            </label>
            <ErrorMessage
              className={classes.error}
              name="price"
              component="div"
            />
            <label className={classes.label} htmlFor="royalty">
              Royalty
              <Field
                value={preMintingRoyalty}
                onChange={(e) => dispatch(setPreMintingRoyalty(e.target.value))}
                className={classes.inputField}
                type="royalty"
                name="royalty"
              />
            </label>
            <ErrorMessage
              className={classes.error}
              name="royalty"
              component="div"
            />
            <label className={classes.label} htmlFor="nfturi">
              NFT URI
              <Field
                value={preMintingURI}
                onChange={(e) => dispatch(setPreMintingURI(e.target.value))}
                className={classes.inputField}
                type="nfturi"
                name="nfturi"
              />
            </label>
            <ErrorMessage
              className={classes.error}
              name="nfturi"
              component="div"
            />

            <div className={classes.buttonWrapper}>
              {isWalletConnected ? (
                <>
                  <Button
                    type="submit"
                    variant={Variants.PRIMARY}
                    onClick={() => forwardStep()}
                  >
                    Submit
                  </Button>
                </>
              ) : (
                <ConnectWalletButton />
              )}
            </div>
          </Form>
        )}
      </Formik>

      <h3 className={classes.checkOffersTitle}>Already listed NFT royalty?</h3>
      <div>
        <Button disabled={!isWalletConnected} onClick={forwardToCheckOffers}>
          Check offers
        </Button>
        {!isWalletConnected && (
          <span className={classes.hint}>
            ?<span className={classes.hintContent}>Connect Wallet first</span>
          </span>
        )}
      </div>
    </>
  )
}
