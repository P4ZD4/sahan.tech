import { useState } from "react"
import { TextContactLink } from "@/components/contact"
import Section from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface CompanyProps {
  name: string
  location: string
  description: string
  link: string
  image: string
}

interface ProjectProps {
  company: CompanyProps
  role: string
  start_date: string
  end_date: string
  key_achievements: string[]
  stack: string[]
  show_on_mobile: boolean
}

function Projects({ projects }: { projects: ProjectProps[] }) {
  const [selectedProject, setSelectedProject] = useState(projects[0])

  return (
    <Section
      title="projects"
      heading="Recent Projects"
      className="xl:max-w-none"
    >
      <div className="hidden items-start gap-10 xl:grid xl:grid-cols-[22rem_minmax(0,1fr)]">
        <ol className="border-t-2">
          {projects.map((project, index) => {
            const active = project === selectedProject
            return (
              <li key={project.company.name}>
                <button
                  onClick={() => setSelectedProject(project)}
                  aria-pressed={active}
                  className={`grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-2 border-b-2 px-3 py-4 text-left transition-colors ${active ? "bg-foreground text-background" : "hover:bg-muted"}`}
                >
                  <span
                    className={`font-mono text-xs ${active ? "text-signal" : "text-muted-foreground"}`}
                  >
                    0{index + 1}
                  </span>
                  <span className="text-lg font-semibold tracking-tight">
                    {project.company.name}
                  </span>
                  <span className="font-mono text-xs opacity-70">
                    {project.start_date.slice(-4)}
                  </span>
                  <span className="col-start-2 text-sm opacity-70">
                    {project.role}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
        <ProjectCard
          key={selectedProject.company.name}
          {...selectedProject}
          className="mx-auto w-full max-w-4xl shadow-hard shadow-foreground motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2"
        />
      </div>

      <div className="flex flex-col gap-8 xl:hidden">
        {projects
          .filter((project) => project.show_on_mobile)
          .map((project) => (
            <ProjectCard key={project.company.name} {...project} />
          ))}
      </div>
    </Section>
  )
}

const ProjectCard = ({
  company,
  role,
  start_date,
  end_date,
  key_achievements,
  stack,
  className = "",
}: ProjectProps & { className?: string }) => {
  return (
    <Card className={`flex flex-col gap-5 p-6 sm:p-8 ${className}`}>
      <header className="flex items-center gap-5">
        <img
          src={company.image}
          alt=""
          width={300}
          height={168}
          className="w-24 shrink-0 border-2 object-cover sm:w-32"
        />
        <div>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {company.location}
          </p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            <TextContactLink link={company.link} target="_blank">
              {company.name}
            </TextContactLink>
          </h3>
        </div>
      </header>
      <p className="flex flex-wrap items-baseline justify-between gap-x-4 border-y-2 py-3">
        <span className="font-semibold">{role}</span>
        <span className="font-mono text-xs text-muted-foreground">
          {start_date} – {end_date}
        </span>
      </p>
      <p
        className="text-sm leading-relaxed text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: company.description }}
      />
      <ul className="flex flex-col gap-3">
        {key_achievements.map((achievement) => (
          <li
            key={achievement}
            className="grid grid-cols-[1.25rem_1fr] text-sm leading-relaxed"
          >
            <span aria-hidden className="mt-2 size-2 bg-signal" />
            <span dangerouslySetInnerHTML={{ __html: achievement }} />
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {stack.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
    </Card>
  )
}

export default Projects
export type { CompanyProps, ProjectProps }
