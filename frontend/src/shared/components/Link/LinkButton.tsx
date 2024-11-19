import styles from "@shared/styles/components/Link/link.module.css"
import Link from 'next/link'


interface Props {
    children: React.ReactNode
    to: string
}

export function LinkButton(props: Partial<Props>) {
    const {
        children = <></>,
        to = ''
    } = props


    return (
        <Link
            className={styles.link}
            href={to}
        >
            {children}
        </Link>
    )
}