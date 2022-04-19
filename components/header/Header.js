import Link from 'next/link'

import classes from './header.module.scss'

export function Header() {
  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <img
          src={
            'https://assets-global.website-files.com/5f6b7190899f41fb70882d08/5f760a499b56c47b8fa74fbb_chainlink-logo.svg'
          }
        ></img>
      </div>
      <div className={classes.navigation}>
        <Link href="/" className={classes.navigationItem}>
          Main
        </Link>
        <Link href="/about">About</Link>
        <Link href="/contacts">Contacts</Link>
      </div>
    </div>
  )
}
