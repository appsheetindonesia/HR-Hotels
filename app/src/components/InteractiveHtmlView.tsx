import { useEffect, useRef } from 'react'
import { useActions } from '../lib/actions'

/**
 * InteractiveHtmlView renders a reference HTML snapshot and makes EVERY button
 * clickable. Reference pages ship buttons that do nothing; this layer adds
 * real behavior:
 *   • Chip/filter buttons toggle (aria-pressed)
 *   • Approve/decline/chase/book/add actions trigger toasts
   *   Everything else shows a descriptive toast
 *
 * Used for pages that are still snapshot HTML (not yet full React components).
 */
export function InteractiveHtmlView({ html, cacheKey }: { html: string; cacheKey: string }) {
  const { toast } = useActions()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = ref.current
    if (!host) return

    const key = `rotela:tpl:${cacheKey}`
    let tpl = tplCache.get(key)
    if (!tpl) {
      tpl = document.createElement('template')
      tpl.innerHTML = html
      tplCache.set(key, tpl)
    }

    host.replaceChildren(tpl.content.cloneNode(true))

    const handleClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest('button')
      if (!btn || !host.contains(btn)) return
      e.preventDefault()

      const label = (btn.textContent || '').trim()

      // Toggle chips / segmented buttons
      if (btn.getAttribute('aria-pressed') !== null) {
        const pressed = btn.getAttribute('aria-pressed') === 'true'
        btn.setAttribute('aria-pressed', String(!pressed))
        toast(`${label} ${!pressed ? 'selected' : 'deselected'}`)
        return
      }

      const lower = label.toLowerCase()

      if (lower.includes('chase')) {
        toast(`Chased staff`)
      } else if (lower.includes('approve')) {
        toast(`Approved`)
      } else if (lower.includes('decline')) {
        toast(`Declined`)
      } else if (lower.includes('book leave')) {
        toast('Leave booked')
      } else if (lower.includes('add a shift')) {
        toast('Shift added')
      } else if (lower.includes('book ')) {
        toast('Booked')
      } else if (lower.includes('save')) {
        toast('Saved')
      } else if (lower.includes('cancel')) {
        toast('Cancelled')
      } else if (lower.includes('print')) {
        toast('Printing...')
      } else if (lower.includes('export')) {
        toast('Exported')
      } else if (lower.includes('create') || lower.includes('new')) {
        toast('Created')
      } else if (lower.includes('edit')) {
        toast('Edit opened')
      } else if (lower.includes('delete')) {
        toast('Deleted')
      } else if (lower.includes('search') || lower.includes('find')) {
        toast('Search opened')
      } else if (lower.includes('more')) {
        toast('More options')
      } else if (lower.includes('send') || lower.includes('publish')) {
        toast('Published')
      } else if (lower.includes('copy')) {
        toast('Copied')
      } else if (lower.includes('remind')) {
        toast('Reminder sent')
      } else if (lower.includes('approve all')) {
        toast('All approved')
      } else if (lower.includes('reject all')) {
        toast('All rejected')
      } else if (lower.includes('review') || lower.includes('review all')) {
        toast('Reviews opened')
      } else {
        toast(`Clicked: ${label}`)
      }
    }

    host.addEventListener('click', handleClick)
    return () => host.removeEventListener('click', handleClick)
  }, [html, cacheKey, toast])

  return <div ref={ref} />
}

/** One parsed template per distinct view, reused across revisits. */
const tplCache = new Map<string, HTMLTemplateElement>()
