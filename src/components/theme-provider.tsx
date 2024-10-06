import { createContext, useContext, useEffect, useState } from 'react'

type ThemeProviderProps = {
  children: React.ReactNode
  isDefaultDarkMode?: boolean
  storageKey?: string
}

type ThemeProviderState = {
  isDarkMode: boolean | undefined
  toggleTheme: () => void
}

const initialState: ThemeProviderState = {
  isDarkMode: true,
  toggleTheme: () => {
    console.log('HERE')
  },
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  isDefaultDarkMode = undefined,
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean | undefined>(
    () => localStorage.getItem(storageKey) === 'true' || isDefaultDarkMode
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (isDarkMode === undefined) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const value = {
    isDarkMode,
    toggleTheme: () => {
      localStorage.setItem(storageKey, (!isDarkMode).toString())
      setIsDarkMode((mode) => !mode)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
