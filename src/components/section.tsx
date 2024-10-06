import { useEffect, useRef, useState } from 'react'

function Section({
    title,
    children,
    className = undefined
}: React.PropsWithChildren<{ title: string; className?: string }>) {
    const elementRef = useRef(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const element = elementRef.current
            if (element) {
                const top = element.offsetTop
                const bottom = element.offsetTop + element.offsetHeight
                const documentScroll = window.scrollY

                if (!inView && top <= documentScroll && bottom >= documentScroll) {
                    setInView(true)
                    history.replaceState({}, '', `#${title}`)
                    window.dispatchEvent(new HashChangeEvent('hashchange'))
                }
                if (inView && (top > documentScroll || bottom < documentScroll)) {
                    setInView(false)
                }
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [inView, setInView])

    return (
        <div
            id={title}
            ref={elementRef}
            className={`min-h-screen font-mono text-[color:--foreground] text-left pt-20 lg:pt-0 ${className}`}
        >
            {children}
        </div>
    )
}

export default Section
