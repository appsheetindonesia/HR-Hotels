import { HtmlView } from '../components/HtmlView'
import { useRoute } from '../lib/route'
import requests from './ref/leave/requests.html'
import calendar from './ref/leave/calendar.html'
import balances from './ref/leave/balances.html'
const M: Record<string, string> = { requests, calendar, balances }
export function Leave() {
  const { sub } = useRoute()
  return (<HtmlView html={M[sub] ?? requests} cacheKey={`Leave:${sub}`} />)
}
