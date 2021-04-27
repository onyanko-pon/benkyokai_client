import { useRouter } from 'next/router';
import {useEffect} from "react";
import queryString from 'query-string'

export default function SignIn() {

  const router = useRouter()

  useEffect(() => {
    const { code } = queryString.parse(router.asPath.split(/\?/)[1])
    console.log(code)
    if (code === "" || code === undefined) {
      router.push(process.env.NEXT_PUBLIC_SIGN_IN_URL_WITH_SLACK)
    }
  }, [router.asPath])

  return <div>
    signin page
  </div>
}