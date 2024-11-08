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

function Menu() {
  const pages = ["about-me", "projects", "skills"]
  const [currentPage, setCurrentPage] = useState(pages[0])

  const scroll = (page: string) => {
    const scrollOffset = document.getElementById(page)?.offsetTop
    if (scrollOffset !== undefined) {
      window.scrollTo({
        top: scrollOffset + 1,
        behavior: "smooth",
      })
      setCurrentPage(page)
      history.replaceState({}, "", `#${page}`)
    }
  }
  const scrollToPrev = () => {
    if (pages.indexOf(currentPage) !== 0) {
      scroll(pages[pages.indexOf(currentPage) - 1])
    }
  }
  const scrollToNext = () => {
    if (pages.indexOf(currentPage) !== pages.length - 1) {
      scroll(pages[pages.indexOf(currentPage) + 1])
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (screen.width >= 1024) {
        if (event.key === "ArrowUp") {
          scrollToPrev()
        } else if (event.key === "ArrowDown") {
          scrollToNext()
        }
        event.preventDefault()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPage])

  useEffect(() => {
    const handleHashChange = () => {
      if (pages.includes(window.location.hash.replace("#", ""))) {
        setCurrentPage(window.location.hash.replace("#", ""))
      }
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [currentPage])

  return (
    <div>
      <div className="hidden lg:block fixed bottom-0 left-0 w-60 h-screen border-r-8 border-foreground bg-background">
        <div className="absolute bottom-0 w-full mb-8 px-8 text-justify">
          {pages.map((page, index) => {
            return (
              <MenuItem
                key={`menu-item-${index + 1}`}
                heading={page}
                active={page === currentPage}
                onClick={() => scroll(page)}
              />
            )
          })}
        </div>
        <div className="absolute -rotate-90 h-[5rem] w-[19rem] left-[5rem] top-[calc(50%-6rem)] bg-background text-[3.5rem] text-foreground">
          {toCamelCase(currentPage.replace("-", " "))}
        </div>
      </div>
      <div className="block lg:hidden fixed top:0 w-full bg-foreground z-10">
        <div className="text-[2.5rem] text-background text-left pl-10">
          <div className="flex gap-2 items-center">
            {toCamelCase(currentPage.replace("-", " "))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <ChevronDown size={32} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-foreground">
                <DropdownMenuRadioGroup
                  value={currentPage}
                  onValueChange={scroll}
                >
                  {pages.map((page, index) => {
                    return (
                      <DropdownMenuRadioItem
                        key={`menu-dropdown-index-${index + 1}`}
                        value={page}
                        className="text-lg text-background"
                      >
                        {toCamelCase(page.replace("-", " "))}
                      </DropdownMenuRadioItem>
                    )
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

const MenuItem = ({
  heading,
  active,
  onClick,
}: {
  heading: string
  active: boolean
  onClick: () => void
}) => {
  const styling =
    "font-mono py-4 decoration-[color:--foreground] text-foreground text-[1.1rem]"
  return (
    <div
      className={`${styling} ${active ? "underline" : ""}`}
      onClick={onClick}
    >
      {toCamelCase(heading.replace("-", " "))}
    </div>
  )
}

export default Menu
