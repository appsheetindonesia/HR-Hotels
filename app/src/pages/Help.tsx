import { InteractiveHtmlView } from '../components/InteractiveHtmlView'
import html from './ref/help/help.html'

export function Help() {
  return (<InteractiveHtmlView html={html} cacheKey="Help" />)
}
