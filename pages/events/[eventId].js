import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import queryString from 'query-string'

const Event = (props) => {
  return <div>
    <p>id: { props.event.id }</p>
    <p>title: { props.event.title }</p>
    <p>description: { props.event.description }</p>
  </div>
}

const EventDetail = () => {
  const router = useRouter()
  const { eventId } = router.query
  const [event, setEvent] = useState(null)

  useEffect(() => {
    if (!eventId) {
      return
    }

    if (event) {
      return
    }
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/events/${eventId}`,
      {credentials: 'include'}
      )
      .then(res => res.json())
      .then(data => {
        setEvent(data.event)
      })
  }, [eventId])

  return <div>
    event-id: {eventId},
    {event ? <Event event={event} /> : "hoge"}
  </div>
}

export default EventDetail