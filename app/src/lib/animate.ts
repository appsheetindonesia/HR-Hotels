import { gsap } from 'gsap'

/**
 * Rotela animation manager.
 *
 * Every page is injected via dangerouslySetInnerHTML, so animations must run
 * after the DOM lands. This module plays a GSAP timeline that mirrors the
 * reference rig: entrance fade, sidebar active pill, curve bars, leave bars,
 * meters, rings, dots.
 */

function scaleYOf(el: HTMLElement): number {
  const m = window.getComputedStyle(el).transform.match(/scale\(1,\s*([\d.]+)\)/)
  return m ? parseFloat(m[1]) : 1
}

function scaleXOf(el: HTMLElement): number {
  const m = window.getComputedStyle(el).transform.match(/scale\(([\d.]+),\s*1\)/) ||
    window.getComputedStyle(el).transform.match(/scale\(([\d.]+)\)/)
  return m ? parseFloat(m[1]) : 1
}

export function playPageAnimation() {
  const tl = gsap.timeline()
  const view = document.querySelector('.view')
  const container = view?.querySelector('div')
  if (!container) return tl

  // 1. Page entrance: fade + slide up
  tl.from(container, { opacity: 0, y: 14, duration: 0.4, ease: 'power2.out' }, 0)

  // 2. Sidebar active pill -> follow the active nav item
  const side = document.querySelector('.side')?.getBoundingClientRect()
  const pill = document.querySelector('.snav__pill') as HTMLElement
  const active = document.querySelector('.snav__item[aria-current=page]') as HTMLElement
  if (pill && active && side) {
    const r = active.getBoundingClientRect()
    tl.fromTo(
      pill,
      { clipPath: 'inset(25px 4px 578px round 12px)', x: 0, y: 0 },
      {
        clipPath: 'inset(0px 0px 0px 0px round 12px)',
        x: r.left - side.left,
        y: r.top - side.top,
        width: r.width,
        height: r.height,
        duration: 0.45,
        ease: 'power3.inOut',
      },
      0.05
    )
  }

  // 3. Curve bars (attendance today): animate scaleY from stored transform
  const curveCols = Array.from(container.querySelectorAll('.curve__col i'))
  if (curveCols.length) {
    tl.fromTo(
      curveCols,
      { scaleY: 0 },
      {
        scaleY: (_i, el) => scaleYOf(el as HTMLElement),
        stagger: 0.025,
        duration: 0.45,
        ease: 'power3.out',
      },
      0.15
    )
  }

  // 4. Leave bars [style*="width: calc"]: capture computed width, animate from 0
  const leaveBars = Array.from(container.querySelectorAll('[style*="width: calc"]'))
  if (leaveBars.length) {
    tl.fromTo(
      leaveBars,
      { width: 0 },
      {
        width: (_i, el) => window.getComputedStyle(el as HTMLElement).width,
        stagger: 0.02,
        duration: 0.5,
        ease: 'power2.out',
      },
      0.2
    )
  }

  // 5. Meters [style*="transform: scale"]: capture scaleX, animate from 0
  const meters = Array.from(container.querySelectorAll('[style*="transform: scale"]'))
  if (meters.length) {
    tl.fromTo(
      meters,
      { scaleX: 0 },
      {
        scaleX: (_i, el) => scaleXOf(el as HTMLElement),
        stagger: 0.025,
        duration: 0.5,
        ease: 'power2.out',
      },
      0.25
    )
  }

  // 6. Rings: stroke-dashoffset reveal
  const arcs = Array.from(container.querySelectorAll('.ring__arc'))
  if (arcs.length) {
    tl.fromTo(
      arcs,
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, stagger: 0.08, duration: 0.55, ease: 'power2.out' },
      0.3
    )
  }

  // 7. Staff avatar dots pulse-in
  const dots = Array.from(container.querySelectorAll('.av__dot'))
  if (dots.length) {
    tl.fromTo(
      dots,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.04, duration: 0.3, ease: 'back.out(1.2)' },
      0.35
    )
  }

  return tl
}
