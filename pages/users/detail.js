import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import Link from "next/link";
import {blockquote, Card, Figure} from "react-bootstrap";


const UserCard = (props) => {

  const { user } = props

  return <Card className={['mb-3', 'mt-3']}>
    <Card.Body>
      <Figure className={'mr-4'}>
        <Figure.Image
          width={60}
          height={60}
          alt="171x180"
          src={user.image}
        />
      </Figure>
      {user.name}
    </Card.Body>
  </Card>
}

export default function Detail() {

  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/users/detail`, {
      credentials: 'include',
    }).then(res => {
      if (!res.ok) {
        router.push("/users/signin")
      }
      return res.json()
    }).then(data => {
      setUser(data.user)
    })
  }, [])


  return <>
    {
      user ?
        <UserCard user={user} />
        :
        <></>
    }
  </>
}