"use client"

import { useEffect, useState } from 'react'

interface AutoGridProps {
  children?: React.ReactNode
  fullWidthMaxWidth?: number
  columnMinWidth?: string
  columnMaxWidth?: string
  gap?: string
  justifyContent?: 'space-between' | 'space-around' | 'center' | 'start' | 'end'
  margin?: string
}

export function AutoGrid({
  children,
  fullWidthMaxWidth = 998,
  columnMinWidth = "49%",
  columnMaxWidth = '1fr',
  gap = '24px',
  justifyContent = 'space-between',
  margin = '0px',
}: AutoGridProps) {
  const [isFullWidth, setIsFullWidth] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkWidth = () => {
      const currentWidth = window.innerWidth
      setIsFullWidth(currentWidth < fullWidthMaxWidth)
      setIsMobile(currentWidth < 768)
    }

    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [fullWidthMaxWidth])

  const min = `calc(${columnMinWidth} - ${gap})`

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: isFullWidth ? '1fr' : `repeat(auto-fit, minmax(${min}, ${columnMaxWidth}))`,
    gap: gap,
    width: '100%',
    maxWidth: '100%',
    justifyContent: isFullWidth ? 'center' : justifyContent,
    margin
  }

  const mobileStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: gap,
    width: '100%',
    maxWidth: '100%',
    justifyContent: 'center',
    margin
  }

  return (
    <div style={isMobile ? mobileStyles : gridStyles}>
      {children}
    </div>
  )
}
