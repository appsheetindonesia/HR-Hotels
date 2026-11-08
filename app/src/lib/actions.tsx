import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * Shared action state for the interactive layer.
 *
 * The reference demo ships the same views but every control is inert. This store
 * gives them real behaviour in memory: leave decisions, shift moves, candidate
 * stage changes, chase actions and settings edits all mutate state here and
 * reset on refresh (no backend wiring yet).
 */

export type Toast = { id: number; text: string; warn?: boolean }

/** leave request: pending → approved | declined */
export type LeaveRequest = {
  id: string
  emp: string
  name: string
  role: string
  dept: string
  type: string
  from: string
  to: string
  days: number
  note: string
  status: 'pending' | 'approved' | 'declined'
}

export type RotaShift = {
  id: string
  emp: string
  name: string
  role: string
  dept: string
  day: number // 0 = Mon
  start: number
  end: number
  open?: boolean
}

export type Candidate = {
  id: string
  name: string
  role: string
  site: string
  stage: 'applied' | 'screen' | 'interview' | 'offer' | 'hired'
  days: number
}

export type StaffNow = {
  id: string
  name: string
  role: string
  dept: string
  status: 'in' | 'late' | 'missing'
  chased?: boolean
}

export type Settings = {
  company: string
  address: string
  reg: string
  vat: string
  payday: string
  currency: string
  timezone: string
}

const DEFAULTS: Settings = {
  company: 'Saltwick Hotels Ltd',
  address: '12 Abbey Lane, Whitby, North Yorkshire YO22 4HH',
  reg: '08451203',
  vat: 'GB 204 9917 33',
  payday: '27',
  currency: 'IDR · Rp',
  timezone: 'Asia/Jakarta',
}

type Store = {
  toasts: Toast[]
  toast: (text: string, warn?: boolean) => void
  dismiss: (id: number) => void

  leave: LeaveRequest[]
  decideLeave: (id: string, decision: 'approved' | 'declined') => void

  shifts: RotaShift[]
  moveShift: (id: string, dir: -1 | 1) => void
  dropShiftOnDay: (id: string, day: number) => void

  candidates: Candidate[]
  moveCandidate: (id: string, stage: Candidate['stage']) => void

  staff: StaffNow[]
  chase: (id: string) => void

  settings: Settings
  dirty: boolean
  setField: (k: keyof Settings, v: string) => void
  save: () => void
  undo: () => void
}

const Ctx = createContext<Store | null>(null)

