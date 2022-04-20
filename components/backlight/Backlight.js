import classes from './backlight.module.scss'

export function Backlight({ children }) {
  return <div className={classes.backlight}>{children}</div>
}
