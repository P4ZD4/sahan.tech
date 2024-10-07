import { useEffect, useRef, useState } from "react"

function Section({
  title,
  children,
  className = undefined,
}: React.PropsWithChildren<{ title: string; className?: string }>) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current
      if (element) {
        const top = element.offsetTop - screen.height / 2
        const bottom =
          element.offsetTop + element.offsetHeight - screen.height / 2
        const documentScroll = window.scrollY

        if (!inView && top <= documentScroll && bottom >= documentScroll) {
          setInView(true)
          history.replaceState({}, "", `#${title}`)
          window.dispatchEvent(new HashChangeEvent("hashchange"))
        }
        if (inView && (top > documentScroll || bottom < documentScroll)) {
          setInView(false)
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [inView, setInView])

  return (
    <div
      id={title}
      ref={elementRef}
      className={`min-h-screen text-foreground text-left pt-20 lg:pt-10 ${className}`}
    >
      {children}
    </div>
  )
}

export default Section
