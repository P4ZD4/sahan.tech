import "@/App.css"
import { useTheme } from "@/components/theme-provider"
import { Toggle } from "@/components/ui/toggle"
import { SunMoon } from "lucide-react"
import Menu from "@/components/navigation/menu"
import About from "@/components/about"
import Projects, { CompanyProps, ProjectProps } from "@/components/projects"
import Skills from "@/components/skills"

import Resume from "@/data/resume.json"

type Experience =
  | {
      company: CompanyProps
      projects: ProjectProps[]
    }
  | ProjectProps

function App() {
  const { toggleTheme } = useTheme()
  const resume = Resume

  const getProjects = (experiences: Experience[]) => {
    return experiences.reduce((prev, experience) => {
      return [...prev, ...("projects" in experience ? experience.projects : [])]
    }, [] as ProjectProps[])
  }

  return (
    <>
      <Toggle
        className="fixed top-0 right-0 m-4 p-0 h-8 w-8 z-20 bg-background color-foreground"
        onClick={() => toggleTheme()}
      >
        <SunMoon />
      </Toggle>

      <Menu />
      <div className="lg:ml-[15rem] px-10">
        <About {...resume} />
        <Projects projects={getProjects(resume.experience)} />
        <Skills skills={resume.skills} />
      </div>
    </>
  )
}

export default App
