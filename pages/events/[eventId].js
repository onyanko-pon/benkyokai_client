import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";

import EventCard from '../../components/Event/Card'
import EventParticipantList from '../../components/Event/ParticipantList'


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
      {url: "/", title: "ホーム画面"},
      {url: "/events", title: "イベント一覧"},
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
        console.log({data})
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
        router.reload()
      })
  }

  const isParticipate = inParticipateUser(event, user)
  const isAdministrator = isAdministratorUser(event, user)

  return <div>
    {event ?
      <Link href={`/events/${event.id}`}>
        <EventCard event={event} />
      </Link>
      : "loading"
    }
    {event ? <EventParticipantList users={event.users} /> : ""}
    {event && !isParticipate ? <Button className={"m-1"} variant="outline-primary" onClick={() => (participate())}>参加する</Button> : ""}
    {event && isAdministrator ? <Link href={`/events/${event.id}/edit`}><Button className={"m-1"} variant="outline-info">編集する</Button></Link> : ""}
  </div>
}

const inParticipateUser = (event, user) =>  {
  if (!event || !user) {return false}

  const find_user = event.users.find(event_user => {
    return event_user.id === user.id
  })

  return !!find_user
}

const isAdministratorUser = (event, user) => {
  if (!event || !user) {return false}

  const { administrator } = event

  return user.id === administrator.id
}

export default EventDetail