import { Download } from "lucide-react"
import { ContactUsDialog, TextContactLink } from "@/components/contact"
import Section from "@/components/section"
import { buttonVariants } from "@/components/ui/button"

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
    <Section title="about-me">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <img
          src="/profile.webp"
          alt={name}
          width={744}
          height={949}
          className="mx-auto w-full max-w-72 border-2 bg-[#2C3E50] shadow-hard shadow-signal sm:max-w-sm lg:max-w-none motion-safe:animate-in motion-safe:duration-700 motion-safe:fade-in"
        />
        <div className="flex flex-col gap-6 motion-safe:animate-in motion-safe:duration-700 motion-safe:fade-in motion-safe:slide-in-from-bottom-4">
          <p className="flex items-center gap-3 font-mono text-sm text-muted-foreground">
            <span aria-hidden className="size-2 bg-signal" />
            {role} · {contact.address}
          </p>
          <h1 className="text-5xl leading-[0.95] font-semibold tracking-tight sm:text-7xl">
            {name}
          </h1>
          <p
            className="max-w-prose text-lg leading-relaxed text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
          <div className="flex flex-wrap gap-4">
            <a
              href="/Sahan - Resume.pdf"
              download="Sahan - Resume.pdf"
              className={buttonVariants()}
            >
              <Download size={16} />
              Download Résumé
            </a>
            <ContactUsDialog {...contact} />
          </div>
          <p className="font-mono text-sm">
            <TextContactLink link={`mailto:${contact.email}`} target="">
              {contact.email}
            </TextContactLink>
          </p>
          <Education education={education} />
        </div>
      </div>
    </Section>
  )
}

const Education = ({ education }: { education: EducationProps[] }) => {
  return (
    <dl className="mt-2 grid gap-2 border-t-2 pt-5">
      <dt className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
        Education
      </dt>
      {education.map((item) => (
        <dd key={item.school}>
          <p className="font-semibold">{item.degree}</p>
          <p className="text-sm text-muted-foreground">
            {item.school}, {item.location} · {item.start_date} – {item.end_date}
          </p>
        </dd>
      ))}
    </dl>
  )
}

export default About
