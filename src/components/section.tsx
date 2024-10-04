function Section({
    title,
    children,
    className = undefined
}: React.PropsWithChildren<{ title: string; className?: string }>) {
    return (
        <div id={title} className={`h-screen content-center ${className}`}>
            {children}
        </div>
    )
}

export default Section
