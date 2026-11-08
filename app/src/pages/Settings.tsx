import { useRoute } from '../lib/route'
import company from './ref/settings/company.html'
import access from './ref/settings/access.html'
import appearance from './ref/settings/appearance.html'
import alerts from './ref/settings/alerts.html'
import data from './ref/settings/data.html'
const M: Record<string, string> = { company, access, appearance, alerts, data }
export function Settings() {
  const { sub } = useRoute()
  return (<div className="page" dangerouslySetInnerHTML={{ __html: M[sub] ?? company }} />)
}
