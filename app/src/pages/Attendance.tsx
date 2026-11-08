import { HtmlView } from '../components/HtmlView'
import { AttendanceFloor } from './AttendanceFloor'
import { AttendanceRota } from './AttendanceRota'
import { AttendanceTimesheets } from './AttendanceTimesheets'
import { useRoute } from '../lib/route'
import timesheetsFallback from './ref/attendance/timesheets.html'

export function Attendance() {
  const { sub } = useRoute()
  if (sub === 'today') return <AttendanceFloor />
  if (sub === 'rota') return <AttendanceRota />
  if (sub === 'timesheets') return <AttendanceTimesheets />
  return <HtmlView html={timesheetsFallback} cacheKey="Attendance:timesheets" />
}
