import html from './ref/today/today.html'

export function Today() {
  return (<div className="page" dangerouslySetInnerHTML={{ __html: html }} />)
}
