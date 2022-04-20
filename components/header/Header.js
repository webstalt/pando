import { StyledLink } from '../styledLink/StyledLink'

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
        <StyledLink href="/" className={classes.navigationItem}>
          Main
        </StyledLink>
        <StyledLink href="/about">About</StyledLink>
        <StyledLink href="/contacts">Contacts</StyledLink>
      </div>
    </div>
  )
}
