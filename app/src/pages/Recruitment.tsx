import { HtmlView } from '../components/HtmlView'
import { useRoute } from '../lib/route'
import pipeline from './ref/recruitment/pipeline.html'
import openings from './ref/recruitment/openings.html'
const M: Record<string, string> = { pipeline, openings }
export function Recruitment() {
  const { sub } = useRoute()
  return (<HtmlView html={M[sub] ?? pipeline} cacheKey={`Recruitment:${sub}`} />)
}
