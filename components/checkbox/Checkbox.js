import { useState } from 'react'

import classes from './checkbox.module.scss'

export function Checkbox({
  value,
  name,
  label = ' ',
  checked = false,
  ...rest
}) {
  const [isChecked, setIsChecked] = useState(checked)
  return (
    <div>
      <input
        className={classes.styledCheckbox}
        id={name}
        type="checkbox"
        value={value}
        defaultChecked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        {...rest}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}
