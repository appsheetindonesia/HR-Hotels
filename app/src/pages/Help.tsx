import { HtmlView } from '../components/HtmlView'
import html from './ref/help/help.html'

export function Help() {
  return (<HtmlView html={html} cacheKey="Help" />)
}
