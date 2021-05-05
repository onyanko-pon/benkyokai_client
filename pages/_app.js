import React, {useEffect} from "react";
import {Provider, useDispatch} from 'react-redux'
import { useStore } from '../store'
import Navi from '../components/navi'
import Breadcrumbs from "../components/breadcrumbs";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";

function App({ Component, pageProps}) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Navi />
      <Breadcrumbs />
      <Container>
        <Component {...pageProps} />
      </Container>
    </Provider>
  )
}

export default App