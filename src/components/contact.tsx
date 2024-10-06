import { PropsWithChildren } from 'react'

const TextContactLink = ({
    link,
    target,
    children
}: PropsWithChildren<{ link: string; target: string }>) => {
    return (
        <a
            className="underline-none text-blue-600 hover:text-blue-600 visited:text-purple-600"
            target={target}
            href={link}
        >
            {children}
        </a>
    )
}

const RoundIconContactLink = ({
    link,
    target,
    children
}: PropsWithChildren<{ link: string; target: string }>) => {
    return (
        <a
            className="underline text-blue-600 hover:text-blue-600 visited:text-purple-600 rounded-2xl border-solid border-2 border-[color:--foreground] p-1"
            target={target}
            href={link}
        >
            {children}
        </a>
    )
}

export { TextContactLink, RoundIconContactLink }
