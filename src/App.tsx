import { Moon, Sun } from "lucide-react"
import About from "@/components/about"
import Menu from "@/components/navigation/menu"
import Projects, { CompanyProps, ProjectProps } from "@/components/projects"
import Skills from "@/components/skills"
import { useTheme } from "@/components/theme-provider"
import { Toggle } from "@/components/ui/toggle"

import Resume from "@/data/resume.json"

type Experience =
  | {
      company: CompanyProps
      projects: ProjectProps[]
    }
  | ProjectProps

const getProjects = (experiences: Experience[]) =>
  experiences.flatMap((experience) =>
    "projects" in experience ? experience.projects : [],
  )

function App() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <>
      <Toggle
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        className="fixed top-2 right-3 z-30 size-10 border-2 border-foreground bg-background text-foreground transition-transform hover:-translate-y-0.5 lg:top-6 lg:right-6"
        onClick={toggleTheme}
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </Toggle>

      <Menu />
      <main className="px-6 sm:px-10 lg:ml-60 lg:px-16">
        <About {...Resume} />
        <Projects projects={getProjects(Resume.experience)} />
        <Skills skills={Resume.skills} />
      </main>
    </>
  )
}

export default App
