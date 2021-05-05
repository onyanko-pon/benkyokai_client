import { Breadcrumb } from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useRouter} from "next/router";

function Breadcrumbs() {

  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    // デフォルトのパンクズリストを0にする
    dispatch({
      type: "SET_BREADCRUMBS",
      breadcrumbs: []
    })
  }, [router.pathname])

  const breadcrumbs = useSelector((state) => state.breadcrumbs)

  console.log(breadcrumbs)

  if (breadcrumbs.length === 0) {
    return <></>
  }

  return <Breadcrumb>
    {
      breadcrumbs.map((breadcrumb, index) => {
        return <Breadcrumb.Item key={index} href={breadcrumb.url}>{breadcrumb.title}</Breadcrumb.Item>
      })
    }
  </Breadcrumb>
}

export default Breadcrumbs