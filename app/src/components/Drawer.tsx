import { useRoute, go } from '../lib/route'
import { Ico } from '../lib/icons'
import { gsap } from 'gsap'
import { useEffect } from 'react'

export function Drawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { page } = useRoute()

  // Must run only while the panel is in the DOM — the guard is above so the
  // tween always has a target, and fromTo avoids a flash on the first frame.
  useEffect(() => {
    if (!isOpen) return
    const tl = gsap.timeline()
    tl.fromTo('.scrim', { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
    tl.fromTo('.drawer', { x: '100%' }, { x: 0, duration: 0.45, ease: 'power3.out' }, 0.05)
    return () => {
      tl.kill()
    }
  }, [isOpen])
  if (!isOpen) return null

  const MENU = [
    { id: 'today', label: 'Today', icon: 'grid' },
    { id: 'people', label: 'People', icon: 'people' },
    { id: 'attendance', label: 'Attendance', icon: 'clock' },
    { id: 'leave', label: 'Leave', icon: 'plane' },
    { id: 'payroll', label: 'Payroll', icon: 'wallet' },
    { id: 'performance', label: 'Performance', icon: 'medal' },
    { id: 'recruitment', label: 'Recruitment', icon: 'bars' },
    { id: 'onboarding', label: 'Onboarding', icon: 'checklist' },
    { id: 'analytics', label: 'Analytics', icon: 'chart' },
    { id: 'settings', label: 'Settings', icon: 'gear' },
    { id: 'help', label: 'Help & support', icon: 'help' },
  ]

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <nav className="drawer" aria-label="Main menu" onClick={e => e.stopPropagation()}>
        <div className="drawer__head">
          <button type="button" className="ibtn ibtn--flat drawer__close" aria-label="Close menu" onClick={onClose}>
            <Ico name="x" />
          </button>
        </div>
        <div className="drawer__body">
          {MENU.map(m => (
            <a key={m.id}
              href={`#/${m.id}`}
              aria-current={page === m.id ? 'page' : undefined}
              onClick={e => { e.preventDefault(); go(m.id); onClose() }}
              style={{ display:'flex', alignItems:'center', gap:12, minWidth:0, padding:'10px 14px', borderRadius:12, textDecoration:'none', color:'inherit' }}>
              <Ico name={m.icon} className="ico ico--sm" />
              <span style={{ fontWeight:600, minWidth:0 }}>{m.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}
