import { useEffect, useRef, useState } from 'react'
import { Ico } from '../lib/icons'
import { Tabs } from '../components/Chrome'
import { useActions } from '../lib/actions'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const DEPTS: Record<string, { icon: string; cc: string }> = {
  'Front desk': { icon: 'bell', cc: 'var(--c1)' },
  'Housekeeping': { icon: 'bed', cc: 'var(--c2)' },
  'Kitchen': { icon: 'chef', cc: 'var(--c3)' },
  'Restaurant & bar': { icon: 'cup', cc: 'var(--c4)' },
  'Spa & leisure': { icon: 'drop', cc: 'var(--c5)' },
  'Operations': { icon: 'wrench', cc: 'var(--c6)' },
}

const hour = (h: number) => `${String(h).padStart(2, '0')}:00`

/**
 * Attendance > Rota — the week grid is a real drag-and-drop board. Every shift
 * also carries Move buttons so the interaction works without a pointer
 * (keyboard and touch users), which the reference grid does not offer.
 */
export function AttendanceRota() {
  const { shifts, moveShift, dropShiftOnDay, toast } = useActions()
  const [drag, setDrag] = useState<string | null>(null)
  const [over, setOver] = useState<number | null>(null)
  const head = useRef<HTMLHeadingElement>(null)
  useEffect(() => { head.current?.focus() }, [])

  const onDrop = (day: number) => {
    if (drag) {
      dropShiftOnDay(drag, day)
      const s = shifts.find(x => x.id === drag)
      if (s && s.day !== day) toast(`${s.name.split(' ')[0]} moved to ${DAYS[day]}`)
    }
    setDrag(null)
    setOver(null)
  }

  return (
    <>
      <Tabs />
      <div className="page at rota">
        <header className="phead">
          <div className="phead__text">
            <h1 tabIndex={-1} ref={head}>Rota</h1>
            <p>Week of 2 Nov · drag a shift to another day, or use its move buttons</p>
          </div>
          <div className="phead__actions">
            <button type="button" className="btn" onClick={() => toast('Copied last week’s rota', true)}>
              <Ico name="undo" />Copy last week
            </button>
            <button type="button" className="btn btn--primary" onClick={() => toast('Rota published to 74 people')}>
              <Ico name="send" />Publish
            </button>
          </div>
        </header>

        <section className="card rota__grid">
          <div className="rota__days" role="row">
            <span className="rota__corner" />
            {DAYS.map((d, i) => (
              <div key={d} className={`rota__day${over === i ? ' is-over' : ''}`}
                onDragOver={e => { e.preventDefault(); setOver(i) }}
                onDragLeave={() => setOver(o => (o === i ? null : o))}
                onDrop={() => onDrop(i)}>
                <b>{d}</b>
                <small>{3 + i} Nov</small>
              </div>
            ))}
          </div>

          <div className="rota__body">
            {shifts.map(s => (
              <div key={s.id}
                className={`rota__row${drag === s.id ? ' is-drag' : ''}`}
                draggable
                onDragStart={() => setDrag(s.id)}
                onDragEnd={() => { setDrag(null); setOver(null) }}>
                <span className="cell who rota__who">
                  <span className="av av--sm av--staff" aria-hidden="true" style={{ '--h': 'var(--h1)' } as React.CSSProperties}>
                    {s.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                  <span className="cell__text"><b>{s.name}</b><small>{s.role}</small></span>
                </span>

                {DAYS.map((d, i) => (
                  <div key={d} className={`rota__cell${s.day === i ? ' is-on' : ''}${over === i ? ' is-over' : ''}`}
                    onDragOver={e => { e.preventDefault(); setOver(i) }}
                    onDragLeave={() => setOver(o => (o === i ? null : o))}
                    onDrop={() => onDrop(i)}>
                    {s.day === i && (
                      <span className="shift" style={{ '--cc': DEPTS[s.dept]?.cc } as React.CSSProperties}>
                        <i className="shift__bar" />
                        <span className="shift__time">{hour(s.start)}–{hour(s.end)}</span>
                        <span className="dtag" style={{ '--cc': DEPTS[s.dept]?.cc } as React.CSSProperties}>
                          <Ico name={DEPTS[s.dept]?.icon ?? 'grid'} className="ico ico--sm" />{s.dept}
                        </span>
                        <span className="shift__moves">
                          <button type="button" aria-label={`Move ${s.name} earlier`} disabled={s.day === 0}
                            onClick={() => { moveShift(s.id, -1); toast(`${s.name.split(' ')[0]} → ${DAYS[Math.max(0, s.day - 1)]}`) }}>
                            <Ico name="chevL" className="ico ico--sm" />
                          </button>
                          <button type="button" aria-label={`Move ${s.name} later`} disabled={s.day === 6}
                            onClick={() => { moveShift(s.id, 1); toast(`${s.name.split(' ')[0]} → ${DAYS[Math.min(6, s.day + 1)]}`) }}>
                            <Ico name="chevR" className="ico ico--sm" />
                          </button>
                        </span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}

            <div className="rota__row rota__row--open"
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); toast('Drop a person here to cover the gap', true) }}>
              <span className="rota__who muted"><Ico name="plus" className="ico ico--sm" />Open shift</span>
              {DAYS.map(d => (
                <div key={d} className="rota__cell is-open"><span className="shift shift--open">Needs cover</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className="card">
          <div className="chead">
            <div className="chead__text">
              <h2>Conflicts and approved leave</h2>
              <p>Checked on every move, not just on publish</p>
            </div>
          </div>
          <ul className="feed">
            <li className="feed__row">
              <span className="td-up__ico"><Ico name="check" /></span>
              <span className="feed__text"><b>No clashes</b><small>Nobody is double-booked this week</small></span>
            </li>
            <li className="feed__row">
              <span className="td-up__ico"><Ico name="plane" /></span>
              <span className="feed__text"><b>2 shifts overlap approved leave</b><small>Agnieszka Costa 9–13 Nov · Mei Tanaka 11 Nov</small></span>
              <button type="button" className="btn btn--sm" onClick={() => toast('Opened the two conflicting shifts', true)}>Review</button>
            </li>
          </ul>
        </section>
      </div>
    </>
  )
}
