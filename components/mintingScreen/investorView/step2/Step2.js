import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Variants } from '../../../button/Button'

import classes from './step2.module.scss'

import { confirmPaymentEscrow } from '../../../../app/user/userSlice'

export function Step2({ forwardStep }) {
  const dispatch = useDispatch()
  const mintedNftData = useSelector((state) => state.user.mintedNftData)

  return (
    <>
      <h3 className={classes.stepTitle}>Submit offer for NFT royalty stream</h3>
      <div className={classes.layout}>
        <div className={classes.leftSide}>
          {mintedNftData && (
            <>
              <img className={classes.imgPreview} src={mintedNftData.image} />
              <div>{mintedNftData.name}</div>
              <div>{mintedNftData.price} ETH</div>
              <div>Listed {new Date().toLocaleDateString()}</div>
            </>
          )}
        </div>
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
              dispatch(confirmPaymentEscrow())
              forwardStep()
            }}
          >
            {({ isSubmitting }) => (
              <Form className={classes.form}>
                <label className={classes.label} htmlFor="price">
                  Bid Price (ETH)
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
