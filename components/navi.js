import Link from 'next/link' // TODO クライアントレンダリングするようにこれを使う
import {Navbar, Nav} from "react-bootstrap"

// TODO これをコピペしているので後で精査
// https://react-bootstrap.github.io/components/navbar/#navbars-mobile-friendly
function Navi() {
  return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="/">イベント管理アプリ</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/users/signin">SignIn</Nav.Link>
        <Nav.Link href="/events">Events</Nav.Link>
        <Nav.Link href="/users/detail">Users Detail</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
}

export default Navi