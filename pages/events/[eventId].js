import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {blockquote, Card} from "react-bootstrap";
import Link from "next/link";

const Event = (props) => {

  const { event } = props

  return <Link href={`/events/${event.id}`}>
    <Card>
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
    {event ? <Event event={event} /> : "loading"}
  </div>
}

export default EventDetail