import "@/shared/styles/global.css"
import { Metadata } from "next"
import { LoaderProvider } from '@/contexts/Loader'
import { Toaster } from 'sonner'
import { LoadAppScreen } from '@/shared/components/Screen/LoadAppScreen'

export const metadata: Metadata = {
  title: "Suplidora HU",
  description: "Suplidora HU"
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="es">
      <body>
        <LoaderProvider>
          {children}
          <LoadAppScreen />
        </LoaderProvider>
        <Toaster
          richColors
          closeButton
          position='top-right'
          visibleToasts={1}
        />
      </body>
    </html>
  )
}
