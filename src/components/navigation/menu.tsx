import { useEffect, useState } from 'react'

function Menu() {
    const pages = [
        'about-me',
        'projects',
        'skills',
        'contact'
    ]
    const [currentPage, setCurrentPage] = useState(pages[0])
    const [lastScrollTime, setLastScrollTime] = useState(new Date().getTime())

    const scroll = (page: string) => {
        setLastScrollTime(new Date().getTime())
        const scrollOffset =
            document.getElementById(page)?.offsetTop
        if (scrollOffset !== undefined) {
            window.scrollTo({
                top: scrollOffset + 1,
                behavior: 'smooth'
            })
            setCurrentPage(page)
            history.replaceState({}, '', `#${page}`)
            console.log('setting current state', currentPage, page)
        }
    }
    const scrollToPrev = () => {
      if(pages.indexOf(currentPage) !== 0) {
        scroll(pages[pages.indexOf(currentPage) - 1])
      }
    }
    const scrollToNext = () => {
      if(pages.indexOf(currentPage) !== (pages.length - 1)) {
        scroll(pages[pages.indexOf(currentPage) + 1])
      }
    }

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
          console.log('in event')
          if(new Date().getTime() - lastScrollTime > 1000){
            if (event.deltaY < 0) {
              scrollToPrev()
            } else if (event.deltaY > 0) {
              scrollToNext()
            }
          }
          event.preventDefault()
        }
        window.addEventListener(
            'wheel',
            handleWheel
        )
        return () =>
            window.removeEventListener(
                'wheel',
                handleWheel
            )
    }, [currentPage])

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        console.log(event.key)
        if (event.key === 'ArrowUp') {
          scrollToPrev()
        }
        else if (event.key === 'ArrowDown') {
          scrollToNext()
        }
        event.preventDefault()
      }
      window.addEventListener(
          'keydown',
          handleKeyDown
      )
      return () =>
          window.removeEventListener(
              'keydown',
              handleKeyDown
          )
  }, [currentPage])

    return (
        <div className="fixed bottom-0 left-0 w-60 h-screen border-r-8 border-[color:--foreground]">
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
            <div className="font-mono absolute -rotate-90 h-48 w-[19rem] left-[8.5rem] top-[calc(50%-6rem)] bg-[color:--background] text-[3.5rem] text-[color:--foreground]">
                {currentPage
                    .replace('-', ' ')
                    .toUpperCase()}
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
        <div
            className={`${styling} ${active ? 'underline' : ''}`}
            onClick={onClick}
        >
            {heading.replace('-', ' ').toUpperCase()}
        </div>
    )
}

export default Menu
