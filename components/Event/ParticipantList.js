import {Card, ListGroup} from "react-bootstrap";

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

export default ParticipantList