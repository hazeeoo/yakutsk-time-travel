"use client"

import { ArrowUp } from "lucide-react"

export function ScrollTopButton() {
  return (
    <a
      href="#hero"
      className="group fixed bottom-5 right-5 z-[58] flex h-12 w-12 items-center justify-center border border-primary/25 bg-[#030303]/80 text-primary shadow-[0_0_30px_rgba(56,189,248,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:bg-primary/[0.09] md:bottom-8 md:right-8"
      aria-label="Вернуться наверх"
    >
      <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap border border-[#F8FAFC]/[0.06] bg-[#030303]/90 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-[#F8FAFC]/35 opacity-0 backdrop-blur-xl transition-opacity duration-300 group-hover:opacity-100 md:block">
        наверх
      </span>
    </a>
  )
}
