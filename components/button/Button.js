import classnames from 'classnames'
import classes from './button.module.scss'

export const Variants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
}

export function Button({ children, ...rest }) {
  return (
    <button
      {...rest}
      className={
        rest.variant === Variants.PRIMARY
          ? classnames(classes.button, classes.primary)
          : classes.button
      }
    >
      {children}
    </button>
  )
}
