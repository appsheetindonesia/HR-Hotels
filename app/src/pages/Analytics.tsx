import { InteractiveHtmlView } from '../components/InteractiveHtmlView'
import html from './ref/analytics/analytics.html'

export function Analytics() {
  return <InteractiveHtmlView html={html} cacheKey="Analytics" />
}
