import { IconUser, IconUserCheck } from '@tabler/icons-react'
import styles from '@modules/productos/styles/productos.module.css'
import { InfoContainer } from '@modules/productos/components/InfoContainer'
import UsersTable from '@modules/usuarios/components/UserTable'
import { getAllUsers } from '@services/users'
import { ErrorLoadServer } from '@shared/components/Error/ErrorLoadServer'

export default async function UsersPage() {

  try {
    const response = await getAllUsers({}, true)

    if (!response.ok) return <ErrorLoadServer />

    return (
      <div className={styles.main}>
        <div className={styles.infoContainerGroup}>
          <InfoContainer Icon={IconUser} title={response.result.metadata.total} subtitle='Usarios en sistema' color='#287881' />
          <InfoContainer Icon={IconUserCheck} title={124} subtitle='Usuarios activos' color='#EF7B52' />
        </div>


        <UsersTable initialState={response.result} />

      </div>
    )
  } catch (error) {
    return <ErrorLoadServer />

  }
}

