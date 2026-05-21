"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TopNavProps {
  activeTab: "timeline" | "quiz"
  onTabChange: (tab: "timeline" | "quiz") => void
}

export function TopNav({ activeTab, onTabChange }: TopNavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const topShowY = 120
    const intentThreshold = 8
    let touchY: number | null = null
    let lastIntent: "up" | "down" | null = null

    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 40)

      if (currentY <= 4) {
        setVisible(true)
        lastIntent = null
      } else if (currentY <= topShowY && lastIntent !== "down") {
        setVisible(true)
      }
    }

    const handleWheel = (event: WheelEvent) => {
      const currentY = window.scrollY

      if (Math.abs(event.deltaY) < intentThreshold) return

      lastIntent = event.deltaY > 0 ? "down" : "up"
      setVisible(lastIntent === "up")
    }

    const handleTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? null
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (touchY === null) return

      const currentY = event.touches[0]?.clientY ?? touchY
      const delta = touchY - currentY
      touchY = currentY

      if (Math.abs(delta) < intentThreshold) return

      lastIntent = delta > 0 ? "down" : "up"
      setVisible(lastIntent === "up")
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        lastIntent = "down"
        setVisible(false)
      }

      if (["ArrowUp", "PageUp", "Home"].includes(event.key)) {
        lastIntent = "up"
        setVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("wheel", handleWheel, { passive: true })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("keydown", handleKeyDown)
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[60] flex items-center justify-center transition-[opacity,padding,transform] duration-300 ease-out",
        scrolled ? "py-3" : "py-5"
      )}
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translate3d(0, 0, 0)" : "translate3d(0, -5rem, 0)",
      }}
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
                <div className="absolute inset-0 border border-primary/20 bg-primary/[0.08]" />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          )
        })}
      </nav>
    </header>
  )
}
