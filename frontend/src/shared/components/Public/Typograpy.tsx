import { createElement } from 'react'


interface Props {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  fontWeight: number | 'normal' | 'bold' | 'bolder' | 'lighter' | 'initial' | 'inherit'
  textAlign: 'left' | 'center' | 'right' | 'justify' | 'initial' | 'inherit'
  margin: boolean
  color: string
  fontSize: string
  children: React.ReactNode
}

export function Typography(props: Partial<Props>) {
  const {
    variant = 'h2',
    color = '#111827',
    fontSize = '28px',
    fontWeight = '700',
    textAlign = 'center',
    margin = true,
    children
  } = props

  const style: React.CSSProperties = {
    color,
    fontSize,
    fontWeight,
    textAlign,
    margin: variant.startsWith('h') && margin ? '16px 0px' : '0px'
  }


  return createElement(
    variant,
    {
      style
    },
    children
  )
}