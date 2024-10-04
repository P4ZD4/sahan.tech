import Section from '@/components/section'
import { Github, Linkedin, Mail, MapPinHouse, Phone } from 'lucide-react'
import ProfilePicture from '@/data/profile-picture.webp'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PropsWithChildren } from 'react'

interface ContactProps {
    email: string
    phone: string
    address: string
    linkedin: string
    repo: string
}
interface EducationProps {
    school: string
    location: string
    degree: string
    start_date: string
    end_date: string
}
interface AboutProps {
    name: string
    role: string
    contact: ContactProps
    summary: string
    education: EducationProps[]
}

function About({ name, role, contact, summary, education }: AboutProps) {
    return (
        <Section title="about-me" className="font-mono text-[color:--foreground] text-left">
            <div className="flex flex-row gap-8">
                <div className="flex flex-col gap-4 max-w-[36rem]">
                    <div className="flex flex-row gap-4">
                        <div className="w-3/5">
                            <img
                                src={ProfilePicture}
                                alt="Profile Picture"
                                className="max-w-100 border bg-card text-card-foreground shadow"
                            />
                        </div>
                        <div className="content-end">
                            <Contact name={name} role={role} {...contact} />
                        </div>
                    </div>
                    <Summary summary={summary} />
                </div>
                <Education education={education} />
            </div>
        </Section>
    )
}

const Education = ({ education }: { education: EducationProps[] }) => {
    return (
        <div className="content-end">
            <h3 className="font-semibold text-xl pb-2">Education</h3>
            {education.map((item, index) => {
                return <EducationItem key={`education-item-${index + 1}`} {...item} />
            })}
        </div>
    )
}

const EducationItem = ({ school, location, degree, start_date, end_date }: EducationProps) => {
    return (
        <Card>
            <CardHeader className="leading-3">
                <CardTitle>{school}</CardTitle>
                <CardDescription>{location}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    {start_date} - {end_date}
                </p>
                <p>{degree}</p>
            </CardContent>
        </Card>
    )
}

const Contact = ({
    name,
    role,
    email,
    phone,
    address,
    linkedin,
    repo
}: { name: string; role: string } & ContactProps) => {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle className="text-2xl leading-6">{name}</CardTitle>
                <CardDescription className="text-base leading-4">{role}</CardDescription>
            </CardHeader>
            <CardContent className="leading-6 font-center">
                <p className="flex items-center">
                    <Mail size={16} />
                    <TextContactLink link={`mailto:${email}`} target="">
                        &nbsp;{email}
                    </TextContactLink>
                </p>
                <p className="flex items-center">
                    <Phone size={16} />
                    <TextContactLink link={`tel:${phone}`} target="">
                        &nbsp;{phone}
                    </TextContactLink>
                </p>
                <p className="flex items-center">
                    <MapPinHouse size={16} />
                    &nbsp;{address}
                </p>
                <p className="flex items-center py-2 gap-2">
                    <RoundIconContactLink link={linkedin} target="_blank">
                        <Linkedin size={16} />
                    </RoundIconContactLink>
                    <RoundIconContactLink link={repo} target="_blank">
                        <Github size={16} />
                    </RoundIconContactLink>
                </p>
            </CardContent>
        </Card>
    )
}

const TextContactLink = ({
    link,
    target,
    children
}: PropsWithChildren<{ link: string; target: string }>) => {
    return (
        <a
            className="underline-none text-blue-600 hover:text-blue-600 visited:text-purple-600"
            target={target}
            href={link}
        >
            {children}
        </a>
    )
}

const RoundIconContactLink = ({
    link,
    target,
    children
}: PropsWithChildren<{ link: string; target: string }>) => {
    return (
        <a
            className="underline text-blue-600 hover:text-blue-600 visited:text-purple-600 rounded-2xl border-solid border-2 border-[color:--foreground] p-1"
            target={target}
            href={link}
        >
            {children}
        </a>
    )
}

const Summary = ({ summary }: { summary: string }) => {
    return (
        <Card>
            <CardContent className="pt-3 leading-[1.1rem]">
                <p dangerouslySetInnerHTML={{ __html: summary }}></p>
            </CardContent>
        </Card>
    )
}
export default About
