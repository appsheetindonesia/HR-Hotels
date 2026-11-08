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

const readRail = () => document.documentElement.classList.contains('is-rail')

export function useRail() {
  const [rail, setRail] = useState(readRail)
  useEffect(() => {
    document.documentElement.classList.toggle('is-rail', rail)
    try { localStorage.setItem('rotela:rail', rail ? '1' : '0') } catch (e) { }
  }, [rail])
  return [rail, setRail] as const
}