export function ActionProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const seq = useRef(1)

  const dismiss = useCallback((id: number) => setToasts(t => t.filter(x => x.id !== id)), [])
  const toast = useCallback((text: string, warn?: boolean) => {
    const id = seq.current++
    setToasts(t => [...t, { id, text, warn }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4200)
  }, [])

  // ---- leave requests -------------------------------------------------
  const [leave, setLeave] = useState<LeaveRequest[]>(() => [
    { id: 'LV-2401', emp: 'E1042', name: 'Agnieszka Costa', role: 'Room attendant', dept: 'Housekeeping', type: 'annual', from: '9 Nov', to: '13 Nov', days: 5, note: 'Family in Kraków', status: 'pending' },
    { id: 'LV-2402', emp: 'E1057', name: 'Mei Tanaka', role: 'Commis chef', dept: 'Kitchen', type: 'toil', from: '11 Nov', to: '11 Nov', days: 1, note: 'Wedding party on the 24th', status: 'pending' },
    { id: 'LV-2403', emp: 'E1019', name: 'Priya Raman', role: 'Head of People', dept: 'Operations', type: 'annual', from: '16 Nov', to: '18 Nov', days: 3, note: 'Conference in Leeds', status: 'pending' },
    { id: 'LV-2404', emp: 'E1073', name: 'Tariq Nakamura', role: 'Bartender', dept: 'Restaurant & bar', type: 'annual', from: '23 Nov', to: '27 Nov', days: 5, note: 'Long weekend', status: 'pending' },
    { id: 'LV-2405', emp: 'E1028', name: 'Esme Adeyemi', role: 'Front desk agent', dept: 'Front desk', type: 'sick', from: '4 Nov', to: '5 Nov', days: 2, note: 'Fit note to follow', status: 'approved' },
    { id: 'LV-2406', emp: 'E1066', name: 'Jonah Whitfield', role: 'Spa therapist', dept: 'Spa & leisure', type: 'annual', from: '30 Nov', to: '2 Dec', days: 3, note: '', status: 'declined' },
  ])
  const decideLeave = useCallback((id: string, decision: 'approved' | 'declined') => {
    setLeave(list => list.map(r => (r.id === id ? { ...r, status: decision } : r)))
  }, [])

  // ---- rota shifts ----------------------------------------------------
  const [shifts, setShifts] = useState<RotaShift[]>(() => {
    const out: RotaShift[] = []
    const roster: [string, string, string, string, number, number][] = [
      ['E1004', 'Tomás Ferreira', 'Front office manager', 'Front desk', 7, 15],
      ['E1005', 'Grace Mbeki', 'Executive housekeeper', 'Housekeeping', 8, 16],
      ['E1006', 'Daniel Okafor', 'Head chef', 'Kitchen', 11, 19],
      ['E1007', 'Lucía Romero', 'Restaurant manager', 'Restaurant & bar', 16, 24],
      ['E1008', 'Hana Kobayashi', 'Head of spa', 'Spa & leisure', 12, 20],
      ['E1002', 'Callum Hart', 'General manager', 'Operations', 9, 17],
    ]
    roster.forEach(([id, name, role, dept, s, e], i) => {
      out.push({ id: `SH-${300 + i}`, emp: id, name, role, dept, day: i, start: s, end: e })
    })
    return out
  })
  const moveShift = useCallback((id: string, dir: -1 | 1) => {
    setShifts(list => list.map(s => (s.id === id ? { ...s, day: Math.max(0, Math.min(6, s.day + dir)) } : s)))
  }, [])
  const dropShiftOnDay = useCallback((id: string, day: number) => {
    setShifts(list => list.map(s => (s.id === id ? { ...s, day } : s)))
  }, [])

  // ---- hiring pipeline ------------------------------------------------
  const [candidates, setCandidates] = useState<Candidate[]>(() => [
    { id: 'CD-01', name: 'Ada Nwosu', role: 'Front desk agent', site: 'Saltwick Harbour', stage: 'applied', days: 3 },
    { id: 'CD-02', name: 'Ravi Hughes', role: 'Room attendant', site: 'Moorgate Lodge', stage: 'applied', days: 5 },
    { id: 'CD-03', name: 'Clara Nakamura', role: 'Commis chef', site: 'The Quay Rooms', stage: 'screen', days: 8 },
    { id: 'CD-04', name: 'Oliver Price', role: 'Waiter', site: 'Saltwick Harbour', stage: 'screen', days: 2 },
    { id: 'CD-05', name: 'Hollie Yusuf', role: 'Bartender', site: 'The Quay Rooms', stage: 'interview', days: 11 },
    { id: 'CD-06', name: 'Dmitri Byrne', role: 'Lifeguard', site: 'Moorgate Lodge', stage: 'interview', days: 4 },
    { id: 'CD-07', name: 'Fatima Novak', role: 'Chef de partie', site: 'Saltwick Harbour', stage: 'offer', days: 6 },
    { id: 'CD-08', name: 'Ewan Gallagher', role: 'Night auditor', site: 'Saltwick Harbour', stage: 'hired', days: 14 },
  ])
  const moveCandidate = useCallback((id: string, stage: Candidate['stage']) => {
    setCandidates(list => list.map(c => (c.id === id ? { ...c, stage } : c)))
  }, [])

  // ---- today / floor board -------------------------------------------
  const [staff, setStaff] = useState<StaffNow[]>(() => [
    { id: 'ST-01', name: 'Tomás Ferreira', role: 'Front office manager', dept: 'Front desk', status: 'in' },
    { id: 'ST-02', name: 'Grace Mbeki', role: 'Executive housekeeper', dept: 'Housekeeping', status: 'late' },
    { id: 'ST-03', name: 'Daniel Okafor', role: 'Head chef', dept: 'Kitchen', status: 'in' },
    { id: 'ST-04', name: 'Mei Tanaka', role: 'Commis chef', dept: 'Kitchen', status: 'missing' },
    { id: 'ST-05', name: 'Lucía Romero', role: 'Restaurant manager', dept: 'Restaurant & bar', status: 'in' },
    { id: 'ST-06', name: 'Ada Nwosu', role: 'Spa therapist', dept: 'Spa & leisure', status: 'late' },
  ])
  const chase = useCallback((id: string) => {
    setStaff(list => list.map(s => (s.id === id ? { ...s, chased: true } : s)))
  }, [])

  // ---- settings -------------------------------------------------------
  const [settings, setSettings] = useState<Settings>(DEFAULTS)
  const [saved, setSaved] = useState<Settings>(DEFAULTS)
  const dirty = useMemo(() => (Object.keys(settings) as (keyof Settings)[]).some(k => settings[k] !== saved[k]), [settings, saved])
  const setField = useCallback((k: keyof Settings, v: string) => {
    setSettings(s => ({ ...s, [k]: v }))
  }, [])
  const save = useCallback(() => { setSaved(settings) }, [settings])
  const undo = useCallback(() => { setSettings(saved) }, [saved])

  const value: Store = {
    toasts, toast, dismiss,
    leave, decideLeave,
    shifts, moveShift, dropShiftOnDay,
    candidates, moveCandidate,
    staff, chase,
    settings, dirty, setField, save, undo,
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useActions() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useActions must be used inside <ActionProvider>')
  return ctx
}
