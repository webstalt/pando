import classes from './button.module.scss'

export function Button({ children, ...rest }) {
  return (
    <button {...rest} className={classes.button}>
      {children}
    </button>
  )
}
