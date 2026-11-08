import { useRoute } from '../lib/route'
import starters from './ref/onboarding/starters.html'
import templates from './ref/onboarding/templates.html'
const M: Record<string, string> = { starters, templates }
export function Onboarding() {
  const { sub } = useRoute()
  return (<div dangerouslySetInnerHTML={{ __html: M[sub] ?? starters }} />)
}
