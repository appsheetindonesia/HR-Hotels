import { useEffect, useRef } from 'react'
import { Ico } from '../lib/icons'
import { Tabs } from '../components/Chrome'
import { useActions, type StaffNow } from '../lib/actions'

const PILL: Record<StaffNow['status'], { cls: string; label: string }> = {
  in: { cls: 'pill--good', label: 'On shift' },
  late: { cls: 'pill--warn', label: 'Late' },
  missing: { cls: 'pill--bad', label: 'Not in' },
}

/** Attendance > On the floor — chase actions are the reference's headline feature. */
export function AttendanceFloor() {
  const { staff, chase, toast } = useActions()
  const head = useRef<HTMLHeadingElement>(null)
  useEffect(() => { head.current?.focus() }, [])

  const doChase = (s: StaffNow) => {
    chase(s.id)
    toast(`Chased ${s.name.split(' ')[0]} — ${s.status === 'missing' ? 'asked to call the floor' : 'asked for an ETA'}`)
  }

  const onCount = staff.filter(s => s.status === 'in').length
  const issues = staff.filter(s => s.status !== 'in')

  return (
    <>
      <Tabs />
      <div className="page at">
        <header className="phead">
          <div className="phead__text">
            <h1 tabIndex={-1} ref={head}>Attendance</h1>
            <p>Tue 3 Nov · live across Saltwick Harbour, Moorgate Lodge and The Quay Rooms</p>
          </div>
          <div className="phead__actions">
            <button type="button" className="btn" onClick={() => toast('Marked as reviewed for today')}>
              <Ico name="check" />Review day
            </button>
            <button type="button" className="btn btn--primary" onClick={() => toast('Add a shift — the rota opens on 2 Nov week')}>
              <Ico name="plus" />Add a shift today
            </button>
          </div>
        </header>

        <div className="kpis">
          <div className="kpi kpi--1">
            <span className="kpi__label"><Ico name="floor" />On the floor</span>
            <span className="kpi__value">{onCount}</span>
            <span className="kpi__foot">Clocked in right now</span>
          </div>
          <div className="kpi kpi--3">
            <span className="kpi__label"><Ico name="clock" />Late</span>
            <span className="kpi__value">{staff.filter(s => s.status === 'late').length}</span>
            <span className="kpi__foot">Chase for an ETA</span>
          </div>
          <div className="kpi kpi--4">
            <span className="kpi__label"><Ico name="warn" />Not in</span>
            <span className="kpi__value">{staff.filter(s => s.status === 'missing').length}</span>
            <span className="kpi__foot">Shift uncovered until answered</span>
          </div>
        </div>

        <section className="card">
          <div className="chead">
            <div className="chead__text"><h2>Who is on the floor</h2><p>Grouped by status, live</p></div>
            <div className="seg td-floor__seg" role="group" aria-label="Group by">
              <button type="button" aria-pressed>Status</button>
              <button type="button" aria-pressed={false}>Department</button>
            </div>
          </div>

          <ul className="feed">
            {staff.map(s => (
              <li className="feed__row" key={s.id}>
                <span className="av av--staff" aria-hidden="true" style={{ '--h': 'var(--h1)' } as React.CSSProperties}>
                  {s.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  {s.status === 'in' && <i className="av__dot" />}
                </span>
                <span className="feed__text">
                  <b>{s.name}</b><small>{s.role} · {s.dept}</small>
                </span>
                <span className={`pill ${PILL[s.status].cls}`}>{PILL[s.status].label}</span>
                {s.status !== 'in' && (
                  s.chased
                    ? <span className="ask__soon"><Ico name="check" className="ico ico--sm" />Chased</span>
                    : <button type="button" className="btn btn--sm td-wait__chase" onClick={() => doChase(s)}>Chase</button>
                )}
              </li>
            ))}
          </ul>

          {issues.length === 0 && <p className="muted">Everyone on today’s rota is accounted for.</p>}
        </section>
      </div>
    </>
  )
}
