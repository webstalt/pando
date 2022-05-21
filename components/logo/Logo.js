import classes from './logo.module.scss'

export function Logo() {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.name}>Pando</div>
        <div className={classes.adding}>Finance</div>
        <div className={classes.dot} />
      </div>
    </>
  )
}
