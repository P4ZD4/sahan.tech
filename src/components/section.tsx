import { useEffect, useRef } from "react"

function Section({
  title,
  heading,
  children,
  className = "",
}: React.PropsWithChildren<{
  title: string
  heading?: string
  className?: string
}>) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && window.location.hash !== `#${title}`) {
          history.replaceState({}, "", `#${title}`)
          window.dispatchEvent(new HashChangeEvent("hashchange"))
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    )
    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [title])

  return (
    <section
      id={title}
      ref={elementRef}
      className={`mx-auto min-h-screen max-w-6xl content-center pt-24 pb-16 text-left lg:py-20 ${className}`}
    >
      {heading && (
        <header className="mb-10">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {heading}
          </h2>
          <span aria-hidden className="mt-4 block h-2 w-16 bg-signal" />
        </header>
      )}
      {children}
    </section>
  )
}

export default Section
