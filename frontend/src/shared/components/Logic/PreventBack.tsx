"use client"

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function PreventBackButton() {
    const router = useRouter()

    useEffect(() => {
        const handlePopState = () => {
            router.replace('/admin')
        }

        window.addEventListener('popstate', handlePopState)

        window.history.replaceState(null, '', window.location.href)
        window.history.pushState(null, '', window.location.href)

        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [router])

    return null
}

export default PreventBackButton