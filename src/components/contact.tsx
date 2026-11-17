import { PropsWithChildren } from "react"
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"
import { ArrowUpRight, Mail, Phone } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
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
  const links = [
    {
      href: linkedin,
      label: "Let’s connect on LinkedIn",
      icon: <LinkedInLogoIcon className="size-5" />,
    },
    {
      href: `mailto:${email}`,
      label: "Drop me an email",
      icon: <Mail size={20} />,
    },
    { href: `tel:${phone}`, label: "Let’s chat", icon: <Phone size={20} /> },
    {
      href: repo,
      label: "Check out my GitHub",
      icon: <GitHubLogoIcon className="size-5" />,
    },
  ]

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: "outline" })}>
        Get in touch
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle>Let’s talk</DialogTitle>
        <div className="flex flex-col gap-3">
          {links.map(({ href, label, icon }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex h-14 items-center gap-4 border-2 px-5 font-medium transition-colors hover:bg-foreground hover:text-background"
            >
              {icon}
              {label}
              <ArrowUpRight
                size={18}
                className="ml-auto transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          ))}
        </div>
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
      className="underline decoration-signal decoration-2 underline-offset-4 transition-colors hover:text-signal"
      target={target}
      rel="noreferrer"
      href={link}
    >
      {children}
    </a>
  )
}

export { ContactUsDialog, TextContactLink }
