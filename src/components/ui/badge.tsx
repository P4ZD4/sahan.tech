import * as React from "react"
import { cn } from "@/lib/utils"

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center border-2 px-2 py-0.5 font-mono text-xs font-medium",
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
