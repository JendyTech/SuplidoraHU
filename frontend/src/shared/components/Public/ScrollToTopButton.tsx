"use client"

import { IconArrowUp } from '@tabler/icons-react'
import { useState, useEffect } from "react"

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight

    if (scrollTop / scrollHeight > 0.2) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    globalThis.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    globalThis.addEventListener("scroll", handleScroll)
    return () => {
      globalThis.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <button
      onClick={scrollToTop}
      className='hoverOpacityElement'
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "var(--primary-color)",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        display: isVisible ? "block" : "none",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        fontSize: "20px",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
      aria-label="Scroll to top"
    >
      <IconArrowUp />
    </button>
  )
}