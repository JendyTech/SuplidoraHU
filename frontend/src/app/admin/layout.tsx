import PreventBackButton from '@shared/components/Logic/PreventBack'
import { SessionProvider } from '@/contexts/Session'
import { readTokenServer } from '@/utils/session'

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
        {children}
      </SessionProvider>
    </>
  )
}