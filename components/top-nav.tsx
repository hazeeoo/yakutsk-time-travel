"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TopNavProps {
  activeTab: "timeline" | "quiz"
  onTabChange: (tab: "timeline" | "quiz") => void
}

export function TopNav({ activeTab, onTabChange }: TopNavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 40)

      // Hide on scroll down, show on scroll up
      if (currentY > lastScrollY && currentY > 200) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      setLastScrollY(currentY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed left-0 right-0 top-0 z-[60] flex items-center justify-center transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <nav
        className={cn(
          "flex items-center gap-1 border px-1.5 py-1.5 backdrop-blur-xl transition-all duration-500",
          scrolled
            ? "border-[#F8FAFC]/[0.08] bg-[#030303]/80"
            : "border-[#F8FAFC]/[0.04] bg-[#030303]/50"
        )}
      >
        {(["timeline", "quiz"] as const).map((tab) => {
          const isActive = activeTab === tab
          const label = tab === "timeline" ? "Хронология" : "Викторина"

          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={cn(
                "relative px-5 py-2 text-[11px] font-medium uppercase tracking-[0.25em] transition-colors duration-300 md:px-7 md:text-xs",
                isActive ? "text-primary" : "text-[#F8FAFC]/30 hover:text-[#F8FAFC]/60"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="tab-active-bg"
                  className="absolute inset-0 border border-primary/20 bg-primary/[0.08]"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          )
        })}
      </nav>
    </motion.header>
  )
}
