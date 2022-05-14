import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useSelector } from 'react-redux'

import 'react-step-progress-bar/styles.css'
import { ProgressBar, Step } from 'react-step-progress-bar'

import { ConnectWalletButton } from '../../connectWalletButton/ConnectWalletButton'
import classes from './sellerView.module.scss'

export function SellerView() {
  const isWalletConnected = useSelector((state) => state.user.isWalletConnected)

  return (
    <>
      <div className={classes.progressBar}>
        <ProgressBar
          width="90%"
          percent={100}
          filledBackground="linear-gradient(to right, #66a3cd, mediumaquamarine)"
        >
          <Step transition="scale" position={0}>
            {({ accomplished }) => (
              <div className={classes.stepName}>
                Complete NFT information form
              </div>
            )}
          </Step>
          <Step transition="scale" position={25}>
            {({ accomplished }) => (
              <div className={classes.stepName}>Mint NFT</div>
            )}
          </Step>
          <Step transition="scale" position={50}>
            {({ accomplished }) => (
              <div className={classes.stepName}>List NFT royalty for sale</div>
            )}
          </Step>
          <Step transition="scale" position={76}>
            {({ accomplished }) => (
              <div className={classes.stepName}>Accept offer</div>
            )}
          </Step>
          <Step transition="scale" position={100}>
            {({ accomplished }) => (
              <div className={classes.stepName}>Receive funds</div>
            )}
          </Step>
        </ProgressBar>
      </div>
      <h3 className={classes.stepTitle}>Fill NFT information form</h3>
      <Formik
        initialValues={{ name: '', royalty: '', price: '' }}
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
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          // TODO: here will be a callback that sends data
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
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
            {isWalletConnected ? (
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            ) : (
              <ConnectWalletButton />
            )}
          </Form>
        )}
      </Formik>
    </>
  )
}
