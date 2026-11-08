/**
 * Rotela animation manager — mirrors the reference GSAP rig (kit.js / today.js).
 *
 * The reference drives everything through GSAP with these exact helpers:
 *   so()  header      yPercent 115 → 0, rotation 6 → 0, power4.out, .022 stagger
 *   co()  content     opacity/y/scale entrance, expo.out .8s, .06 stagger
 *   lo()  lists       opacity/x/y, power3.out .55s, .04 stagger
 *   uo()  cards       y 40 + alternating rotation, back.out(1.4) .85s, .07 stagger
 *   fo()  bars        scaleY/scaleX 0 → end, expo.out .9s, .03 stagger
 *   po()  pop-in      scale .6 → 1, back.out(3) .6s, .05 stagger
 *   wo()  pill        clipPath inset() morph, power3.inOut .45s
 *   curve             per-column stagger, delay .3 + n*.03, expo.out 1s
 *
 * Pages are injected via innerHTML, so this runs once content exists.
 */
import { gsap } from 'gsap'
import curveData from './data/curve.json'

const EASE_POWER4 = 'power4.out'
const EASE_EXPO = 'expo.out'
const EASE_POWER3 = 'power3.out'
const EASE_BACK14 = 'back.out(1.4)'
const EASE_BACK3 = 'back.out(3)'

function qSel(container: Element, selector: string): HTMLElement[] {
  return Array.from(container.querySelectorAll(selector)) as HTMLElement[]
}

// ---------------------------------------------------------------- pill (wo)
function pillAnimate() {
  const pill = document.querySelector('.snav__pill') as HTMLElement
  const active = document.querySelector('.snav__item[aria-current=page]') as HTMLElement
  const side = document.querySelector('.side') as HTMLElement
  if (!pill || !active || !side) return

  const inset = (t: number, r: number, b: number, l: number) => `inset(${t}px ${r}px ${b}px ${l}px round 12px)`
  const from = { t: 25, r: 4, b: 578, l: 4 }
  const to = { t: 0, r: 0, b: 0, l: 0 }
  const a = active.getBoundingClientRect()
  const s = side.getBoundingClientRect()

  gsap.killTweensOf(pill)
  gsap.set(pill, { clipPath: inset(from.t, from.r, from.b, from.l), opacity: 1 })
  gsap.fromTo(
    pill,
    { clipPath: inset(from.t, from.r, from.b, from.l), x: 0, y: 0 },
    {
      clipPath: inset(to.t, to.r, to.b, to.l),
      x: a.left - s.left,
      y: a.top - s.top,
      width: a.width,
      height: a.height,
      duration: 0.45,
      ease: 'power3.inOut',
    }
  )
}

// ------------------------------------------------------------------- curve
/**
 * The reference computes each bar as scaleY = count/max and stacks departments
 * with y = -(cumulative/max) * columnHeight. Those exact end states are captured
 * from the live demo in curve.json, so we replay the identical motion:
 * fromTo({scaleY:0,y:0}) with duration 1s, delay .3 + columnIndex*.03, expo.out.
 */
function curveAnimate(container: Element) {
  const cols = qSel(container, '.curve__col')
  if (!cols.length || cols.length !== curveData.length) return

  cols.forEach((col, n) => {
    const bars = Array.from(col.querySelectorAll('i')) as HTMLElement[]
    const ends = curveData[n] as [number, number][]
    bars.forEach((bar, k) => {
      const [scaleY, y] = ends[k] ?? [0, 0]
      if (!scaleY && !y) return
      gsap.fromTo(
        bar,
        { scaleY: 0, y: 0 },
        { scaleY, y, duration: 1, delay: 0.3 + n * 0.03, ease: EASE_EXPO }
      )
    })
  })

  const now = container.querySelector('.curve__now') as HTMLElement
  if (now) {
    gsap.fromTo(
      now,
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 0.7, delay: 1.1, ease: EASE_EXPO, transformOrigin: '50% 100%', clearProps: 'transform,opacity' }
    )
  }
}

