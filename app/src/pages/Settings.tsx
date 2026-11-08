import { HtmlView } from '../components/HtmlView'
import { SettingsCompany } from './SettingsCompany'
import { useRoute } from '../lib/route'
import access from './ref/settings/access.html'
import appearance from './ref/settings/appearance.html'
import alerts from './ref/settings/alerts.html'
import data from './ref/settings/data.html'

const M: Record<string, string> = { access, appearance, alerts, data }

export function Settings() {
  const { sub } = useRoute()
  // Company is a real controlled form; the other four tabs keep the reference markup.
  if (sub === 'company') return <SettingsCompany />
  return <HtmlView html={M[sub] ?? access} cacheKey={`Settings:${sub}`} />
}
