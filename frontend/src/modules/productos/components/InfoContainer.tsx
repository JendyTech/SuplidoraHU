import { Icon, IconProps } from "@tabler/icons-react"
import styles from '@modules/productos/styles/productos.module.css'

interface InfoContainerProps {
    Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>
    title: string | number
    subtitle: string
    color: string
}

export function InfoContainer(props: InfoContainerProps) {

    const { Icon, title, subtitle, color } = props

    return (
        <div className={styles.infoContainer}>
            <props.Icon className={styles.icon} strokeWidth={1.5} color={color} />
            <div>
                <p style={{ color }}>{title.toString()}</p>
                <span>{subtitle.toString()}</span>
            </div>
        </div>
    )
}
