import Link from 'next/link'
import styles from "@/shared/styles/components/Public/Anchor.module.css"

interface Props {
  url: string
  children: React.ReactNode
}

export function Anchor({ url, children }: Partial<Props>) {
  return (
    <Link
      href={url ?? "#"}
      className={styles.link}
    >
      {children}
    </Link>
  )
}