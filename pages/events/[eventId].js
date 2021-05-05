import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { blockquote, Card, ListGroup, Button } from "react-bootstrap";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";

const Event = (props) => {

  const { event } = props

  return <Link href={`/events/${event.id}`}>
    <Card className={"mb-3"}>
      <Card.Header>{event.title}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {event.description}
          </p>
          <footer className="blockquote-footer">
            20:00~21:00
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  </Link>
}

const ParticipantList = (props) => {
  const { users } = props
  return <ListGroup className={"mb-4"}>
    <Card>
      <Card.Header>イベント参加者</Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
        {
          users.map(user =>
            <ListGroup.Item key={user.id}>{user.name}</ListGroup.Item>
          )
        }
        </ListGroup>
      </Card.Body>
    </Card>
  </ListGroup>
}

const EventDetail = () => {
  const router = useRouter()
  const { eventId } = router.query
  const [event, setEvent] = useState(null)
  const user = useSelector((state) => state.user)
  const workspace = useSelector((state) => state.workspace)
  const dispatch = useDispatch()

  dispatch({
    type: "SET_BREADCRUMBS",
    breadcrumbs: [
      {url: "/events", title: "イベント一覧"},
      {url: `/events/${eventId}`, title: "イベント詳細"}
    ]
  })

  useEffect(() => {

    if (!eventId) {
      return
    }

    if (event) {
      return
    }

    // TODO 共通化する
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
      .then(() => fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/events/${eventId}`,
        {credentials: 'include', cache: "no-cache"}
      ))
      .then(res => res.json())
      .then(data => {
        setEvent(data.event)
      })
  }, [eventId])

  const participate = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/events/${eventId}/participate`,
      {method: "POST", credentials: 'include'}
    )
      .then(res => res.json())
      .then(data => {
        alert("参加しました")
        // router.reload()
      })
  }

  const isParticipate = inParticipateUser(event, user)

  return <div>
    {event ? <Event event={event} /> : "loading"}
    {event ? <ParticipantList users={event.users} /> : ""}
    {event && !isParticipate ? <Button variant="outline-primary" onClick={() => (participate())}>参加する</Button> : ""}
  </div>
}

const inParticipateUser = (event, user) =>  {
  if (!event || !user) {return false}

  const find_user = event.users.find(event_user => {
    return event_user.id === user.id
  })

  return !!find_user
}

export default EventDetail