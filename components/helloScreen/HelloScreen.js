import ScrollAnimation from 'react-animate-on-scroll'
import { Button } from '../button/Button'

import classes from './helloScreen.module.scss'

export function HelloScreen() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <h1>Lorem ipsum </h1>
        <p>Pariatur quis est irure irure pariatur.</p>
        <Button>Raise</Button>
      </div>
      <ScrollAnimation
        animatePreScroll={true}
        animateIn="fadeInUp"
        animateOnce={true}
        duration={2}
      ></ScrollAnimation>
    </div>
  )
}
