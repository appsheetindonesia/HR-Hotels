import { Ico } from '../lib/icons'
import { gsap } from 'gsap'
import { useEffect } from 'react'

type Notification = {
  id: string
  title: string
  body: string
  time: string
  read: boolean
  onClick?: () => void
}

const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Rota mingguan siap dipublikasikan',
    body: 'Semua shift untuk minggu 2–8 November telah terisi dan diverifikasi.',
    time: '2 jam yang lalu',
    read: false,
  },
  {
    id: 'n2',
    title: '2 karyawan belum hadir hari ini',
    body: 'Front desk dan Housekeeping — silakan chase.',
    time: '5 jam yang lalu',
    read: false,
  },
  {
    id: 'n3',
    title: 'Permintaan cuti baru menunggu persetujuan',
    body: 'Priya Raman — Annual leave, 7–9 Nov.',
    time: '8 jam yang lalu',
    read: false,
  },
  {
    id: 'n4',
    title: 'Payroll November telah difinalisasi',
    body: 'Payslip siap diunduh untuk semua karyawan.',
    time: '1 hari yang lalu',
    read: true,
  },
]

export function NotificationPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!isOpen) return
    const tl = gsap.timeline()
    tl.fromTo('.scrim', { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
    tl.fromTo('.drawer', { x: '100%' }, { x: 0, duration: 0.45, ease: 'power3.out' }, 0.05)
    return () => { tl.kill() }
  }, [isOpen])

  if (!isOpen) return null
  const unread = NOTIFICATIONS.filter(n => !n.read).length

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <nav className="drawer" aria-label="Notifications" onClick={e => e.stopPropagation()}>
        <div className="drawer__head">
          <button type="button" className="ibtn ibtn--flat" aria-label="Close notifications" onClick={onClose}>
            <Ico name="x" />
          </button>
          <span className="drawer__label">Notifications</span>
          <span className="drawer__label" style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--muted)' }}>{unread} unread</span>
        </div>
        <div className="drawer__body">
          {NOTIFICATIONS.map(n => (
            <a key={n.id}
              href="#"
              onClick={e => { e.preventDefault(); onClose() }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '10px 14px',
                borderRadius: 12,
                textDecoration: 'none',
                color: 'inherit',
                background: n.read ? 'transparent' : 'var(--accent-soft)',
              }}>
              <Ico name="bell" className="ico ico--sm" />
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontWeight: 600, minWidth: 0 }}>{n.title}</span>
                  <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--muted)' }}>{n.time}</span>
                </div>
                <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--ink-2)', whiteSpace: 'pre-wrap', marginTop: 2, display: 'block' }}>{n.body}</span>
              </div>
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}
