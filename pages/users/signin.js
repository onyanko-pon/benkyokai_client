import { useRouter } from 'next/router';
import {useEffect} from "react";
import queryString from 'query-string'

export default function SignIn() {

  const router = useRouter()

  useEffect(() => {
    const { code } = queryString.parse(router.asPath.split(/\?/)[1])
    console.log(code)
    if (code === "" || code === undefined) {
      router.push("https://slack.com/oauth/v2/authorize?user_scope=identity.basic&client_id=902472642709.1202297519351")
    }
  }, [router.asPath])

  return <div>
    signin page
  </div>
}