import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import 'react-step-progress-bar/styles.css'
import { ProgressBar, Step } from 'react-step-progress-bar'

import { ConnectWalletButton } from '../../connectWalletButton/ConnectWalletButton'
import classes from './sellerView.module.scss'

//import { pinJSONToIPFS } from "./pinata.js";

//import { mintNFT } from '../../connectWalletButton/ConnectWalletButton'

//require('dotenv').config();
//const key = process.env.REACT_APP_PINATA_KEY;
//const secret = process.env.REACT_APP_PINATA_SECRET;


export function SellerView() {
  const isWalletConnected = useSelector((state) => state.user.isWalletConnected)
  return (
    <>
      <ProgressBar
        percent={10}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <div className={classes.stepName}>
              Complete NFT information form
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div className={classes.stepName}>Mint NFT</div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div className={classes.stepName}>List NFT royalty for sale</div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div className={classes.stepName}>Accept offer</div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div className={classes.stepName}>Receive funds</div>
          )}
        </Step>
      </ProgressBar>
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
          mintNFT(values.name, values.price, values.royalty)
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
              <button type="submit" disabled={isSubmitting} >
                Submit
              </button>
            ) : (
              <ConnectWalletButton />
            )}
          </Form>
        )}
      </Formik>
    </>
  )
}
