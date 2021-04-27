import {useState, useEffect} from "react";

const Event = (props) => {
  return <div>
    <p>{props.id}</p>
    <p>{props.title}</p>
    <p>{props.description}</p>
  </div>
}

export default () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/workspaces/1/events`)
      .then(res => res.json())
      .then(data => setEvents(data.events))
  }, [])

  return <div>
    {
      events.map(event => <Event {...event} key={event.id} />)
    }
  </div>
}