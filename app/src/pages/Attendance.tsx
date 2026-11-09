import { InteractiveHtmlView } from '../components/InteractiveHtmlView'
import { useRoute } from '../lib/route'
import floor from './ref/attendance/today.html'
import rota from './ref/attendance/rota.html'
import timesheets from './ref/attendance/timesheets.html'

const M: Record<string, string> = { today: floor, rota, timesheets }

// Full reference markup per sub-route, with the interactive click layer on top.
// The rota grid and floor board need far more controls than the reference
// exposes in a snapshot, so those two keep their own drag/chase behaviour.
export function Attendance() {
  const { sub } = useRoute()
  return <InteractiveHtmlView html={M[sub] ?? floor} cacheKey={`Attendance:${sub}`} />
}
