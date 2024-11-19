import { Icon, IconBuildingWarehouse, IconProps, IconShoppingCart } from '@tabler/icons-react'
import styles from '@modules/productos/styles/productos.module.css'
import Table from '@modules/productos/components/Table'
export default function ProductsPage() {
    return (
        <div className={styles.main}>
            <div className={styles.infoContainerGroup}>
                <InfoContainer Icon={IconShoppingCart} title={200} subtitle='Productos en sistema' color='#287881' />
                <InfoContainer Icon={IconBuildingWarehouse} title={124} subtitle='Productos en stock' color='#EF7B52' />
            </div>

            <div className={styles.tableContainer}>
                <Table />
            </div>
        </div>
    )
}
// Productos <Link href={'/admin/productos/crear-producto'}>Crear un producto</Link>

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
