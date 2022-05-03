import { Provider } from 'react-redux'
import '../components/styles.scss'

import store from '../app/store'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