// ------------------------------------------------------------------- bars
/** Generic scaleY/width bars (meters, leave calendar, funnel, split). */
function barsAnimate(container: Element) {
  const bars = Array.from(
    new Set([
      ...qSel(container, '.meter'),
      ...qSel(container, '[style*="transform: scale"]'),
      ...qSel(container, '[style*="width: calc"]'),
      ...qSel(container, '.funnel__bar i'),
      ...qSel(container, '.split__seg i'),
    ])
  ) as HTMLElement[]

  const widthBars: HTMLElement[] = []
  const scaleBars: HTMLElement[] = []
  for (const el of bars) {
    if (/width:\s*calc/.test(el.getAttribute('style') || '')) widthBars.push(el)
    else scaleBars.push(el)
  }

  if (scaleBars.length) {
    const ends = scaleBars.map((el) => {
      const m = getComputedStyle(el).transform.match(/scale\(1,\s*([\d.]+)\)/) ||
        getComputedStyle(el).transform.match(/scale\(([\d.]+),\s*([\d.]+)\)/)
      if (!m) return { y: 1, x: 1 }
      return m[2] !== undefined ? { y: parseFloat(m[2]), x: parseFloat(m[1]) } : { y: parseFloat(m[1]), x: parseFloat(m[1]) }
    })
    gsap.fromTo(
      scaleBars,
      { scaleY: 0, scaleX: 0 },
      {
        scaleY: (_i, el) => ends[scaleBars.indexOf(el as HTMLElement)].y,
        scaleX: (_i, el) => ends[scaleBars.indexOf(el as HTMLElement)].x,
        duration: 0.9,
        ease: EASE_EXPO,
        stagger: 0.03,
      }
    )
  }

  if (widthBars.length) {
    const ends = widthBars.map((el) => el.getBoundingClientRect().width)
    gsap.fromTo(
      widthBars,
      { width: '0px' },
      {
        width: (_i, el) => `${ends[widthBars.indexOf(el as HTMLElement)]}px`,
        duration: 0.9,
        ease: EASE_EXPO,
        stagger: 0.03,
      }
    )
  }
}

// ------------------------------------------------------------------- entry
export function playPageAnimation() {
  const container = document.querySelector('.view > div')
  if (!container) return

  // so() — header
  const heads = qSel(container, '.phead h1, .chead h2')
  if (heads.length) {
    gsap.fromTo(
      heads,
      { yPercent: 115, rotation: 6 },
      { yPercent: 0, rotation: 0, duration: 0.85, ease: EASE_POWER4, stagger: 0.022, clearProps: 'transform' }
    )
  }

  // co() — content blocks
  const contents = qSel(
    container,
    '.card, .feed, .curve, .kpis, .td-wait, .td-dept, .funnel, .td-roles, .td-pin, .td-up, .td-starters, .an-main, .pp-dir, .ob-cards, .pr-flow, .tm-grid, .hp-faq, .st-grid'
  )
  if (contents.length) {
    gsap.fromTo(
      contents,
      { opacity: 0, y: 26, scale: 0.985 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: EASE_EXPO, stagger: 0.06, clearProps: 'transform,opacity' }
    )
  }

  // lo() — lists
  const lists = qSel(container, 'ul.feed, .td-roles, .td-dept__list, .funnel__row, .charttip + ul')
  if (lists.length) {
    gsap.fromTo(
      lists,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.55, ease: EASE_POWER3, stagger: 0.04, clearProps: 'transform,opacity' }
    )
  }

  // uo() — cards / tiles
  const cards = qSel(container, '.td-kpi, .td-start, .kpi, .ob-card, .an-best + .kpi, .team, .hp-faq__item')
  if (cards.length) {
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, rotation: (i: number) => (i % 2 ? 2.5 : -2.5), scale: 0.95 },
      { opacity: 1, y: 0, rotation: 0, scale: 1, duration: 0.85, ease: EASE_BACK14, stagger: 0.07, clearProps: 'transform,opacity' }
    )
  }

  // po() — pop-in
  const pops = qSel(container, '.spark, .ring__arc, .av__dot')
  if (pops.length) {
    gsap.fromTo(
      pops,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: EASE_BACK3, stagger: 0.05, clearProps: 'transform,opacity' }
    )
  }

  // fo() — bars, then the curve stack
  barsAnimate(container)
  curveAnimate(container)

  // wo() — sidebar pill
  pillAnimate()
}

/** Toast / flash: back.out(2.4) pop used by actions in the reference. */
export function flashAnimate(el: Element | null) {
  if (!el) return
  gsap.fromTo(el, { y: -4, scale: 1.08 }, { y: 0, scale: 1, duration: 0.55, ease: 'back.out(2.4)', overwrite: 'auto', clearProps: 'transform' })
}
