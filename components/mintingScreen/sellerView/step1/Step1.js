import { Formik, Form, Field, ErrorMessage } from 'formik'

import { useSelector, useDispatch } from 'react-redux'
import { mintNft } from '../../../../app/user/userSlice'
import { ConnectWalletButton } from '../../../connectWalletButton/ConnectWalletButton'
import { Button, Variants } from '../../../button/Button'

import classes from './step1.module.scss'

export function Step1({ isWalletConnected, forwardToCheckOffers }) {
  const dispatch = useDispatch()

  const vmContract = useSelector((state) => state.user.vmContract)

  return (
    <>
      <h3 className={classes.stepTitle}>Fill NFT information form</h3>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{ name: '', royalty: '', price: '', nfturi: '' }}
        validate={(values) => {
          const errors = {}
          if (!values.name) {
            errors.name = 'Required'
          }
          if (!values.royalty) {
            errors.royalty = 'Required'
          }
          if (!values.price) {
            errors.price = 'Required'
          }
          if (!values.nfturi) {
            errors.nfturi = 'Required'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          const result = dispatch(mintNft({ ...values, vmContract }))
            .then((res) => {
              setSubmitting(false)
              console.log(res, 'result in onSubmit')
            })
            .catch((e) => console.error(e, error in onSubmit))
        }}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <label className={classes.label} htmlFor="name">
              Name
              <Field className={classes.inputField} type="name" name="name" />
            </label>
            <ErrorMessage
              className={classes.error}
              name="name"
              component="div"
            />
            <label className={classes.label} htmlFor="price">
              Price
              <Field className={classes.inputField} type="price" name="price" />
            </label>
            <ErrorMessage
              className={classes.error}
              name="price"
              component="div"
            />
            <label className={classes.label} htmlFor="royalty">
              Royalty
              <Field
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
                    disabled={isSubmitting}
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
