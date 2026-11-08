import type { ReactNode } from 'react'
import { useRoute, go, TABS, type Page } from '../lib/route'

export function PHead({ title, sub, actions, id }: { title: string; sub?: ReactNode; actions?: ReactNode; id?: string }) {
  return (
    <header className="phead">
      <div className="phead__text">
        <h1 id={id}>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
      {actions && <div className="phead__actions">{actions}</div>}
    </header>
  )
}

export function Tabs() {
  const { page, sub } = useRoute()
  const tabs: { id: string; label: string }[] = TABS[page as Page] ?? []
  if (!tabs.length) return null
  return (
    <nav className="tabs" aria-label="Sections">
      {tabs.map(t => (
        <a key={t.id} href={`#/${page}/${t.id}`} aria-current={sub === t.id ? 'page' : undefined}
          onClick={e => { e.preventDefault(); go(`${page}/${t.id}`) }}>{t.label}</a>
      ))}
      <span className="tabs__line" />
    </nav>
  )
}
