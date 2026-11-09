import { useEffect, useRef } from 'react'
import { useActions } from '../lib/actions'

/**
 * Renders a reference HTML snapshot and makes EVERY control on it work.
 *
 * Reference snapshots ship inert buttons, non-functional links and disabled
 * forms. This layer gives them real behaviour:
 *   • chip / segmented toggles  → aria-pressed flips, sibling chips reset
 *   • links                     → SPA navigation via the hash router
 *   • forms / inputs            → typing works, Save/Undo enable on dirty
 *   • action buttons            → a descriptive toast (approve, decline, chase…)
 *   • drag-and-drop boards      → real HTML5 drag between day columns/tracks
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
    enableDragTargets(host)

    /* ---------------------------------------------------------------- links */
    const onLink = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || !host.contains(a)) return
      const href = a.getAttribute('href') || ''
      if (href.startsWith('#/') || href === '#') {
        e.preventDefault()
        location.hash = href
        toast(`Opened ${(a.textContent || '').trim() || href.replace('#/', '')}`)
      }
    }

    /* -------------------------------------------------------------- buttons */
    const onButton = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest?.('button') as HTMLButtonElement | null
      if (!btn || !host.contains(btn) || btn.disabled) return

      // Let the rota/hiring drag targets and inputs keep their own behaviour
      if (btn.closest('[draggable="true"]')) return

      const label = (btn.textContent || '').trim()
      const lower = label.toLowerCase()

      // Segmented controls and filter chips: single-select within the group
      if (btn.hasAttribute('aria-pressed')) {
        const group = btn.closest('[role="group"], .chips, .seg, .td-floor__seg')
        const wasSelected = btn.getAttribute('aria-pressed') === 'true'
        const label0 = (btn.textContent || '').trim()

        // Clicking the already-selected chip is a no-op for exclusive groups
        // (the first chip is usually "All …"), so keep it selected.
        if (wasSelected) { toast(`${label0} is already selected`); return }

        if (group) {
          group.querySelectorAll('button[aria-pressed]').forEach(b => {
            if (b !== btn) b.setAttribute('aria-pressed', 'false')
          })
        }
        btn.setAttribute('aria-pressed', 'true')
        toast(`${label0} selected`)
        return
      }

      if (lower.includes('chase')) toast(`Chased — asked for an ETA`)
      else if (lower.includes('approve all')) toast('All approved')
      else if (lower.includes('approve')) toast('Approved')
      else if (lower.includes('decline') || lower.includes('reject')) toast('Declined')
      else if (lower.includes('book leave')) toast('Leave booked')
      else if (lower.includes('add a shift')) toast('Shift added')
      else if (lower.includes('book')) toast('Booked')
      else if (lower.includes('save')) { markFormsSaved(host); toast('Saved') }
      else if (lower.includes('undo')) { resetForms(host); toast('Changes reverted') }
      else if (lower.includes('print')) toast('Printing…')
      else if (lower.includes('export')) toast('Exported')
      else if (lower.includes('publish') || lower.includes('send')) toast('Published')
      else if (lower.includes('remind') || lower.includes('nudge')) toast('Reminder sent')
      else if (lower.includes('copy')) toast('Copied')
      else if (lower.includes('new') || lower.includes('create') || lower.includes('add')) toast('Created')
      else if (lower.includes('edit')) toast('Edit opened')
      else if (lower.includes('review all') || lower.includes('review')) toast('Reviews opened')
      else if (lower.includes('grant')) toast('Invitation sent')
      else if (lower.includes('reset')) toast('Demo data reset')
      else if (lower.includes('download')) toast('Downloaded')
      else if (lower.includes('email')) toast('Email sent')
      else if (lower.includes("i'm going") || lower === 'going') toast("You're going")
      else if (lower.includes('looks right') || lower.includes('confirm')) toast('Confirmed')
      else if (lower.includes('send question') || lower.includes('send')) toast('Sent')
      else if (lower.includes('more')) toast('More options')
      else toast(`Clicked: ${label}`)
    }

    /* ---------------------------------------------------------------- forms */
    // Reference forms ship disabled Save/Undo. Enable them once the user edits.
    const onInput = () => refreshFormState(host)
    host.addEventListener('input', onInput)

    /* ----------------------------------------------------------- drag & drop */
    // Rota shift cards and hiring candidates keep draggable markup.
    let dragId: string | null = null
    const onDragStart = (e: DragEvent) => {
      const card = (e.target as HTMLElement).closest?.('[draggable="true"]') as HTMLElement | null
      if (!card) return
      dragId = card.getAttribute('data-id') || card.className
      card.classList.add('is-drag')
      e.dataTransfer && (e.dataTransfer.effectAllowed = 'move')
    }
    const onDragEnd = (e: DragEvent) => {
      ;(e.target as HTMLElement).closest?.('[draggable="true"]')?.classList.remove('is-drag')
      dragId = null
    }
    const onDragOver = (e: DragEvent) => {
      const cell = (e.target as HTMLElement).closest?.('[data-drop]') as HTMLElement | null
      if (cell) { e.preventDefault(); cell.classList.add('is-over') }
    }
    const onDragLeave = (e: DragEvent) => {
      ;(e.target as HTMLElement).closest?.('[data-drop]')?.classList.remove('is-over')
    }
    const onDrop = (e: DragEvent) => {
      const cell = (e.target as HTMLElement).closest?.('[data-drop]') as HTMLElement | null
      if (!cell || !dragId) return
      e.preventDefault()
      cell.classList.remove('is-over')
      const card = host.querySelector('.is-drag') as HTMLElement | null
      if (card && cell !== card.parentElement) {
        cell.appendChild(card)
        const to = cell.getAttribute('data-drop')
        toast(`Moved ${(card.textContent || '').trim().split('\n')[0].slice(0, 24)} → ${to || 'that slot'}`)
      }
      refreshFormState(host)
    }

    host.addEventListener('click', onLink)
    host.addEventListener('click', onButton)
    host.addEventListener('dragstart', onDragStart)
    host.addEventListener('dragend', onDragEnd)
    host.addEventListener('dragover', onDragOver)
    host.addEventListener('dragleave', onDragLeave)
    host.addEventListener('drop', onDrop)

    return () => {
      host.removeEventListener('click', onLink)
      host.removeEventListener('click', onButton)
      host.removeEventListener('input', onInput)
      host.removeEventListener('dragstart', onDragStart)
      host.removeEventListener('dragend', onDragEnd)
      host.removeEventListener('dragover', onDragOver)
      host.removeEventListener('dragleave', onDragLeave)
      host.removeEventListener('drop', onDrop)
    }
  }, [html, cacheKey, toast])

  return <div ref={ref} />
}

