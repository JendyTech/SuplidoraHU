import { SessionProvider } from '@/contexts/Session'
import { readTokenServer } from '@/utils/session'
import { redirect } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: Props) {
  const result = await readTokenServer()

  return (
    <SessionProvider
      payload={result.payload}
      token={result.token}
    >
      {children}
    </SessionProvider>
  )
}