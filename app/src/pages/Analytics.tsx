import html from './ref/analytics/analytics.html'

export function Analytics() {
  return (<div dangerouslySetInnerHTML={{ __html: html }} />)
}