/* ------------------------------------------------------------------ helpers */

/** Enable Save/Undo in any form whose fields differ from their initial value. */
function refreshFormState(host: HTMLElement) {
  host.querySelectorAll('form, .card').forEach(scope => {
    const inputs = Array.from(scope.querySelectorAll('input, select, textarea')) as HTMLInputElement[]
    if (!inputs.length) return
    const dirty = inputs.some(el => el.value !== (el.getAttribute('value') ?? el.value))
    scope.querySelectorAll('button[type="submit"], button.btn--primary').forEach(b => { (b as HTMLButtonElement).disabled = !dirty })
    const undo = Array.from(scope.querySelectorAll('button')).find(b => /undo/i.test(b.textContent || ''))
    if (undo) (undo as HTMLButtonElement).disabled = !dirty
  })
}

function markFormsSaved(host: HTMLElement) {
  host.querySelectorAll('input, select, textarea').forEach(el => {
    const field = el as HTMLInputElement
    if (field.hasAttribute('value')) field.setAttribute('value', field.value)
  })
  refreshFormState(host)
}

function resetForms(host: HTMLElement) {
  host.querySelectorAll('input, select, textarea').forEach(el => {
    const field = el as HTMLInputElement
    const original = field.getAttribute('value')
    if (original !== null) field.value = original
  })
  refreshFormState(host)
}

/** One parsed template per distinct view, reused across revisits. */
const tplCache = new Map<string, HTMLTemplateElement>()

/**
 * The reference snapshot has no drag state on its cards or drop zones, so this
 * adds the attributes the drag handlers above look for. Rota shift cards become
 * draggable and every day column becomes a drop target; hiring candidate cards
 * become draggable and every pipeline column becomes a drop target.
 */
function enableDragTargets(host: HTMLElement) {
  // Rota week grid: each day cell is a drop target for shift chips.
  host.querySelectorAll('.rt-cell, .rt-gday, .rt-cov__day')
    .forEach((el, i) => {
      if (!el.getAttribute('data-drop')) {
        const day = el.closest('.rt-row')?.querySelector('.rt-name')?.textContent || ''
        el.setAttribute('data-drop', (day.trim() || `day ${(i % 7) + 1}`))
      }
      el.classList.add('drop-zone')
    })

  // Hiring pipeline board: each stage column is a drop target.
  host.querySelectorAll('.rc-col, [class*="pipeline"] [class*="col"], [class*="board"] [class*="col"]')
    .forEach(el => {
      if (!el.getAttribute('data-drop')) {
        el.setAttribute('data-drop', ((el.querySelector('b, h3, h4, small')?.textContent || '').trim()) || 'pipeline')
      }
      el.classList.add('drop-zone')
    })

  // Shift chips and candidate cards become draggable, with a stable id.
  host.querySelectorAll('.rchip, .shift, .rc-card, [class*="shift-chip"]')
    .forEach((el, i) => {
      el.setAttribute('draggable', 'true')
      if (!el.getAttribute('data-id')) el.setAttribute('data-id', `${el.className.split(' ')[0]}-${i}`)
    })
}
