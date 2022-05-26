import { Formik, Form, Field, ErrorMessage } from 'formik'

import { Button, Variants } from '../../../button/Button'

import classes from './step2.module.scss'

import { confirmPaymentEscrow } from '../../../../app/user/userSlice'
import { useDispatch} from 'react-redux'

export function Step2({ forwardStep }) {
  const dispatch = useDispatch()
  return (
    <>
      <h3 className={classes.stepTitle}>Submit offer for NFT royalty stream</h3>
      <div className={classes.layout}>
        <div className={classes.leftSide}>
          <img
            className={classes.imgPreview}
            src="https://lh3.googleusercontent.com/22B9oc-IJCoQUsASC6cI0pA84aV4eRlgXj5ki0yGnvdq4RSWexy37H_S95i0KmOCUpJel8HJU93Nfe3YSiJjyyWOn7ZFr-5a7iRHSA=w600"
          />
          <div>Hanky Panky</div>
          <div>$550</div>
          <div>Listed 05/12/2022</div>
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
