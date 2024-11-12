import PreventBackButton from '@shared/components/Logic/PreventBack'
import { SessionProvider } from '@/contexts/Session'
import { readTokenServer } from '@/utils/session'
import styles from '@shared/styles/layout.module.css'
import Sidebar from '@shared/components/Sidebar'


interface Props {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: Props) {
  const result = await readTokenServer()
  return (
    <>
      <SessionProvider
        payload={result.payload}
        token={result.token}
      >
        <PreventBackButton />
        <div className={styles.layout}>
          <nav className={styles.nav}></nav>
          <Sidebar />
          <section className={styles.content}>
            {children}
          </section>
        </div>

      </SessionProvider>
    </>
  )
}