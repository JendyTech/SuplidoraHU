import PreventBackButton from '@shared/components/Logic/PreventBack'
import adminStyle from '@shared/styles/layout.module.css'
import publicStyle from "@/shared/styles/publicLayout.module.css"
import AdminNav from '@shared/components/Navbar'
import Sidebar from '@shared/components/Sidebar'
import { Typography } from '@shared/components/Public/Typograpy'
import { Navbar } from '@shared/components/Public/Navbar'
import { Footer } from '@shared/components/Public/Footer'
import { Anchor } from '@shared/components/Public/Anchor'
import { SessionProvider } from '@/contexts/Session'
import { verifySession } from '@/utils/session'
import { headers } from 'next/headers'

export default async function NotFoundPage() {
  const session = await verifySession()
  const headersList = await headers()

  const host = headersList.get('host') ?? 'localhost'
  const path = headersList.get('referer')?.split(host)?.[1] ?? '/'

  if (session && path.startsWith('/admin')) {
    return (
      <>
        <SessionProvider
          payload={session.payload}
          token={session.token}
        >
          <PreventBackButton />
          <div className={adminStyle.layout}>
            <Sidebar />
            <div className={adminStyle.layout2}>
              <div className={adminStyle.navContainer}>
                <nav className={adminStyle.nav}>
                  <AdminNav />
                </nav>
              </div>
              <div className={adminStyle.appContainer} >
                <main className={adminStyle.notFoudMain}>
                  <Typography
                    fontSize='5rem'
                    margin={false}
                  >
                    404
                  </Typography>

                  <Typography
                    variant='span'
                    fontWeight={500}
                    fontSize='2rem'
                  >
                    Página no encontrada
                  </Typography>

                  <Anchor
                    url='/admin'
                  >
                    Volver al inicio
                  </Anchor>
                </main>
              </div>
            </div>
          </div>
        </SessionProvider>
      </>
    )
  }


  return (
    <div className={publicStyle.container} >
      <Navbar />
      <main
        className={publicStyle.notFoudMain}
      >
        <Typography
          fontSize='5rem'
          margin={false}
        >
          404
        </Typography>

        <Typography
          variant='span'
          fontWeight={500}
          fontSize='2rem'
        >
          Página no encontrada
        </Typography>

        <Anchor
          url='/'
        >
          Volver al inicio
        </Anchor>
      </main>
      <Footer />
    </div>
  )
}