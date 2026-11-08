import { Ico } from '../lib/icons'
import { useRoute, go, type Page } from '../lib/route'
import { useTheme, useRail } from '../lib/theme'

const NAV: { group: string; items: { id: Page; label: string; icon: string; count?: string; badge?: boolean }[] }[] = [
  {
    group: 'Workspace', items: [
      { id: 'today', label: 'Today', icon: 'grid' },
      { id: 'people', label: 'People', icon: 'people' },
      { id: 'attendance', label: 'Attendance', icon: 'clock', count: '2', badge: true },
      { id: 'leave', label: 'Leave', icon: 'plane', count: '6' },
    ]
  },
  {
    group: 'Manage', items: [
      { id: 'payroll', label: 'Payroll', icon: 'wallet' },
      { id: 'performance', label: 'Performance', icon: 'medal' },
      { id: 'recruitment', label: 'Recruitment', icon: 'bars', count: '5' },
      { id: 'onboarding', label: 'Onboarding', icon: 'checklist' },
    ]
  },
  {
    group: 'Admin', items: [
      { id: 'analytics', label: 'Analytics', icon: 'chart' },
      { id: 'settings', label: 'Settings', icon: 'gear' },
      { id: 'help', label: 'Help & support', icon: 'help' },
    ]
  },
]

export function Sidebar({ onSearch }: { onSearch: () => void }) {
  const { page } = useRoute()
  const [theme, setTheme] = useTheme()
  const [rail, setRail] = useRail()

  return (
    <aside className="side" aria-label="Sidebar">
      <div className="side__head">
        <a className="brand" href="#/today" aria-label="Rotela — Today">
          <span className="mark"><Ico name="logo" /></span>
          <span className="brand__text"><b>Rotela</b><small>Saltwick Hotels</small></span>
        </a>
        <button type="button" className="collapse" aria-label="Collapse sidebar" aria-pressed={rail} aria-keyshortcuts="[" data-tip={rail ? 'Expand  [' : 'Collapse  ['} onClick={() => setRail(!rail)}>
          <Ico name="collapse" />
        </button>
      </div>

      <button type="button" className="side__search" aria-label="Search" aria-keyshortcuts="Meta+K" onClick={onSearch}>
        <Ico name="search" /><span>Find a person…</span><span className="kbd">⌘K</span>
      </button>

      <nav className="snav" aria-label="Main">
        {NAV.map(g => (
          <div className="snav__group" key={g.group}>
            <span className="side__group">{g.group}</span>
            {g.items.map(it => (
              <a key={it.id} className="snav__item" data-id={it.id} href={`#/${it.id}`} aria-current={page === it.id ? 'page' : undefined} onClick={e => { e.preventDefault(); go(it.id) }}>
                <Ico name={it.icon} />
                <span className="snav__label">{it.label}</span>
                {it.count && <span className={`snav__count${it.badge ? ' is-bad' : ''}`}>{it.count}</span>}
              </a>
            ))}
          </div>
        ))}
      </nav>

      <div className="side__foot">
        <a className="side__floor" href="#/attendance/today" onClick={e => { e.preventDefault(); go('attendance/today') }}>
          <span className="side__floor-n"><i className="live" />56<small> / 74</small></span>
          <span>on the floor across three hotels</span>
        </a>
        <div className="side__theme">
          <Ico name="sun" /><span>Dark mode</span>
          <button type="button" className="switch" role="switch" aria-checked={theme === 'dark'} aria-label="Dark mode" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <i style={{ transform: `translate(${theme === 'dark' ? 18 : 0}px, 0px)` }} />
          </button>
        </div>
        <button type="button" className="side__me" aria-label="Priya Raman — account">
          <span className="av av--staff" aria-hidden="true" style={{ '--h': 'var(--h1)' } as React.CSSProperties}>PR<i className="av__dot" /></span>
          <span className="cell__text"><b>Priya Raman</b><small>Head of People</small></span>
          <Ico name="swap" className="ico ico--sm" />
        </button>
      </div>
    </aside>
  )
}
