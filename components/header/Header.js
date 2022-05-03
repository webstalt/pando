import { Logo } from '../logo/Logo'
import { ConnectWalletButton } from '../connectWalletButton/ConnectWalletButton'

import classes from './header.module.scss'

export function Header() {
  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <Logo />
      </div>
      <div className={classes.navigation}>
        <ConnectWalletButton />
      </div>
    </div>
  )
}
