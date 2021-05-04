import Link from 'next/link'
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`

function Navi() {
  return <Wrapper>
    <Link href="/events">
      <a>Events</a>
    </Link>
    <Link href="/users/signin">
      <a>Signin</a>
    </Link>
  </Wrapper>
}

export default Navi