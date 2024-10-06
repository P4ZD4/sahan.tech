import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

function Menu() {
    const pages = ['about-me', 'projects', 'skills']
    const [currentPage, setCurrentPage] = useState(pages[0])
    const [lastScrollTime, setLastScrollTime] = useState(new Date().getTime())

    const scroll = (page: string) => {
        setLastScrollTime(new Date().getTime())
        const scrollOffset = document.getElementById(page)?.offsetTop
        if (scrollOffset !== undefined) {
            window.scrollTo({
                top: scrollOffset + 1,
                behavior: 'smooth'
            })
            setCurrentPage(page)
            history.replaceState({}, '', `#${page}`)
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
        const handleWheel = (event: WheelEvent) => {
            if (screen.width >= 1024) {
                if (new Date().getTime() - lastScrollTime > 1000) {
                    if (event.deltaY < 0) {
                        scrollToPrev()
                    } else if (event.deltaY > 0) {
                        scrollToNext()
                    }
                }
                event.preventDefault()
            }
        }
        window.addEventListener('wheel', handleWheel)
        return () => window.removeEventListener('wheel', handleWheel)
    }, [currentPage])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (screen.width >= 1024) {
                if (event.key === 'ArrowUp') {
                    scrollToPrev()
                } else if (event.key === 'ArrowDown') {
                    scrollToNext()
                }
                event.preventDefault()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [currentPage])

    useEffect(() => {
        const handleHashChange = () => {
            console.log(window.location.hash)
            if (pages.includes(window.location.hash.replace('#', ''))) {
                setCurrentPage(window.location.hash.replace('#', ''))
            }
        }
        window.addEventListener('hashchange', handleHashChange)
        return () => window.removeEventListener('hashchange', handleHashChange)
    }, [currentPage])

    return (
        <div>
            <div className="hidden lg:block fixed bottom-0 left-0 w-60 h-screen border-r-8 border-[color:--foreground] bg-[color:--background]">
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
                <div className="font-mono absolute -rotate-90 h-[5rem] w-[19rem] left-[5rem] top-[calc(50%-6rem)] bg-[color:--background] text-[3.5rem] text-[color:--foreground]">
                    {currentPage.replace('-', ' ').toUpperCase()}
                </div>
            </div>
            <div className="block lg:hidden fixed top:0 w-full bg-[color:--foreground]">
                <div className="font-mono text-[2.5rem] text-[color:--background] text-left pl-10">
                    <div className="flex gap-2 items-center">
                        {currentPage.replace('-', ' ').toUpperCase()}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <ChevronDown size={32} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-[color:--foreground]">
                                <DropdownMenuRadioGroup value={currentPage} onValueChange={scroll}>
                                    {pages.map((page, index) => {
                                        return (
                                            <DropdownMenuRadioItem
                                                key={`menu-dropdown-index-${index + 1}`}
                                                value={page}
                                                className="text-lg text-[color:--background]"
                                            >
                                                {page.replace('-', ' ').toUpperCase()}
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
    onClick
}: {
    heading: string
    active: boolean
    onClick: () => void
}) => {
    const styling =
        'font-mono py-4 decoration-[color:--foreground] text-[color:--foreground] text-[1.1rem]'
    return (
        <div className={`${styling} ${active ? 'underline' : ''}`} onClick={onClick}>
            {heading.replace('-', ' ').toUpperCase()}
        </div>
    )
}

export default Menu
