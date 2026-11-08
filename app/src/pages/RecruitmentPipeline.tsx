import { useEffect, useRef, useState } from 'react'
import { Ico } from '../lib/icons'
import { Tabs } from '../components/Chrome'
import { useActions, type Candidate } from '../lib/actions'

const STAGES: { id: Candidate['stage']; label: string }[] = [
  { id: 'applied', label: 'Applied' },
  { id: 'screen', label: 'Phone screen' },
  { id: 'interview', label: 'Interview' },
  { id: 'offer', label: 'Offer' },
  { id: 'hired', label: 'Hired' },
]

const initials = (n: string) => n.split(' ').map(w => w[0]).join('').slice(0, 2)

/** Recruitment > Pipeline — drag candidates between stages, or use the move menu. */
export function RecruitmentPipeline() {
  const { candidates, moveCandidate, toast } = useActions()
  const [drag, setDrag] = useState<string | null>(null)
  const [over, setOver] = useState<Candidate['stage'] | null>(null)
  const head = useRef<HTMLHeadingElement>(null)
  useEffect(() => { head.current?.focus() }, [])

  const move = (c: Candidate, dir: -1 | 1) => {
    const i = STAGES.findIndex(s => s.id === c.stage)
    const next = STAGES[Math.max(0, Math.min(STAGES.length - 1, i + dir))]
    if (next.id === c.stage) return
    moveCandidate(c.id, next.id)
    toast(`${c.name.split(' ')[0]} → ${next.label}`)
  }

  return (
    <>
      <Tabs />
      <div className="page rc">
        <header className="phead">
          <div className="phead__text">
            <h1 tabIndex={-1} ref={head}>Hiring pipeline</h1>
            <p>{candidates.length} candidates in play · drag a card, or use its arrows</p>
          </div>
          <div className="phead__actions">
            <button type="button" className="btn btn--primary" onClick={() => toast('Add candidate — paste a CV or link')}>
              <Ico name="userPlus" />Add candidate
            </button>
          </div>
        </header>

        <section className="card rc-board">
          {STAGES.map(sg => {
            const list = candidates.filter(c => c.stage === sg.id)
            return (
              <div key={sg.id}
                className={`rc-col${over === sg.id ? ' is-over' : ''}`}
                onDragOver={e => { e.preventDefault(); setOver(sg.id) }}
                onDragLeave={() => setOver(o => (o === sg.id ? null : o))}
                onDrop={() => {
                  const c = candidates.find(x => x.id === drag)
                  if (c && c.stage !== sg.id) {
                    moveCandidate(c.id, sg.id)
                    toast(`${c.name.split(' ')[0]} → ${sg.label}`)
                  }
                  setDrag(null); setOver(null)
                }}>
                <div className="rc-col__head">
                  <b>{sg.label}</b><span className="badge">{list.length}</span>
                </div>

                {list.map(c => {
                  const i = STAGES.findIndex(s => s.id === c.stage)
                  return (
                    <article key={c.id}
                      className={`rc-card card${drag === c.id ? ' is-drag' : ''}`}
                      draggable
                      data-lift="true"
                      onDragStart={() => setDrag(c.id)}
                      onDragEnd={() => { setDrag(null); setOver(null) }}>
                      <span className="av av--sm av--staff" aria-hidden="true" style={{ '--h': 'var(--h1)' } as React.CSSProperties}>
                        {initials(c.name)}
                      </span>
                      <span className="cell__text">
                        <b>{c.name}</b><small>{c.role}</small>
                        <small className="muted">{c.site} · {c.days}d in stage</small>
                      </span>
                      <span className="rc-card__moves">
                        <button type="button" aria-label={`Move ${c.name} back`} disabled={i === 0}
                          onClick={() => move(c, -1)}><Ico name="chevL" className="ico ico--sm" /></button>
                        <button type="button" aria-label={`Move ${c.name} forward`} disabled={i === STAGES.length - 1}
                          onClick={() => move(c, 1)}><Ico name="chevR" className="ico ico--sm" /></button>
                      </span>
                    </article>
                  )
                })}

                {list.length === 0 && <p className="rc-col__empty muted">Drop a candidate here</p>}
              </div>
            )
          })}
        </section>
      </div>
    </>
  )
}
