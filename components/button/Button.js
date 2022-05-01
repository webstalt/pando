import classes from './button.module.scss'

export function Button({ children, onClick }) {
  return (
    <button className={classes.button} onClick={onClick}>
      {children}
    </button>
  )
}
