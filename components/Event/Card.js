import {Badge, blockquote, Card} from "react-bootstrap";
import Link from "next/link";

const EventStatus = (props) => {
  const { status } = props

  if (status === "wip") {
    return <Badge variant="secondary">準備中</Badge>
  }

  // published
  return <Badge variant="success">募集中</Badge>
}

const AdministratorInfo = (props) =>  {
  const { event } = props
  if (event.administrator) {
    return <footer className="blockquote-footer">
      イベント作成者: { event.administrator.name }
    </footer>
  }
  return <></>
}

const EventCard = (props) => {

  const { event, href} = props

  return <Link href={href} >
    <Card className={['mb-3', 'mt-3']}>
      <Card.Header>{event.title} <EventStatus status={event.status} /></Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {event.description}
          </p>
          <footer className={'blockquote-footer'} >
            { event.date }
          </footer>
          <footer className="blockquote-footer">
            { event.startTime }~{ event.endTime }
          </footer>
          <AdministratorInfo event={event} />
        </blockquote>
      </Card.Body>
    </Card>
  </Link>
}

export default EventCard