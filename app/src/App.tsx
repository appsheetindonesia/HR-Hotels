import { lazy, Suspense, useEffect, useState } from 'react'
import './styles/all.css'
import { Sidebar } from './components/Sidebar'
import { Topbar, Tabbar } from './components/Topbar'
import { Drawer } from './components/Drawer'
import { NotificationPanel } from './components/NotificationPanel'
import { Finder } from './components/Finder'
import { Toasts } from './components/Toasts'
import { ActionProvider } from './lib/actions'
import { useRoute, type Page } from './lib/route'
import { playPageAnimation } from './lib/animate'

const Today = lazy(() => import('./pages/Today').then(m => ({ default: m.Today })))
const People = lazy(() => import('./pages/People').then(m => ({ default: m.People })))
const Attendance = lazy(() => import('./pages/Attendance').then(m => ({ default: m.Attendance })))
const Leave = lazy(() => import('./pages/Leave').then(m => ({ default: m.Leave })))
const Payroll = lazy(() => import('./pages/Payroll').then(m => ({ default: m.Payroll })))
const Performance = lazy(() => import('./pages/Performance').then(m => ({ default: m.Performance })))
const Recruitment = lazy(() => import('./pages/Recruitment').then(m => ({ default: m.Recruitment })))
const Onboarding = lazy(() => import('./pages/Onboarding').then(m => ({ default: m.Onboarding })))
const Analytics = lazy(() => import('./pages/Analytics').then(m => ({ default: m.Analytics })))
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })))
const Help = lazy(() => import('./pages/Help').then(m => ({ default: m.Help })))


const PAGES: Record<Page, React.ComponentType> = {
  today: Today, people: People, attendance: Attendance, leave: Leave, payroll: Payroll,
  performance: Performance, recruitment: Recruitment, onboarding: Onboarding,
  analytics: Analytics, settings: Settings, help: Help,
}

export default function App() {
  return (
    <ActionProvider>
      <Shell />
    </ActionProvider>
  )
}

function Shell() {
  const { page } = useRoute()
  const [finder, setFinder] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [notif, setNotif] = useState(false)
  const Page = PAGES[page]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setFinder(v => !v) }
      if (e.key === 'Escape') { setFinder(false); setDrawer(false); setNotif(false) }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => { scrollTo({ top: 0 }) }, [page])

  // Pages are lazy-loaded and injected via innerHTML, so play the entrance
  // timeline only once the view container actually holds content.
  useEffect(() => {
    let raf = 0
    let tries = 0
    const run = () => {
      const view = document.querySelector('.view > div')
      if (view && view.children.length) { playPageAnimation(); return }
      if (tries++ < 40) raf = requestAnimationFrame(run)
    }
    raf = requestAnimationFrame(run)
    return () => cancelAnimationFrame(raf)
  }, [page])

  return (
    <div className="app">
      <Sidebar onSearch={() => setFinder(true)} />
      <main className="main" id="main">
        <Topbar onMenu={() => setDrawer(v => !v)} onSearch={() => setFinder(true)} onNotif={() => setNotif(v => !v)} />
        <div className="view">
          <Suspense fallback={null}>
            <Page />
          </Suspense>
        </div>
      </main>
      <Tabbar onMenu={() => setDrawer(v => !v)} />
      {finder && <Finder onClose={() => setFinder(false)} />}
      {drawer && <Drawer isOpen={drawer} onClose={() => setDrawer(false)} />}
      {notif && <NotificationPanel isOpen={notif} onClose={() => setNotif(false)} />}
      <Toasts />
    </div>
  )
}
