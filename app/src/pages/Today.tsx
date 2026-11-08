import { HtmlView } from '../components/HtmlView'
import html from './ref/today/today.html'

export function Today() {
  return (<HtmlView html={html} cacheKey="Today" />)
}
