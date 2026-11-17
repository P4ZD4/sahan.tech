import { createContext, use, useEffect, useState } from "react"

type ThemeProviderProps = {
  children: React.ReactNode
  storageKey?: string
}

type ThemeProviderState = {
  isDarkMode: boolean
  toggleTheme: () => void
}

const initialState: ThemeProviderState = {
  isDarkMode: true,
  toggleTheme: () => {},
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem(storageKey)
    return stored === null
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : stored === "true"
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(isDarkMode ? "dark" : "light")
  }, [isDarkMode])

  const value = {
    isDarkMode,
    toggleTheme: () => {
      localStorage.setItem(storageKey, (!isDarkMode).toString())
      setIsDarkMode((mode) => !mode)
    },
  }

  return (
    <ThemeProviderContext {...props} value={value}>
      {children}
    </ThemeProviderContext>
  )
}

export const useTheme = () => {
  const context = use(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
