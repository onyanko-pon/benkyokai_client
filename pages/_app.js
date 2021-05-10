import React, {useEffect} from "react";
import {Provider, useDispatch} from 'react-redux'
import { useStore } from '../store'
import Navi from '../components/navi'
import Breadcrumbs from "../components/breadcrumbs";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Navbar} from "react-bootstrap";

import styled from "styled-components";

const Footer = styled.footer`
  position: fixed;
  width:100%;
  height:48px;
  bottom:0;
  text-align: left;
  z-index: 1000;
  background: #343a40;
  color: white;
`

function App({ Component, pageProps}) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Navi />
      <Breadcrumbs />
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer>
        <Container className={'pt-2'}>
          © 2021 Tsukasa Maruyama
        </Container>
      </Footer>
    </Provider>
  )
}

export default App