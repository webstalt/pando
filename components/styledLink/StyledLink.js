import classes from './styledLink.module.scss'

export function StyledLink({ children, ...rest }) {
  return (
    <div {...rest}>
      <span className={classes.styledLink}>{children}</span>
    </div>
  )
}
