import html from './ref/analytics/analytics.html'

export function Analytics() {
  return (<div className="page" dangerouslySetInnerHTML={{ __html: html }} />)
}
