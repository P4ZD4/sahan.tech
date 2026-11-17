import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      value={value}
      className={cn(
        "relative h-2.5 w-full overflow-hidden bg-muted [mask-image:repeating-linear-gradient(90deg,#000_0_calc(10%-3px),transparent_calc(10%-3px)_10%)]",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="size-full bg-foreground transition-transform duration-700"
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
