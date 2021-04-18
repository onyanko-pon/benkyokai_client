import { useDispatch } from 'react-redux'
import useInterval from '../lib/useInterval'
import Counter from './counter'

export default function Page() {
  const dispatch = useDispatch()

  // Tick the time every second
  useInterval(() => {
    dispatch({
      type: 'TICK',
      light: true,
      lastUpdate: Date.now(),
    })
  }, 1000)

  return (
    <>
      <Counter />
    </>
  )
}
