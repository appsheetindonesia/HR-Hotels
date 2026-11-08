import { HtmlView } from '../components/HtmlView'
import html from './ref/analytics/analytics.html'

export function Analytics() {
  return (<HtmlView html={html} cacheKey="Analytics" />)
}
