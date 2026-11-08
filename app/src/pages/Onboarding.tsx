import { InteractiveHtmlView } from '../components/InteractiveHtmlView'
import { useRoute } from '../lib/route'
import starters from './ref/onboarding/starters.html'
import templates from './ref/onboarding/templates.html'
const M: Record<string, string> = { starters, templates }
export function Onboarding() {
  const { sub } = useRoute()
  return (<InteractiveHtmlView html={M[sub] ?? starters} cacheKey={`Onboarding:${sub}`} />)
}
