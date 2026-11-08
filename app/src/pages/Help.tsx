import html from './ref/help/help.html'

export function Help() {
  return (<div className="page" dangerouslySetInnerHTML={{ __html: html }} />)
}
