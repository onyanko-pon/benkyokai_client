import { useRouter } from 'next/router'
import { useEffect, useState } from "react"

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


  return <div>
    userpage
    {
      user ?
        <div>
          <p>{user.id}</p>
          <p>{user.name}</p>
        </div>
        :
        <></>
    }
  </div>
}