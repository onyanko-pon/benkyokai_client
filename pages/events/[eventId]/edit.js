import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { blockquote, Card, ListGroup, Button, Form } from "react-bootstrap";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";

const Event = (props) => {
  const router = useRouter()

  const {event, setEvent} = props

  const saveEvent = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/events/${event.id}`,
      {
        method: "PUT",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({event})
      }
    )
      .then(res => res.json())
      .then(data => {
        alert("更新しました")
        router.reload()
      })
  }

  return <>
      <Form.Group controlId="formBasicTitle">
        <Form.Label>イベントタイトル</Form.Label>
        <Form.Control
          type="text" placeholder="Event Title"
          value={ event.title }
          onChange={(e) => {
            const values = {...event, title: e.target.value}
            setEvent(values)
          }} />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicDate">
        <Form.Label>日付</Form.Label>
        <Form.Control
          type="date" placeholder="Event Date"
          value={ event.date }
          onChange={(e) => {
            const values = {...event, date: e.target.value}
            setEvent(values)
          }} />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicStartTime">
        <Form.Label>開始時間</Form.Label>
        <Form.Control
          type="time" placeholder="Event Start Time"
          value={ event.startTime }
          onChange={(e) => {
            const values = {...event, startTime: e.target.value}
            setEvent(values)
          }} />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicEndTime">
        <Form.Label>開始時間</Form.Label>
        <Form.Control
          type="time" placeholder="Event End Time"
          value={ event.endTime }
          onChange={(e) => {
            const values = {...event, endTime: e.target.value}
            setEvent(values)
          }} />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>イベント説明</Form.Label>
        <Form.Control
          value={ event.description }
          as="textarea" rows={8}
          onChange={(e) => {
            const values = {...event, description: e.target.value}
            setEvent(values)
          }} />
      </Form.Group>

      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label>公開/非公開</Form.Label>
        <Form.Control as="select" value={event.status} onChange={e =>{
          const values = {...event, status: e.target.value}
          setEvent(values)
        }} >
          <option value={"published"}>公開</option>
          <option value={"wip"}>非公開</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={() => (saveEvent())}>
        送信
      </Button>
  </>
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
      {url: "/", title: "ホーム画面"},
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

  return <div>
    {event ? <Event event={event} setEvent={setEvent} /> : "loading"}
  </div>
}

export default EventDetail