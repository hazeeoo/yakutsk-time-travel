"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { timelineData } from "@/lib/timeline-data"
import { cn } from "@/lib/utils"

export function TimelineNav() {
  const [activeSection, setActiveSection] = useState<string>("hero")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > window.innerHeight * 0.6)

      const sections = ["hero", ...timelineData.map((d) => d.id)]
      let current = "hero"

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.45) {
            current = sectionId
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const activeIndex = timelineData.findIndex((d) => d.id === activeSection)
  const progressPercent = activeIndex >= 0 ? (activeIndex / (timelineData.length - 1)) * 100 : 0

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 lg:flex xl:right-8"
          aria-label="Навигация по таймлайну"
        >
          <div className="relative flex flex-col items-end gap-8">
            {/* Vertical background track */}
            <div className="absolute right-[5px] top-0 bottom-0 w-px bg-[#F8FAFC]/[0.04]" />

            {/* Animated progress fill */}
            <motion.div
              className="absolute right-[5px] top-0 w-px origin-top bg-primary/30"
              animate={{ height: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />

            {timelineData.map((era, index) => {
              const isActive = activeSection === era.id
              const isPast = index <= activeIndex

              return (
                <a
                  key={era.id}
                  href={`#${era.id}`}
                  className="group relative flex items-center gap-4"
                  aria-label={`Перейти к ${era.year}`}
                >
                  {/* Year + subtitle label */}
                  <div
                    className={cn(
                      "flex flex-col items-end transition-all duration-500",
                      isActive
                        ? "translate-x-0 opacity-100"
                        : "translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-70"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[10px] font-semibold tracking-[0.2em] transition-colors duration-500",
                        isActive ? "text-primary" : "text-[#F8FAFC]/50"
                      )}
                    >
                      {era.year}
                    </span>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-0.5 text-[8px] tracking-[0.15em] text-[#F8FAFC]/25"
                      >
                        {era.subtitle}
                      </motion.span>
                    )}
                  </div>

                  {/* Dot */}
                  <div className="relative z-10 flex items-center justify-center">
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-ring"
                        className="absolute h-7 w-7 rounded-full border border-primary/20"
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-glow"
                        className="absolute h-5 w-5 rounded-full bg-primary/10"
                        transition={{ duration: 0.5 }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative block rounded-full transition-all duration-500",
                        isActive
                          ? "h-[10px] w-[10px] bg-primary shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                          : isPast
                            ? "h-[6px] w-[6px] bg-primary/40"
                            : "h-[6px] w-[6px] bg-[#F8FAFC]/10 group-hover:bg-primary/30"
                      )}
                    />
                  </div>
                </a>
              )
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
