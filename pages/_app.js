import React from "react";
import { Provider } from 'react-redux'
import { useStore } from '../store'
import Navi from '../components/navi'

function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Navi />
      <Component {...pageProps} />
    </Provider>
  )
}

export default App