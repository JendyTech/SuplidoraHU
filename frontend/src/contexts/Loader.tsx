"use client"

import { use, useState, createContext } from 'react'

interface LoaderContext {
  loading: boolean
  setLoading: (loading: boolean) => void
}

const LoaderContext = createContext<LoaderContext>({
  loading: false,
  setLoading: () => { },
})

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false)

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  )
}

export const useLoader = () => {
  const { loading, setLoading } = use(LoaderContext)

  return {
    loading,
    setLoading,
  }
}
