import classes from './button.module.scss'

export function Button({ children, onClick, title }) {
  return (
    <button className={classes.button} onClick={onClick} title={title}>
      {children}
    </button>
  )
}
