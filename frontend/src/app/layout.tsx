// app/layout.tsx - Solución completa
import "@/shared/styles/global.css"
import { Metadata } from "next"
import { LoaderProvider } from '@/contexts/Loader'
import { Toaster } from 'sonner'
import { LoadAppScreen } from '@/shared/components/Screen/LoadAppScreen'
import { poppins } from '@/config/fonts'

export const metadata: Metadata = {
  title: "Suplidora HU",
  description: "Suplidora HU",
  icons: {
    icon: [
      {
        url: "/logomini.png",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      }
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Suplidora HU",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={poppins.className}>
      <head>
        {/* Favicons explícitos para mejor compatibilidad */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logomini.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Meta tags adicionales */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />

        {/* Prevenir caché de favicon en desarrollo */}
        {process.env.NODE_ENV === 'development' && (
          <link rel="icon" href={`/logomini.png?v=${Date.now()}`} />
        )}
      </head>
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