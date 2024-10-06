import Section from '@/components/section'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

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
    <Section title='skills'>
      <h2 className='text-2xl font-semibold mb-4'>Skills</h2>

      <div className='flex gap-4 gap-y-8 flex-wrap'>
        {skills.map((skill, index) => {
          return (
            <Card
              key={`skill-item-${index + 1}`}
              className='basis-[100%] sm:basis-[48%] p-2'
            >
              <CardTitle className='text-xl mb-4'>{skill.skill}</CardTitle>
              {skill.proficiency && (
                <CardDescription>
                  <Progress value={(skill.proficiency ?? 0) * 100} />
                </CardDescription>
              )}
              <CardContent className='flex flex-col gap-4'>
                {skill.frameworks.map((framework, innerIndex) => {
                  return (
                    <div
                      key={`skill-framework-item-${innerIndex + 1}`}
                      className='flex flex-col gap-2'
                    >
                      <h2>{framework.name}</h2>
                      <Progress value={(framework.proficiency ?? 0) * 100} />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}

export default Skills
