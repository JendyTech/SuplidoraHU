// app/layout.tsx o app/layout.ts
import "@/shared/styles/global.css"
import { Metadata } from "next"
import { LoaderProvider } from '@/contexts/Loader'
import { Toaster } from 'sonner'
import { LoadAppScreen } from '@/shared/components/Screen/LoadAppScreen'
import { poppins } from '@/config/fonts'

// Puedes definir metadata aquí o en un archivo metadata.ts
export const metadata: Metadata = {
  title: "Suplidora HU",
  description: "Suplidora HU",
  icons: {
    icon: "/logomini.png", // Asegúrate que /public/logo.png existe
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={poppins.className}>
      <body>
        <div id="top" />
        <LoaderProvider>
          {children}
          <LoadAppScreen />
        </LoaderProvider>
        <Toaster
          richColors
          closeButton
          position='top-right'
          visibleToasts={1}
          toastOptions={{
            duration: 3000
          }}
        />
      </body>
    </html>
  )
}
