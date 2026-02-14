"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function YakutOrnament({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className={`flex items-center justify-center gap-4 ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-14 origin-right bg-gradient-to-l from-primary/40 to-transparent md:w-24"
      />
      <motion.svg
        initial={{ opacity: 0, scale: 0, rotate: -90 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        className="text-primary/50"
      >
        <path d="M12 2L16 8L12 14L8 8Z" stroke="currentColor" strokeWidth="0.8" />
        <path d="M12 10L16 16L12 22L8 16Z" stroke="currentColor" strokeWidth="0.8" />
        <line x1="4" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="0.8" />
        <line x1="16" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.3" />
      </motion.svg>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-14 origin-left bg-gradient-to-r from-primary/40 to-transparent md:w-24"
      />
    </div>
  )
}

export function YakutDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="mx-auto flex max-w-lg items-center justify-center gap-3 py-4">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-px flex-1 origin-right bg-gradient-to-r from-transparent to-primary/15"
      />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 45 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`border border-primary/25 ${
            i === 1 ? "h-2 w-2" : "h-1.5 w-1.5"
          }`}
        />
      ))}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-px flex-1 origin-left bg-gradient-to-l from-transparent to-primary/15"
      />
    </div>
  )
}
