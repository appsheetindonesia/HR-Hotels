import { InteractiveHtmlView } from '../components/InteractiveHtmlView'
import { LeaveRequests } from './LeaveRequests'
import { useRoute } from '../lib/route'
import calendar from './ref/leave/calendar.html'
import balances from './ref/leave/balances.html'
const M: Record<string, string> = { calendar, balances }
export function Leave() {
  const { sub } = useRoute()
  if (sub === 'requests') return <LeaveRequests />
  return <InteractiveHtmlView html={M[sub] ?? calendar} cacheKey={`Leave:${sub}`} />
}
