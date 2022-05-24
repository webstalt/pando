import { useEffect, useState } from 'react'

import classes from './checkbox.module.scss'

export function Checkbox({
  value,
  name,
  label = ' ',
  checked = false,
  ...rest
}) {
  const [isChecked, setIsChecked] = useState(checked)
  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  return (
    <div>
      <input
        className={classes.styledCheckbox}
        id={name}
        type="checkbox"
        value={value}
        checked={isChecked}
        {...rest}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}
