import { InteractiveHtmlView } from '../components/InteractiveHtmlView'
import { useRoute } from '../lib/route'
import directory from './ref/people/directory.html'
import org from './ref/people/org.html'
import teams from './ref/people/teams.html'
const M: Record<string, string> = { directory, org, teams }
export function People() {
  const { sub } = useRoute()
  return (<InteractiveHtmlView html={M[sub] ?? directory} cacheKey={`People:${sub}`} />)
}
