import { useEffect, useRef, useState } from 'react'
import { Ico } from '../lib/icons'
import { Tabs } from '../components/Chrome'
import { useActions } from '../lib/actions'

type Sheet = {
  id: string
  name: string
  role: string
  week: string
  hours: number
  overtime: number
  state: 'pending' | 'approved'
  note?: string
}

const INITIAL: Sheet[] = [
  { id: 'TS-01', name: 'Tomás Ferreira', role: 'Front office manager', week: '2–8 Nov', hours: 38, overtime: 0, state: 'pending' },
  { id: 'TS-02', name: 'Grace Mbeki', role: 'Executive housekeeper', week: '2–8 Nov', hours: 41, overtime: 3.5, state: 'pending', note: 'Laundry backlog on Thursday' },
  { id: 'TS-03', name: 'Daniel Okafor', role: 'Head chef', week: '2–8 Nov', hours: 44, overtime: 9, state: 'pending', note: 'Wedding party overran' },
  { id: 'TS-04', name: 'Mei Tanaka', role: 'Commis chef', week: '2–8 Nov', hours: 0, overtime: 0, state: 'pending', note: 'Missing punch — no clock-out' },
  { id: 'TS-05', name: 'Lucía Romero', role: 'Restaurant manager', week: '2–8 Nov', hours: 39.5, overtime: 0, state: 'approved' },
  { id: 'TS-06', name: 'Ada Nwosu', role: 'Spa therapist', week: '2–8 Nov', hours: 36, overtime: 0, state: 'approved' },
]

/** Attendance > Timesheets — review a week's actual hours and approve for payroll. */
export function AttendanceTimesheets() {
  const { toast } = useActions()
  const [rows, setRows] = useState<Sheet[]>(INITIAL)
  const [only, setOnly] = useState<'all' | 'pending' | 'exceptions'>('all')
  const head = useRef<HTMLHeadingElement>(null)
  useEffect(() => { head.current?.focus() }, [])

  const approve = (id: string) => {
    const r = rows.find(x => x.id === id)
    if (!r) return
    setRows(list => list.map(x => (x.id === id ? { ...x, state: 'approved' } : x)))
    toast(`${r.name.split(' ')[0]}'s timesheet approved · ${r.hours}h to payroll`)
  }

  const visible = rows.filter(r =>
    only === 'all' ? true : only === 'pending' ? r.state === 'pending' : r.state === 'pending' && (r.overtime > 0 || r.note)
  )
  const pending = rows.filter(r => r.state === 'pending').length
  const approved = rows.filter(r => r.state === 'approved').length
  const overtime = rows.reduce((a, r) => a + r.overtime, 0)

  return (
    <>
      <Tabs />
      <div className="page at">
        <header className="phead">
          <div className="phead__text">
            <h1 tabIndex={-1} ref={head}>Timesheets</h1>
            <p>Week of 2 Nov · approve before the November pay run closes</p>
          </div>
          <div className="phead__actions">
            <button type="button" className="btn" onClick={() => toast('Timesheets exported as CSV')}>
              <Ico name="download" />Export CSV
            </button>
            <button type="button" className="btn btn--primary" disabled={pending === 0}
              onClick={() => {
                setRows(list => list.map(x => ({ ...x, state: 'approved' })))
                toast(`All ${pending} timesheets approved`)
              }}>
              <Ico name="check" />Approve all
            </button>
          </div>
        </header>

        <div className="kpis">
          <div className="kpi kpi--3">
            <span className="kpi__label"><Ico name="clock" />Waiting</span>
            <span className="kpi__value">{pending}</span>
            <span className="kpi__foot">Not yet approved</span>
          </div>
          <div className="kpi kpi--1">
            <span className="kpi__label"><Ico name="check" />Approved</span>
            <span className="kpi__value">{approved}</span>
            <span className="kpi__foot">Payroll-eligible</span>
          </div>
          <div className="kpi kpi--4">
            <span className="kpi__label"><Ico name="bolt" />Overtime</span>
            <span className="kpi__value">{overtime.toFixed(1)}h</span>
            <span className="kpi__foot">Needs a claim each time</span>
          </div>
        </div>

        <div className="seg td-floor__seg" role="group" aria-label="Filter">
          {([['all', 'All'], ['pending', 'Waiting'], ['exceptions', 'Exceptions']] as const).map(([k, label]) => (
            <button key={k} type="button" aria-pressed={only === k} onClick={() => setOnly(k)}>{label}</button>
          ))}
        </div>

        <section className="card">
          <table className="table">
            <thead>
              <tr><th>Person</th><th>Week</th><th>Hours</th><th>Overtime</th><th>Status</th><th /></tr>
            </thead>
            <tbody>
              {visible.map(r => (
                <tr key={r.id}>
                  <td className="m-main">
                    <span className="cell who">
                      <span className="av av--sm av--staff" aria-hidden="true" style={{ '--h': 'var(--h1)' } as React.CSSProperties}>
                        {r.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </span>
                      <span className="cell__text"><b>{r.name}</b><small>{r.role}</small></span>
                    </span>
                    {r.note && <small className="muted">{r.note}</small>}
                  </td>
                  <td className="muted">{r.week}</td>
                  <td className="muted">{r.hours}h</td>
                  <td className="muted">{r.overtime ? `${r.overtime}h` : '—'}</td>
                  <td className="m-tag">
                    <span className={`pill ${r.state === 'approved' ? 'pill--good' : 'pill--warn'}`}>
                      {r.state === 'approved' ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    {r.state === 'pending'
                      ? <button type="button" className="btn btn--sm" onClick={() => approve(r.id)}>Approve</button>
                      : <span className="muted">—</span>}
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr><td colSpan={6} className="muted">Nothing matches this filter.</td></tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </>
  )
}
