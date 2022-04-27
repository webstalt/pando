import Head from 'next/head'

import { Header } from '../header/Header'
import classes from './mainLayout.module.scss'

export function MainLayout({ children, title = '' }) {
  return (
    <>
      <Head>
        <title>{title} | Pando Finance</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.compat.css"
        />
      </Head>
      <div className={classes.container}>
        <Header />
        <main>{children}</main>
      </div>
    </>
  )
}
