function Section({
    title,
    children
}: React.PropsWithChildren<{ title: string }>) {
    return (
        <div
            id={title}
            className="h-screen"
        >
            {children}
        </div>
    )
}

export default Section
