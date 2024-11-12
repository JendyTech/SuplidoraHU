"use client"
import { IUserLoggeding } from '@interfaces/UserLoggeding'
import { createContext, useContext, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { GLOBAL_TOKEN, STORAGES } from '@config/constants'
import { useShortFormatName } from '@/hooks/useShortName'
import { useReadToken } from '@/hooks/useReadToken'
import { setCookie } from '@/utils/cookies'

interface SessionContextType {
  setData: (token: string) => void
  data: IUserLoggeding
  firstName: string
  token: string
}

export const SessionContext = createContext<SessionContextType>({
  setData: () => { },
  data: {} as IUserLoggeding,
  firstName: "",
  token: "",
})

export function useSession() {
  return useContext(SessionContext)
}

interface Props {
  children: ReactNode
  payload: IUserLoggeding
  token: string
}

export function SessionProvider({ children, payload, token }: Props) {
  if (!payload) return children

  const { push } = useRouter()
  const [data, setData] = useState(payload)

  if (typeof window !== 'undefined') {
    (globalThis as any).token = token
  }

  const setDataToken = async (token: string) => {
    try {
      const payload = useReadToken(token)

      if (!payload) {
        push("/auth")
        return
      }

      setData({
        ...payload,
        name: useShortFormatName(payload?.name),
      })
      await setCookie(STORAGES.TOKEN, token, 30)
    } catch (error) {
      push("/auth")
    }
  }


  const firstName = ""

  return (
    <SessionContext.Provider value={{
      data: {
        ...data,
        name: useShortFormatName(data.name),
      }, setData: setDataToken,
      firstName,
      token
    }}>
      {children}
    </SessionContext.Provider>
  )
}

