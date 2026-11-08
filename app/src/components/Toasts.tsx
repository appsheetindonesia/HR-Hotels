import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { Ico } from '../lib/icons'
import { useActions } from '../lib/actions'

/**
 * Toast stack — same markup/classes as the reference `.toasts`/`.toast`.
 * Each toast pops in with the reference toast motion (back.out(1.8)) and
 * slides out when dismissed.
 */
export function Toasts() {
  const { toasts, dismiss } = useActions()

  return (
    <div className="toasts" role="region" aria-label="Notifications">
      {toasts.map(t => (
        <Toast key={t.id} text={t.text} warn={t.warn} onClose={() => dismiss(t.id)} />
      ))}
    </div>
  )
}

function Toast({ text, warn, onClose }: { text: string; warn?: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { y: 30, opacity: 0, scale: 0.94 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)', clearProps: 'transform,opacity' }
    )
  }, [])

  return (
    <div ref={ref} className={`toast${warn ? ' is-warn' : ''}`} role="status">
      <Ico name={warn ? 'warn' : 'check'} />
      <span>{text}</span>
      <button type="button" onClick={() => {
        gsap.to(ref.current, {
          y: 16, opacity: 0, duration: 0.25, ease: 'power2.in',
          onComplete: onClose,
        })
      }}>Dismiss</button>
    </div>
  )
}
