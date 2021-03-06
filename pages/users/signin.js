import { useRouter } from 'next/router'
import { useEffect } from "react"
import queryString, {stringify} from 'query-string'
import { useDispatch, useSelector } from 'react-redux'

export default function SignIn() {

  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    // TODO 初回レンダリング時、codeがundefinedになる問題をもう少し綺麗に実装したい
    const { code } = queryString.parse(router.asPath.split(/\?/)[1])
    if (code === "" || code === undefined) {
      router.push(process.env.NEXT_PUBLIC_SIGN_IN_URL_WITH_SLACK)
    }

    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/slack/auth/signin`, {
      credentials: 'include',
      method: "POST",
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({code, redirect_uri: process.env.NEXT_PUBLIC_SIGN_IN_WITH_SLACK_REDIRECT_URI})
    })
      .then(data => data.json())
      .then(data => {
        alert(JSON.stringify({data}))
        dispatch({
          type: 'SET_USER',
          user: data.user,
        })
        dispatch({
          type: 'SET_WORKSPACE',
          workspace: data.workspace
        })
        router.push("/events")
    })

  }, [router.asPath])

  return <div>
    signin page
  </div>
}