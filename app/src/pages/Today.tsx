import html from './ref/today/today.html'

export function Today() {
  return (<div dangerouslySetInnerHTML={{ __html: html }} />)
}
