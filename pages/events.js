import {useState, useEffect} from "react";

const Event = (props) => {
  return <div>
    <p>{props.id}</p>
    <p>{props.name}</p>
    <p>{props.description}</p>
  </div>
}

export default () => {

  const [events, setEvents] = useState([])

  useEffect(() => {
    fetch(`${process.env.API_BASE}/events`)
      .then(res => res.json())
      .then(data => setEvents(data.events))
  }, [])

  return <div>
    {
      events.map(event => Event(event))
    }
  </div>
}