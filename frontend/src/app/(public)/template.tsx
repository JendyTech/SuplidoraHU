"use client"

import { motion } from 'framer-motion'

const Transition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.35 }}
    >
      {children}
    </motion.div>
  )
}

export default Transition