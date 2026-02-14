"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 120)

    // Prevent scrolling while loading
    document.body.style.overflow = "hidden"
    window.scrollTo(0, 0)

    const timer = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = ""
      window.scrollTo(0, 0)
    }, 1800)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030303]"
        >
          {/* Ornamental diamond */}
          <motion.svg
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            className="text-primary/60"
          >
            <path d="M24 4L32 16L24 28L16 16Z" stroke="currentColor" strokeWidth="1" />
            <path d="M24 20L32 32L24 44L16 32Z" stroke="currentColor" strokeWidth="1" />
            <line x1="8" y1="24" x2="16" y2="24" stroke="currentColor" strokeWidth="1" />
            <line x1="32" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="1" />
          </motion.svg>

          {/* Progress bar */}
          <div className="mt-8 h-px w-48 overflow-hidden bg-[#F8FAFC]/5">
            <motion.div
              className="h-full bg-primary/50"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 font-serif text-xs tracking-[0.4em] text-[#F8FAFC]/20"
          >
            ЯКУТСК
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
