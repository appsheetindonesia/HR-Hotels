import { memo, useEffect, useRef } from 'react'

/**
 * Renders a captured reference HTML string into the view.
 *
 * Setting innerHTML on a 100KB string forces the browser to re-parse it on
 * every render, which is what made page changes stutter (~60ms main-thread
 * stalls). Instead we parse once into a <template> and clone its content —
 * cloning is far cheaper than parsing — and we never re-render when props
 * are unchanged.
 *
 * The key on the caller changes with the route, so each distinct view gets its
 * own component instance and its own cached template.
 */
export const HtmlView = memo(function HtmlView({ html, cacheKey }: { html: string; cacheKey: string }) {
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
  }, [html, cacheKey])

  return <div ref={ref} />
})

/** One parsed template per distinct view, reused across revisits. */
export const tplCache = new Map<string, HTMLTemplateElement>()
