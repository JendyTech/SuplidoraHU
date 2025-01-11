import PreventBackButton from '@shared/components/Logic/PreventBack'
import { SessionProvider } from '@/contexts/Session'
import { readTokenServer } from '@/utils/session'
import styles from '@shared/styles/layout.module.css'
import Sidebar from '@shared/components/Sidebar'
import Navbar from '@shared/components/Navbar'


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
          <Sidebar />
          <div className={styles.layout2}>
            <div className={styles.navContainer}>
              <nav className={styles.nav}>
                <Navbar />
              </nav>
            </div>
            <div className={styles.appContainer} >
              <main className={styles.content}>
                {children}
              </main>
            </div>
          </div>

        </div>

      </SessionProvider>
    </>
  )
}