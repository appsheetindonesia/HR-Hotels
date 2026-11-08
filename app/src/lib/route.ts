import { useEffect, useState } from 'react'

export type Page = 'today' | 'people' | 'attendance' | 'leave' | 'payroll' | 'performance' | 'recruitment' | 'onboarding' | 'analytics' | 'settings' | 'help'

export const PAGES = ['today', 'people', 'attendance', 'leave', 'payroll', 'performance', 'recruitment', 'onboarding', 'analytics', 'settings', 'help'] as const

export const TABS: Record<Page, { id: string; label: string }[]> = {
  people: [{ id: 'directory', label: 'Directory' }, { id: 'org', label: 'Org chart' }, { id: 'teams', label: 'Departments' }],
  attendance: [{ id: 'today', label: 'On the floor' }, { id: 'rota', label: 'Rota' }, { id: 'timesheets', label: 'Timesheets' }],
  leave: [{ id: 'requests', label: 'Requests' }, { id: 'calendar', label: 'Calendar' }, { id: 'balances', label: 'Balances' }],
  payroll: [{ id: 'run', label: 'Pay run' }, { id: 'payslips', label: 'Payslips' }, { id: 'history', label: 'History' }],
  performance: [{ id: 'reviews', label: 'Reviews' }, { id: 'goals', label: 'Goals' }, { id: 'kudos', label: 'Kudos' }],
  recruitment: [{ id: 'pipeline', label: 'Pipeline' }, { id: 'openings', label: 'Open roles' }],
  onboarding: [{ id: 'starters', label: 'Starters' }, { id: 'templates', label: 'Checklists' }],
  settings: [{ id: 'company', label: 'Company' }, { id: 'access', label: 'Roles & access' }, { id: 'appearance', label: 'Appearance' }, { id: 'alerts', label: 'Notifications' }, { id: 'data', label: 'Data' }],
  today: [], analytics: [], help: [],
}

function parse() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent)
  const page: Page = (PAGES as readonly string[]).includes(parts[0]) ? (parts[0] as Page) : 'today'
  const tabs = TABS[page]
  let sub = ''
  let params: string[] = parts.slice(1)
  if (tabs.length) {
    const found = tabs.find(t => t.id === parts[1])
    sub = found ? parts[1] : tabs[0].id
    params = found ? parts.slice(2) : parts.slice(1)
  }
  return { page, sub, params }
}

let state = parse()
const listeners = new Set<() => void>()
addEventListener('hashchange', () => { state = parse(); listeners.forEach(l => l()) })

export function useRoute() {
  const [, force] = useState(0)
  useEffect(() => { const l = () => force(v => v + 1); listeners.add(l); return () => { listeners.delete(l) } }, [])
  return state
}

export function go(to: string) {
  const h = to.startsWith('#') ? to : `#/${to.replace(/^\/+/, '')}`
  if (location.hash !== h) location.hash = h
}
