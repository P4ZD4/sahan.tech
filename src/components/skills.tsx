import Section from "@/components/section"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface FrameworkProps {
  name: string
  proficiency?: number
}
interface SkillProps {
  skill: string
  frameworks: FrameworkProps[]
  proficiency?: number
  type: string
}

function Skills({ skills }: { skills: SkillProps[] }) {
  return (
    <Section title="skills" heading="Areas of Expertise">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <Card
            key={skill.skill}
            className="flex flex-col gap-5 p-6 transition-all hover:-translate-y-1 hover:shadow-hard hover:shadow-foreground"
          >
            <header className="flex items-baseline justify-between gap-4">
              <h3 className="text-xl font-semibold tracking-tight">
                {skill.skill}
              </h3>
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                {skill.type}
              </span>
            </header>
            {skill.proficiency !== undefined && (
              <Progress
                value={skill.proficiency * 100}
                aria-label={skill.skill}
              />
            )}
            {skill.frameworks.map((framework) => (
              <div key={framework.name} className="flex flex-col gap-2">
                <span className="text-sm">{framework.name}</span>
                <Progress
                  value={(framework.proficiency ?? 0) * 100}
                  aria-label={framework.name}
                />
              </div>
            ))}
          </Card>
        ))}
      </div>
    </Section>
  )
}

export default Skills
