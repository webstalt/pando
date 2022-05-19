import { Formik, Form, Field, ErrorMessage } from 'formik'

import { Button, Variants } from '../../../button/Button'

import classes from './step2.module.scss'

export function Step2({}) {
  return (
    <>
      <h3 className={classes.stepTitle}>Submit offer for NFT royalty stream</h3>
      <div className={classes.layout}>
        <div className={classes.leftSide}>NFT info</div>
        <div className={classes.rightSide}>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{ name: '', royalty: '', price: '', nfturi: '' }}
            validate={(values) => {
              const errors = {}
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
                <label className={classes.label} htmlFor="price">
                  Bid Price
                  <Field
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

                <Button
                  type="submit"
                  variant={Variants.PRIMARY}
                  disabled={isSubmitting}
                >
                  Submit Bid
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}
