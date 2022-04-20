import styles from './backlight.module.scss'

export function Backlight({ children }) {
  return <div className={styles.backlight}>{children}</div>
}
