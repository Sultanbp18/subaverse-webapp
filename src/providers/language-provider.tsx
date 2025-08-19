'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Language = 'en' | 'id'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage) {
      setLanguageState(savedLanguage)
    } else {
      const browserLang = navigator.language.split('-')[0]
      const defaultLang = browserLang === 'id' ? 'id' : 'en'
      setLanguageState(defaultLang)
      localStorage.setItem('language', defaultLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    document.documentElement.lang = lang
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}