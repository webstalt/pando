import ScrollAnimation from 'react-animate-on-scroll'

import { Name } from '../name/Name'
import classes from './helloScreen.module.scss'

export function HelloScreen() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <h1>Lorem ipsum </h1>
        <p>Pariatur quis est irure irure pariatur.</p>
      </div>
      <ScrollAnimation
        duration={2}
        animatePreScroll={true}
        animateIn="fadeInUp"
        animateOnce={true}
      >
        <Name />
      </ScrollAnimation>
    </div>
  )
}
