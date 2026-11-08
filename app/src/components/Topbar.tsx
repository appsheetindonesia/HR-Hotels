import { Ico } from '../lib/icons'
import { useRoute, go, TABS, type Page } from '../lib/route'

const TITLES: Record<Page, string> = {
  today: 'Today', people: 'People', attendance: 'Attendance', leave: 'Leave', payroll: 'Payroll',
  performance: 'Performance', recruitment: 'Recruitment', onboarding: 'Onboarding', analytics: 'Analytics',
  settings: 'Settings', help: 'Help & support',
}

const CRUMB: Record<Page, string> = {
  today: 'Today', people: 'People', attendance: 'Attendance', leave: 'Leave', payroll: 'Payroll',
  performance: 'Performance', recruitment: 'Recruitment', onboarding: 'Onboarding', analytics: 'Analytics',
  settings: 'Settings', help: 'Help & support',
}

export function Topbar({ onMenu, onSearch }: { onMenu: () => void; onSearch: () => void }) {
  const { page, sub } = useRoute()
  const tabs = TABS[page]
  const subLabel = tabs.find(t => t.id === sub)?.label
  const title = subLabel && tabs.length > 1 ? subLabel : TITLES[page]

  return (
    <header className="top">
      <div className="top__in">
        <button type="button" className="ibtn ibtn--flat top__menu" aria-label="Open menu" onClick={onMenu}><Ico name="menu" /></button>
        <a className="brand top__brand" href="#/today" aria-label="Rotela — Today" onClick={e => { e.preventDefault(); go('today') }}>
          <span className="mark"><Ico name="logo" /></span>
        </a>
        <nav className="crumb" aria-label="Breadcrumb">
          <span className="crumb__home">Good morning, Priya</span>
          <span className="crumb__sep" aria-hidden="true">/</span>
          <a href={`#/${page}`} onClick={e => { e.preventDefault(); go(page) }}>{CRUMB[page]}</a>
        </nav>
        <span className="top__title">{title}</span>
        <div className="tools">
          <span className="top__day">
            <Ico name="cal" className="ico ico--sm" />Tuesday 3 November · <b className="top__clock">10:40</b>
          </span>
          <a className="top__ask" href="#/leave/requests" data-tip="Waiting on you" onClick={e => { e.preventDefault(); go('leave/requests') }}>
            <Ico name="tray" className="ico ico--sm" /><b>10</b><span> to approve</span>
          </a>
          <button type="button" className="ibtn top__search" aria-label="Search" data-tip="Search  ⌘K" onClick={onSearch}><Ico name="search" /></button>
          <button type="button" className="ibtn" aria-label="Notifications, 3 unread" data-tip="Notifications" onClick={() => { /* opens notifications panel */ }}>
            <Ico name="bell" /><span className="ibtn__badge">3</span>
          </button>
          <button type="button" className="btn btn--primary top__new" aria-haspopup="menu" aria-keyshortcuts="N">
            <Ico name="plus" /><span>Create</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export function Tabbar({ onMenu }: { onMenu: () => void }) {
  const { page } = useRoute()
  return (
    <nav className="tabbar" aria-label="Quick">
      <a data-id="today" href="#/today" aria-current={page === 'today' ? 'page' : undefined} onClick={e => { e.preventDefault(); go('today') }}><Ico name="grid" />Today</a>
      <a data-id="people" href="#/people" aria-current={page === 'people' ? 'page' : undefined} onClick={e => { e.preventDefault(); go('people') }}><Ico name="people" />People</a>
      <a data-id="attendance" href="#/attendance" aria-current={page === 'attendance' ? 'page' : undefined} onClick={e => { e.preventDefault(); go('attendance') }}><Ico name="clock" />Floor</a>
      <a data-id="leave" href="#/leave" aria-current={page === 'leave' ? 'page' : undefined} onClick={e => { e.preventDefault(); go('leave') }}><Ico name="plane" />Leave</a>
      <button type="button" className="tabbar__more" onClick={onMenu}><Ico name="dots" />More</button>
    </nav>
  )
}
