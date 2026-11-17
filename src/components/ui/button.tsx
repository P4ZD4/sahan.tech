import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex h-12 items-center justify-center gap-2 border-2 px-6 text-sm font-medium whitespace-nowrap shadow-hard-sm shadow-foreground transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard active:translate-0 active:shadow-none",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background",
        outline: "bg-background text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export { buttonVariants }
