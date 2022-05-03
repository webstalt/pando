import Image from 'next/image'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { Button } from '../button/Button'
import { Backlight } from '../backlight/Backlight'
import classes from './mintingScreen.module.scss'
import conceptMap from './concept-map.jpg'

export function MintingScreen({ data }) {
  return (
    <Backlight>
      <div className={classes.content}>
        Select your role to start working
        <Image src={conceptMap} alt="concept-map" height="200" width="800" />
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {}
            if (!values.email) {
              errors.email = 'Required'
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address'
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
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
              <ErrorMessage name="name" component="div" />
              <label className={classes.label} htmlFor="price">
                Price
                <Field
                  className={classes.inputField}
                  type="price"
                  name="price"
                />
              </label>
              <ErrorMessage name="price" component="div" />
              <label className={classes.label} htmlFor="royalty">
                Royalty
                <Field
                  className={classes.inputField}
                  type="royalty"
                  name="royalty"
                />
              </label>
              <ErrorMessage name="royalty" component="div" />
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      {/* <div className={classes.table}>
        <div className={classes.row}>
          <div className={classes.cell}>table head</div>
          <div className={classes.cell}>table head2</div>
          <div className={classes.cell}>table head3</div>
        </div>
        <div className={classes.row}>
          <div className={classes.cell}>table cell</div>
          <div className={classes.cell}>table cell2</div>
          <div className={classes.cell}>table cell3</div>
        </div>
      </div> */}
    </Backlight>
  )
}
