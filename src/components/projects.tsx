import Section from '@/components/section'
import { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TextContactLink } from '@/components/contact'

interface CompanyProps {
    name: string
    location: string
    description: string
    summary: string
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
    const [selectedProject, setSelectedProject] = useState<ProjectProps | undefined>(undefined)

    const toggleProject = (project: ProjectProps) => {
        if (screen.width >= 768) {
            if (selectedProject === project) {
                setSelectedProject(undefined)
            } else {
                setSelectedProject(project)
            }
        } else {
            window.open(project.company.link, '_blank').focus()
        }
    }

    return (
        <Section title="projects" className="">
            <h2 className="text-2xl font-semibold">Most Recent</h2>
            <div className="flex flex-col md:flex-row gap-6 md:gap-2 overflow-x-auto mt-4">
                {projects.map((project, index) => {
                    return (
                        <ProjectCard
                            key={`project-card-${index + 1}`}
                            {...project}
                            onClick={() => toggleProject(project)}
                        />
                    )
                })}
            </div>
            <div>{selectedProject && <ProjectCard {...selectedProject} compactView={false} />}</div>
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
    show_on_mobile,
    onClick = undefined,
    compactView = true
}: ProjectProps & { onClick?: () => void; compactView?: boolean }) => {
    return (
        <Card
            className={`${!show_on_mobile ? 'hidden lg:block' : ''} ${compactView ? 'shrink-0 basis-[40%] lg-basis-[30%] cursor-pointer' : ''}`}
            onClick={onClick}
        >
            <CardHeader className="leading-[0.5rem] items-left">
                {compactView && (
                    <div className="w-full">
                        <img src={company.image} className="m-auto" />
                    </div>
                )}
                <CardTitle className={`${compactView ? 'text-xl' : 'text-2xl'} leading-[1.3rem]`}>
                    {compactView ? (
                        company.name
                    ) : (
                        <TextContactLink link={company.link} target="_blank">
                            {company.name}
                        </TextContactLink>
                    )}
                </CardTitle>
                <CardDescription>{company.location}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-1 px-5">
                <p className="text-base font-semibold leading-4">{role}</p>
                <p className="leading-4 pb-2">
                    {start_date} - {end_date}
                </p>
                <p
                    className="lg:hidden pb-2 leading-[1.2rem]"
                    dangerouslySetInnerHTML={{ __html: company.summary }}
                />
                <div className="lg:hidden">
                    {key_achievements.map((achievement, index) => (
                        <div
                            key={`achievement-item-${index + 1}`}
                            className="mb-4 grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0"
                        >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-[color:--foreground]" />
                            <div className="space-y-1">
                                <p
                                    className="text-sm font-medium leading-[1.3rem]"
                                    dangerouslySetInnerHTML={{ __html: achievement }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                {!compactView && (
                    <div className="gap-3 hidden lg:flex flex-col">
                        <div
                            className=" leading-[1.2rem]"
                            dangerouslySetInnerHTML={{ __html: company.description }}
                        />
                        <div>
                            {key_achievements.map((achievement, index) => (
                                <div
                                    key={`achievement-item-${index + 1}`}
                                    className="mb-4 grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0"
                                >
                                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-[color:--foreground]" />
                                    <div className="space-y-1">
                                        <p
                                            className="text-sm font-medium leading-[1.2rem]"
                                            dangerouslySetInnerHTML={{ __html: achievement }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <div className="flex flex-wrap gap-1 mt-1">
                    {stack.map((item, index) => {
                        return <Badge key={`details-stack-item-${index + 1}`}>{item}</Badge>
                    })}
                </div>
            </CardFooter>
        </Card>
    )
}

export default Projects
