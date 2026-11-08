import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function read(): Theme {
  return (document.documentElement.dataset.theme as Theme) === 'dark' ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(read)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('rotela:theme', JSON.stringify(theme)) } catch (e) { }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0f1113' : '#eef0f3')
  }, [theme])
  return [theme, setTheme] as const
}

const readRail = () => innerWidth > 760 && innerWidth < 1280

export function useRail({ onToggle }: { onToggle?: () => void } = {}) {
  const [rail, setRail] = useState(readRail)
  useEffect(() => {
    document.documentElement.classList.toggle('is-rail', rail)
    const onResize = () => { setRail(readRail()) }
    addEventListener('resize', onResize)
    return () => removeEventListener('resize', onResize)
  }, [rail])
  // manual collapse / expand — persisted so a desktop reload remembers the choice
  const toggle = () => {
    const next = !rail
    setRail(next)
    try { localStorage.setItem('rotela:rail', next ? '1' : '0') } catch (e) { }
    onToggle?.()
  }
  return [rail, toggle] as const
}
