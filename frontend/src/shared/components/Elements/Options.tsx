"use client"

import styles from '@shared/styles/components/Elements/Options.module.css'
import Link from 'next/link'
import { IconDotsVertical } from '@tabler/icons-react'
import { useId, useState, useRef, useEffect } from 'react'
import { IOptions } from '@contracts/Options'

interface Props<T> {
  options: IOptions<T>[]
  disabled: boolean
  data: T
  actions: Record<string, (data: T) => void>
}

export function Options<T>({ data, options = [], disabled = false }: Partial<Props<T>>) {
  const [show, setShow] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const ulRef = useRef<HTMLUListElement>(null)
  const [outTime, setOutTime] = useState<NodeJS.Timeout | undefined>()
  const optionsElements = options.map((option) => {
    return {
      id: useId(),
      ...option
    }
  })

  const handleButton = (handle: IOptions<T>) => {
    if (handle.type === 'button') {
      handle.handler(data as T)
    }
  }

  const handleClick = () => {
    const { current: button } = buttonRef
    const { current: ul } = ulRef

    if (!button || !ul) return

    const buttonPositionX = button.getBoundingClientRect()
    const buttonPositionY = button.getBoundingClientRect()

    ul.style.left = `${buttonPositionX.left}px`
    ul.style.top = `${buttonPositionY.bottom}px`

    setShow((prev) => !prev)
  }

  const handleClickOutside = (event: MouseEvent) => {
    clearTimeout(outTime)
    const { current: button } = buttonRef
    const { current: ul } = ulRef

    if (!button || !ul) return

    if (button.contains(event.target as Node) || ul.contains(event.target as Node)) return

    ul.animate(
      [
        { opacity: 1, transform: 'translateY(0px)' },
        { opacity: 0, transform: 'translateY(-10px)' }
      ],
      {
        duration: 300,
        easing: 'ease-in-out'
      }
    )

    setOutTime(setTimeout(() => {
      setShow(false)
    }, 300))
  }

  useEffect(() => {
    if (show) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [show])

  return (
    <>
      <div
        className={`
          ${styles.blurBackground}
          ${show && styles.blurBackgroundActive}
        `}
      />

      <div className={styles.menu}>
        <button className={`${styles.handleShow} ${styles.button}`} disabled={disabled} ref={buttonRef} onClick={handleClick}>
          <IconDotsVertical size={20} />
        </button>
        <div className={styles.container}>
          <ul className={`${styles.list} bg-neutral`} style={{ display: show ? 'block' : 'none' }} ref={ulRef}>
            {
              optionsElements.map((option) => (
                <li className={styles.listElement} key={option.id}>
                  {
                    option.type === 'button'
                      ? (
                        <button
                          className={`${styles.option} ${styles.button}`}
                          onClick={() => {
                            setShow(false)
                            handleButton(option)
                          }}
                        >
                          {option.icon && <option.icon size={20} />}
                          {option.text}
                        </button>
                      )
                      : (
                        <Link
                          href={option.href}
                          target={option.newTab ? '_blank' : undefined}
                          className={`${styles.option} ${styles.link}`}
                        >
                          {option.icon && <option.icon size={20} />}
                          {option.text}
                        </Link>
                      )
                  }
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}
