import classes from './name.module.scss'

export function Name() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.name}>PIPE</div>
      <div className={classes.dot} />
    </div>
  )
}
