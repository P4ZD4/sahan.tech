import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { toCamelCase } from "@/lib/utils"

const pages = ["about-me", "projects", "skills"]
const toLabel = (page: string) => toCamelCase(page.replace("-", " "))
const toIndex = (page: string) => `0${pages.indexOf(page) + 1}`

const scroll = (page: string) => {
  const scrollOffset = document.getElementById(page)?.offsetTop
  if (scrollOffset !== undefined) {
    window.scrollTo({ top: scrollOffset + 1, behavior: "smooth" })
    history.replaceState({}, "", `#${page}`)
    window.dispatchEvent(new HashChangeEvent("hashchange"))
  }
}

function Menu() {
  const [currentPage, setCurrentPage] = useState(
    () => pages.find((page) => `#${page}` === window.location.hash) ?? pages[0],
  )

  useEffect(() => {
    const initialPage = window.location.hash.replace("#", "")
    if (initialPage !== pages[0] && pages.includes(initialPage)) {
      document.getElementById(initialPage)?.scrollIntoView()
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!window.matchMedia("(min-width: 1024px)").matches) return
      const step = { ArrowUp: -1, ArrowDown: 1 }[event.key]
      if (step === undefined) return
      event.preventDefault()
      const next = pages[pages.indexOf(currentPage) + step]
      if (next) scroll(next)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPage])

  useEffect(() => {
    const handleHashChange = () => {
      const page = window.location.hash.replace("#", "")
      if (pages.includes(page)) setCurrentPage(page)
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 border-r-8 bg-background lg:block">
        <button
          onClick={() => scroll(pages[0])}
          className="absolute top-8 left-8 font-mono text-sm font-medium tracking-tight"
        >
          sahan<span className="text-signal">.</span>tech
        </button>

        <span
          aria-hidden
          className="rule-progress absolute top-0 -right-2 h-full w-2 origin-top bg-signal"
        />
        <div
          aria-hidden
          className="absolute top-1/2 -right-1 translate-x-1/2 -translate-y-1/2 rotate-180 bg-background pt-8 pb-8 [writing-mode:vertical-rl]"
        >
          <span
            key={currentPage}
            className="block text-[3.5rem] leading-none font-medium tracking-tight motion-safe:animate-in motion-safe:duration-500 motion-safe:fade-in motion-safe:slide-in-from-top-8"
          >
            {toLabel(currentPage)}
          </span>
        </div>

        <nav className="absolute right-8 bottom-8 left-8 flex flex-col gap-1 font-mono">
          {pages.map((page) => {
            const active = page === currentPage
            return (
              <button
                key={page}
                onClick={() => scroll(page)}
                aria-current={active ? "location" : undefined}
                className={`group flex items-center gap-3 py-2 text-left text-[1.05rem] transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <span className="text-xs">{toIndex(page)}</span>
                {toLabel(page)}
                <span
                  className={`h-0.5 bg-signal transition-all duration-300 ${active ? "w-6" : "w-0 group-hover:w-3"}`}
                />
              </button>
            )
          })}
        </nav>
      </aside>

      <header className="fixed inset-x-0 top-0 z-20 bg-foreground text-background lg:hidden">
        <div className="flex h-14 items-center gap-3 px-6">
          <span className="font-mono text-xs text-signal">
            {toIndex(currentPage)}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-[1.75rem] leading-none font-medium tracking-tight">
              {toLabel(currentPage)}
              <ChevronDown size={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup
                value={currentPage}
                onValueChange={scroll}
              >
                {pages.map((page) => (
                  <DropdownMenuRadioItem
                    key={page}
                    value={page}
                    className="font-mono text-base"
                  >
                    {toLabel(page)}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <span
          aria-hidden
          className="rule-progress absolute inset-x-0 bottom-0 h-1 origin-left bg-signal [--rule-from:0_1]"
        />
      </header>
    </>
  )
}

export default Menu
