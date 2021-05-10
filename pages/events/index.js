import {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Link from "next/link";

// blockquote ないかも
import {Card, Row, Col, Container, blockquote} from "react-bootstrap";

const EventCard = (props) => {

  return <Row className={"mt-3"}>
    <Col>
      <Link href={`/events/${props.id}`}>
        <Card>
          <Card.Header>{props.title}</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                {props.description}
              </p>
              <footer className={'blockquote-footer'} >
                { props.date }
              </footer>
              <footer className="blockquote-footer">
                { props.startTime }~{ props.endTime }
              </footer>
              <footer className="blockquote-footer">
                イベント作成者: { props.administrator.name }
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  </Row>
}

const Index = (props) => {

  const router = useRouter()
  const [events, setEvents] = useState([])
  const user = useSelector((state) => state.user)
  const workspace = useSelector((state) => state.workspace)
  const dispatch = useDispatch()

  useEffect(() => {

    const verify = async () => {

      if (user && workspace) {
        return {user, workspace}
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/slack/auth/verify`, {method: "POST", credentials: 'include'})
      if (!res.ok) {
        return router.push("/users/signin")
      }
      const data= await res.json()
      const {user, workspace} = data

      dispatch({
        type: "SET_USER",
        user: user
      })
      dispatch({
        type: "SET_WORKSPACE",
        user: workspace
      })

      return data
    }

    verify()
      .then(data => {
        const {user} = data
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events`, {
          credentials: "include",
          cache: "no-cache"
        })
        // return fetch(`${process.env.NEXT_PUBLIC_API_BASE}/workspaces/${user.id}/events`)
      })
      .then(res => res.json())
      .then(data => setEvents(data.events))
  }, [])

  return <>
    {
      events.map(event => <EventCard {...event} key={event.id} />)
    }
  </>
}

export default Index