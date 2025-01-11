"use client"
import styles from '@/shared/styles/components/screen/LoadAppScreen.module.css'
import { useLoader } from '@/contexts/Loader'

export function LoadAppScreen() {
  const { loading } = useLoader()

  if (!loading) return null

  return (
    <div className={styles.root} style={{ zIndex: 9999999 }}>
      <div className={styles.box}>
        <svg viewBox="25 25 50 50" className={styles.svg}>
          <circle r="20" cy="50" cx="50" className={styles.circle}></circle>
        </svg>
      </div>
    </div>
  )
}
