import classes from './button.module.scss'

export function Button({ children }) {
  return <button className={classes.button}>{children}</button>
}
