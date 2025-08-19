'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    setTheme(newTheme)
    if (newTheme === 'dark') {
      root.classList.add('dark')
      document.body.style.backgroundColor = 'hsl(222.2 84% 4.9%)'
    } else {
      root.classList.remove('dark')
      document.body.style.backgroundColor = 'hsl(0 0% 100%)'
    }
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light')
      }
    }
    
    const initialTheme = savedTheme || (prefersDark.matches ? 'dark' : 'light')
    applyTheme(initialTheme)

    prefersDark.addEventListener('change', handleSystemThemeChange)
    return () => prefersDark.removeEventListener('change', handleSystemThemeChange)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}