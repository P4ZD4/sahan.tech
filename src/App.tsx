import '@/App.css'
import { useTheme } from '@/components/theme-provider'
import { Toggle } from '@/components/ui/toggle'
import { SunMoon } from 'lucide-react'
import Menu from '@/components/navigation/menu'
import About from '@/components/about'
import Projects from '@/components/projects'
import Skills from '@/components/skills'
import Contact from '@/components/contact'

import Resume from '@/data/resume.json'

function App() {
    const { toggleTheme } = useTheme()
    const resume = Resume

    return (
        <>
            <Toggle className="fixed top-0 right-0 m-4 p-0 h-8 w-8" onClick={() => toggleTheme()}>
                <SunMoon color="var(--foreground)" />
            </Toggle>

            <Menu />
            <div className="ml-[15rem]">
                <About {...resume} />
                <Projects />
                <Skills />
                <Contact />
            </div>
        </>
    )
}

export default App
