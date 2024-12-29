import styles from "@/shared/styles/components/Public/Feature.module.css"
import { Icon123 } from "@tabler/icons-react"


interface Props {
  title: string
  description: string
  icon: typeof Icon123
}

export function Feature(props: Props) {
  const {
    title,
    description,
    icon: Icon
  } = props


  return (
    <article
      className={styles.container}
    >
      <div
        className={styles.icon}
      >
        <Icon size={30} strokeWidth={1.4} />
      </div>

      <h3
        className={styles.title}
      >
        {title}
      </h3>

      <p
        className={styles.description}
      >
        {description}
      </p>
    </article>
  )

}