import '@/App.css'
import { useTheme } from '@/components/theme-provider'
import { Toggle } from '@/components/ui/toggle'
import { SunMoon } from 'lucide-react'

function App() {
  const { toggleTheme } = useTheme()

  return (
    <>
      <Toggle className="absolute top-0 right-0 m-4 p-0 h-8 w-8" onClick={() => toggleTheme()}>
        <SunMoon color="var(--foreground)" />
      </Toggle>
    </>
  )
}

export default App
