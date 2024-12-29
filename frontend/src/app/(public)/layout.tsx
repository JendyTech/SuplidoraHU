import "@/shared/styles/public.css"
import styles from "@/shared/styles/publicLayout.module.css"
import { ScrollToTopButton } from '@shared/components/Public/ScrollToTopButton'
import { Navbar } from '@shared/components/Public/Navbar'
import { Footer } from '@shared/components/Public/Footer'
import { PageParams } from '@interfaces/Page'

interface Props extends PageParams {
  children: React.ReactNode
}

export default async function PublicLayout({ children }: Props) {
  return (
    <div className={styles.container}>
      <Navbar />
      <main
        className={styles.main}
      >
        {children}
      </main>
      <Footer />

      <ScrollToTopButton />
    </div>
  )
}