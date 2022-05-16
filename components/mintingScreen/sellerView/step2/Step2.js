import { Formik, Form, Field, ErrorMessage } from 'formik'

import { ConnectWalletButton } from '../../../connectWalletButton/ConnectWalletButton'
import { Button } from '../../../button/Button'

import classes from './step1.module.scss'

export function Step2({ isWalletConnected }) {
  return (
    <>
      <h3 className={classes.stepTitle}>Mint NFT</h3>
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
