import html from './ref/help/help.html'

export function Help() {
  return (<div dangerouslySetInnerHTML={{ __html: html }} />)
}
