import { useEffect, useRef } from 'react'
import { Ico } from '../lib/icons'
import { Tabs } from '../components/Chrome'
import { useActions, type StaffNow } from '../lib/actions'

const PILL: Record<StaffNow['status'], { cls: string; label: string }> = {
  in: { cls: 'pill--good', label: 'On shift' },
  late: { cls: 'pill--warn', label: 'Late' },
  missing: { cls: 'pill--bad', label: 'Missing' },
}

// Hour-by-hour staffing curve (deterministic sample, matches demo scale)
const CURVE = [2, 17, 38, 53, 58, 65, 66, 66, 57, 41, 33, 20, 15, 9, 8, 8, 8, 2]

function curvePath() {
  const w = 170, h = 140, n = CURVE.length
  const max = Math.max(...CURVE, 1)
  const pts = CURVE.map((v, i) => {
    const x = (i / (n - 1)) * w
    const y = h - (v / max) * h * 0.85
    return i === 0 ? `M${x},${y}` : `L${x},${y}`
  })
  return pts.join(' ') + `L${w},${h}L0,${h}Z`
}

export function Today() {
  const { staff, chase, toast } = useActions()
  const head = useRef<HTMLHeadingElement>(null)
  useEffect(() => { head.current?.focus() }, [])

  const doChase = (s: StaffNow) => {
    chase(s.id)
    toast(`Chased ${s.name.split(' ')[0]} — ${s.status === 'missing' ? 'asked to call the floor' : 'asked for an ETA'}`)
  }

  const onCount = staff.filter(s => s.status === 'in').length
  const late = staff.filter(s => s.status === 'late').length
  const missing = staff.filter(s => s.status === 'missing').length

  return (
    <>
      <Tabs />
      <div className="page td">
        <header className="phead">
          <div className="phead__text">
            <h1 tabIndex={-1} ref={head}>Today</h1>
            <p>Tue 3 Nov · {onCount} of 58 people due so far are in, and {missing} didn’t show (front desk, housekeeping)</p>
          </div>
          <div className="phead__actions">
            <button type="button" className="btn" onClick={() => toast('Created shift — front desk 07:00–15:00')}>
              <Ico name="plus" />Add a shift
            </button>
            <button type="button" className="btn btn--primary" onClick={() => toast('Booked leave — Priya Raman, annual 7–9 Nov')}>
              <Ico name="plane" />Book leave
            </button>
          </div>
        </header>

        <div className="kpis">
          <div className="kpi kpi--1">
            <span className="kpi__label"><Ico name="floor" />On the floor now</span>
            <span className="kpi__value">{onCount} / 74</span>
            <span className="kpi__foot">{Math.round(onCount / 74 * 100)}% of those due are in</span>
          </div>
          <div className="kpi kpi--3">
            <span className="kpi__label"><Ico name="clock" />Late or missing</span>
            <span className="kpi__value">{late}</span>
            <span className="kpi__foot">{late} late · {missing} no-show</span>
          </div>
          <div className="kpi kpi--4">
            <span className="kpi__label"><Ico name="tray" />Off today</span>
            <span className="kpi__value">{missing}</span>
            <span className="kpi__foot">6 people</span>
          </div>
          <div className="kpi kpi--4">
            <span className="kpi__label"><Ico name="clock" />Open shifts today</span>
            <span className="kpi__value">2</span>
            <span className="kpi__foot">House · Restaurant</span>
          </div>
        </div>

        <section className="card td-floor">
          <div className="chead">
            <div className="chead__text"><h2>The floor today</h2><p>74 shifts across three hotels · 563 hours rota’d</p></div>
            <div className="seg td-floor__seg" role="group" aria-label="View">
              <button type="button" aria-pressed>Everyone</button>
              <button type="button">Front</button>
              <button type="button">House</button>
              <button type="button">Kitchen</button>
              <button type="button">Restaurant</button>
              <button type="button">Spa</button>
              <button type="button">Ops</button>
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
                  s.chased ? (
                    <span className="ask__soon"><Ico name="check" className="ico ico--sm" />Chased</span>
                  ) : (
                    <button type="button" className="btn btn--sm td-wait__chase" onClick={() => doChase(s)}>Chase</button>
                  )
                )}
              </li>
            ))}
          </ul>

          <p className="muted">Everyone on today’s rota is accounted for.</p>
        </section>

        <section className="card td-att">
          <div className="chead">
            <div className="chead__text">
              <h2>Attendance, last 30 days</h2>
              <p>People in as a share of people rota’d</p>
            </div>
          </div>

          <div className="area">
            <div className="area__grid" aria-hidden="true">
              {Array(7).fill(0).map((_, i) => (
                <div key={i}>
                  <span>{8 + i * 2}</span>
                </div>
              ))}
            </div>
            <div className="area__svg" aria-label="People in as a share of people rota’d">
              <svg viewBox="0 0 170 140" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#c24a22" stopOpacity=".26" />
                    <stop offset="1" stopColor="#c24a22" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path className="area__fill" fill="url(#areaFill)" d={curvePath()} />
              </svg>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
