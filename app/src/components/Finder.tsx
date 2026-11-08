import { useEffect, useRef, useState } from 'react'
import { Ico } from '../lib/icons'
import { go } from '../lib/route'
import people from '../lib/data/people.json'

type Item = { key: string; label: string; hint: string; icon: string; to: string; group: string }

const PAGES: Item[] = [
  { key: 'today', label: 'Today', hint: 'Who is on the floor right now', icon: 'grid', to: 'today', group: 'Jump to' },
  { key: 'people', label: 'People', hint: 'Directory, org chart, departments', icon: 'people', to: 'people', group: 'Jump to' },
  { key: 'attendance', label: 'Attendance', hint: 'Floor board, rota, timesheets', icon: 'clock', to: 'attendance', group: 'Jump to' },
  { key: 'leave', label: 'Leave', hint: 'Requests, calendar, balances', icon: 'plane', to: 'leave', group: 'Jump to' },
  { key: 'payroll', label: 'Payroll', hint: 'Pay run, payslips, history', icon: 'wallet', to: 'payroll', group: 'Jump to' },
  { key: 'performance', label: 'Performance', hint: 'Reviews, goals, kudos', icon: 'medal', to: 'performance', group: 'Jump to' },
  { key: 'recruitment', label: 'Recruitment', hint: 'Pipeline, open roles', icon: 'bars', to: 'recruitment', group: 'Jump to' },
  { key: 'onboarding', label: 'Onboarding', hint: 'Starters, checklists', icon: 'checklist', to: 'onboarding', group: 'Jump to' },
  { key: 'analytics', label: 'Analytics', hint: 'People analytics', icon: 'chart', to: 'analytics', group: 'Jump to' },
  { key: 'settings', label: 'Settings', hint: 'Company, roles, appearance', icon: 'gear', to: 'settings', group: 'Jump to' },
  { key: 'help', label: 'Help & support', hint: 'FAQ, ask the people team', icon: 'help', to: 'help', group: 'Jump to' },
]

const FOLK: Item[] = people.slice(0, 40).map(p => ({
  key: p.name, label: p.name, hint: `${p.role} · ${p.dept}`, icon: 'user', to: 'people', group: 'People',
}))

const ALL = [...PAGES, ...FOLK]

export function Finder({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => { input.current?.focus() }, [])

  const needle = q.trim().toLowerCase()
  const results = needle ? ALL.filter(i => i.label.toLowerCase().includes(needle) || i.hint.toLowerCase().includes(needle)) : PAGES
  const groups: { group: string; items: (Item & { i: number })[] }[] = []
  results.forEach(r => { const g = groups.find(x => x.group === r.group) ?? (groups.push({ group: r.group, items: [] }), groups[groups.length - 1]); g.items.push({ ...r, i: results.indexOf(r) }) })

  return (
    <div className="scrim" onClick={onClose}>
      <div className="finder" role="dialog" aria-modal="true" aria-label="Find" onClick={e => e.stopPropagation()}>
        <div className="finder__in">
          <Ico name="search" />
          <input ref={input} placeholder="Find a person, a page, a shift…" value={q}
            onChange={e => { setQ(e.target.value); setSel(0) }}
            onKeyDown={e => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, results.length - 1)) }
              if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(s - 1, 0)) }
              if (e.key === 'Enter' && results[sel]) { go(results[sel].to); onClose() }
              if (e.key === 'Escape') onClose()
            }} />
          <span className="kbd">esc</span>
        </div>
        <div className="finder__list">
          {groups.map(g => (
            <div key={g.group}>
              <div className="finder__group">{g.group}</div>
              {g.items.map(it => (
                <button key={it.key} type="button" className="finder__item" aria-selected={it.i === sel}
                  onClick={() => { go(it.to); onClose() }} onMouseEnter={() => setSel(it.i)}>
                  <span className="finder__ico"><Ico name={it.icon} className="ico ico--sm" /></span>
                  <span className="cell__text"><b>{it.label}</b><small>{it.hint}</small></span>
                  <Ico name="chevR" />
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="finder__foot">
          <span><b>↑↓</b> navigate</span><span><b>↵</b> open</span><span><b>esc</b> close</span>
        </div>
      </div>
    </div>
  )
}
