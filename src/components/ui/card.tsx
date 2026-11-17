import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("border-2 bg-card text-card-foreground", className)}
      {...props}
    />
  )
}

export { Card }
