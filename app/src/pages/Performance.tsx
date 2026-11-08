import { useRoute } from '../lib/route'
import reviews from './ref/performance/reviews.html'
import goals from './ref/performance/goals.html'
import kudos from './ref/performance/kudos.html'
const M: Record<string, string> = { reviews, goals, kudos }
export function Performance() {
  const { sub } = useRoute()
  return (<div className="page" dangerouslySetInnerHTML={{ __html: M[sub] ?? reviews }} />)
}
