import { InteractiveHtmlView } from '../components/InteractiveHtmlView'
import html from './ref/today/today.html'

export function Today() {
  return <InteractiveHtmlView html={html} cacheKey="Today" />
}
