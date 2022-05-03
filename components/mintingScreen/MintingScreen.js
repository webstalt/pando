import Image from 'next/image'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useSelector, useDispatch } from 'react-redux'

import { Button } from '../button/Button'
import { ConnectWalletButton } from '../connectWalletButton/ConnectWalletButton'
import { Roles, setRole } from '../../app/user/userSlice'
import { Backlight } from '../backlight/Backlight'

import classes from './mintingScreen.module.scss'
import sellersRoadmap from './sellers-roadmap.png'
import investorsRoadmap from './investors-roadmap.png'

export function MintingScreen({ data }) {
  const isWalletConnected = useSelector((state) => state.user.isWalletConnected)
  const role = useSelector((state) => state.user.role)

  const dispatch = useDispatch()

  return (
    <Backlight>
      <div className={classes.content}>
        {!role ? (
          <>
            <div className={classes.heading}>
              Select your role to start using the app
            </div>
            <div className={classes.optionsWrapper}>
              <div className={classes.option}>
                <Image
                  src={sellersRoadmap}
                  alt="sellers-roadmap"
                  height="460"
                  width="250"
                />
                <Button onClick={() => dispatch(setRole(Roles.SELLER))}>
                  Become a creator
                </Button>
              </div>
              <div className={classes.option}>
                <Image
                  src={investorsRoadmap}
                  alt="investors-roadmap"
                  height="460"
                  width="250"
                />
                <Button onClick={() => dispatch(setRole(Roles.INVESTOR))}>
                  Become an investor
                </Button>
              </div>
            </div>
          </>
        ) : role === Roles.SELLER ? (
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
                  <Field
                    className={classes.inputField}
                    type="name"
                    name="name"
                  />
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
        ) : null}
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
