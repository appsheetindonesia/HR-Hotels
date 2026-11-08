import { HtmlView } from '../components/HtmlView'
import { useRoute } from '../lib/route'
import floor from './ref/attendance/today.html'
import rota from './ref/attendance/rota.html'
import timesheets from './ref/attendance/timesheets.html'
const M: Record<string, string> = { today: floor, rota, timesheets }
export function Attendance() {
  const { sub } = useRoute()
  return (<HtmlView html={M[sub] ?? floor} cacheKey={`Attendance:${sub}`} />)
}
