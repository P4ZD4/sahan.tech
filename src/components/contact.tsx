import { PropsWithChildren } from "react"
import { Github, Linkedin, Mail, Phone } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

const ContactUsDialog = ({
  linkedin,
  email,
  phone,
  repo,
}: {
  linkedin: string
  email: string
  phone: string
  repo: string
}) => {
  return (
    <Dialog>
      <DialogTrigger>Contact</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription className="flex flex-col gap-4 mt-10">
            <IconButtonContactLink link={linkedin} target="_blank">
              <Linkedin />
              Let’s connect on LinkedIn!
            </IconButtonContactLink>
            <IconButtonContactLink link={`mailto:${email}`} target="_blank">
              <Mail />
              Drop me an mail
            </IconButtonContactLink>
            <IconButtonContactLink link={`tel:${phone}`} target="_blank">
              <Phone />
              Let’s chat!
            </IconButtonContactLink>
            <IconButtonContactLink link={repo} target="_blank">
              <Github />
              Check out my GitHub
            </IconButtonContactLink>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

const TextContactLink = ({
  link,
  target,
  children,
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

const IconButtonContactLink = ({
  link,
  target,
  children,
}: PropsWithChildren<{ link: string; target: string }>) => {
  return (
    <a
      className="text-blue-600 hover:text-blue-600
      visited:text-purple-600 flex gap-4 py-4items-center w-full h-12 bg-foreground text-[color:hsl(var(--primary-foreground))] hover:bg-muted-foreground items-center px-8"
      target={target}
      href={link}
    >
      {children}
    </a>
  )
}

export { ContactUsDialog, TextContactLink }
