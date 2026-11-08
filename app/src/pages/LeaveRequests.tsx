import { useEffect, useRef } from 'react'
import { Ico } from '../lib/icons'
import { Tabs } from '../components/Chrome'
import { useActions, type LeaveRequest } from '../lib/actions'

const TYPE_LABEL: Record<string, string> = {
  annual: 'Annual leave', sick: 'Sick leave', toil: 'TOIL',
  parental: 'Parental leave', unpaid: 'Unpaid', compassionate: 'Compassionate',
}

/** Leave > Requests — approve/decline moves the request and updates the counters. */
export function LeaveRequests() {
  const { leave, decideLeave, toast } = useActions()
  const head = useRef<HTMLHeadingElement>(null)
  useEffect(() => { head.current?.focus() }, [])

  const pending = leave.filter(r => r.status === 'pending')
  const decided = leave.filter(r => r.status !== 'pending')
  const workingDays = pending.reduce((a, r) => a + r.days, 0)

  const decide = (r: LeaveRequest, decision: 'approved' | 'declined') => {
    decideLeave(r.id, decision)
    toast(
      decision === 'approved'
        ? `${r.name.split(' ')[0]}'s ${TYPE_LABEL[r.type]?.toLowerCase() ?? 'leave'} approved · ${r.days} day${r.days > 1 ? 's' : ''}`
        : `${r.name.split(' ')[0]}'s request declined`,
      decision === 'declined'
    )
  }

  return (
    <>
    <Tabs />
    <div className="page">
      <header className="phead">
        <div className="phead__text">
          <h1 tabIndex={-1} ref={head}>Leave requests</h1>
          <p>
            {pending.length} waiting on a decision.
            {pending.length ? ' 2 of them start within a week.' : ' All caught up — nothing to decide.'}
          </p>
        </div>
        <div className="phead__actions">
          <button type="button" className="btn btn--primary magnetic" onClick={() => toast('Book leave — pick the dates in the calendar')}>
            <Ico name="plus" />Book leave
          </button>
        </div>
      </header>

      <div className="kpis lv-kpis">
        <div className="kpi kpi--1">
          <span className="kpi__label"><Ico name="tray" />Waiting on you</span>
          <span className="kpi__value">{pending.length}</span>
          <span className="kpi__foot">{workingDays} working days asked for</span>
        </div>
        <div className="kpi kpi--3">
          <span className="kpi__label"><Ico name="clock" />Starting this week</span>
          <span className="kpi__value">{pending.filter(r => r.days <= 5).length}</span>
          <span className="kpi__foot">Decide these first</span>
        </div>
        <div className="kpi kpi--2">
          <span className="kpi__label"><Ico name="check" />Decided today</span>
          <span className="kpi__value">{decided.length}</span>
          <span className="kpi__foot">Approved and declined</span>
        </div>
      </div>

      {pending.length === 0 && (
        <section className="card">
          <p className="muted">No requests are waiting on you. New ones appear here the moment they’re submitted.</p>
        </section>
      )}

      {pending.map(r => (
        <section className="card lv-req" key={r.id}>
          <div className="chead">
            <span className="av av--staff" aria-hidden="true" style={{ '--h': 'var(--h1)' } as React.CSSProperties}>
              {r.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </span>
            <div className="chead__text">
              <h2>{r.name}</h2>
              <p>{r.role} · {r.dept} · {r.emp}</p>
            </div>
            <span className="ask__type" style={{ '--cc': 'var(--c1)' } as React.CSSProperties}>{TYPE_LABEL[r.type]}</span>
          </div>

          <div className="lv-req__body">
            <div className="lv-req__when">
              <Ico name="cal" className="ico ico--sm" />
              <b>{r.from} → {r.to}</b>
              <span className="muted">{r.days} working day{r.days > 1 ? 's' : ''}</span>
            </div>
            {r.note ? <p className="lv-req__note">“{r.note}”</p> : <p className="muted">No note left.</p>}
          </div>

          <div className="ask__btns">
            <button type="button" className="btn ask__ok" onClick={() => decide(r, 'approved')}>
              <Ico name="check" />Approve
            </button>
            <button type="button" className="btn ask__no" onClick={() => decide(r, 'declined')}>
              <Ico name="x" />Decline
            </button>
          </div>
        </section>
      ))}

      {decided.length > 0 && (
        <section className="card">
          <div className="chead">
            <div className="chead__text"><h2>Decided today</h2><p>Your decisions are final — the balance and rota already updated</p></div>
          </div>
          <ul className="feed">
            {decided.map(r => (
              <li className="feed__row" key={r.id}>
                <span className="av av--sm av--staff" aria-hidden="true" style={{ '--h': 'var(--h1)' } as React.CSSProperties}>
                  {r.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </span>
                <span className="feed__text">
                  <b>{r.name}</b><small>{TYPE_LABEL[r.type]} · {r.from} → {r.to}</small>
                </span>
                <span className={`pill ${r.status === 'approved' ? 'pill--good' : 'pill--bad'}`}>
                  {r.status === 'approved' ? 'Approved' : 'Declined'}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
    </>
  )
}
