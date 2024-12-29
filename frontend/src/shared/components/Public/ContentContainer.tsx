import styles from "@/shared/styles/components/Public/ContentContainer.module.css"

interface Props {
  children: React.ReactNode
}

export function ContentContainer({ children }: Props) {
  return (
    <div
      className={styles.container}
    >
      {children}
    </div>
  )
}