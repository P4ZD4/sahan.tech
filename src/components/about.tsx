import Section from "@/components/section"
import { Mail, MapPinHouse } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ContactUsDialog, TextContactLink } from "@/components/contact"
import { Button } from "@/components/ui/button"

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
    <Section title="about-me" className="content-center max-w-[960px] m-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col gap-4 basis-[80%]">
          <div className="flex flex-row max-[500px]:flex-col gap-4">
            <div className="basis-[60%]">
              <img
                src="/profile.webp"
                alt="Profile Picture"
                className="min-[500px]:max-w-100 bg-[#2C3E50] border text-card-foreground shadow"
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

const EducationItem = ({
  school,
  location,
  degree,
  start_date,
  end_date,
}: EducationProps) => {
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
  repo,
}: { name: string; role: string } & ContactProps) => {
  return (
    <Card className="pb-0">
      <CardHeader className="gap-1">
        <CardTitle className="text-2xl leading-6">{name}</CardTitle>
        <CardDescription className="text-base leading-4">
          {role}
        </CardDescription>
      </CardHeader>
      <CardContent className="leading-6 font-center pb-2">
        <p className="flex items-center">
          <Mail size={16} />
          <TextContactLink link={`mailto:${email}`} target="">
            &nbsp;{email}
          </TextContactLink>
        </p>
        <p className="flex items-center">
          <MapPinHouse size={16} />
          &nbsp;{address}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start">
        <a
          href="/Sahan - Resume.pdf"
          download="Sahan - Resume.pdf"
          target="_blank"
        >
          <Button>Download Résumé</Button>
        </a>
        <ContactUsDialog {...{ linkedin, email, phone, repo }} />
      </CardFooter>
    </Card>
  )
}

const Summary = ({ summary }: { summary: string }) => {
  return (
    <Card>
      <CardContent className="pt-3 leading-[1.3rem]">
        <p dangerouslySetInnerHTML={{ __html: summary }}></p>
      </CardContent>
    </Card>
  )
}
export default About
