import Link from 'next/link'

import classes from './styledLink.module.scss'

export function StyledLink({ children, href }) {
  return (
    <Link href={href}>
      <span className={classes.styledLink}>{children}</span>
    </Link>
  )
}
