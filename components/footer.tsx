"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { YakutOrnament } from "./yakut-ornament"

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  })
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  const stats = [
    { value: "392", label: "года истории" },
    { value: "\u201150\u00B0C", label: "рекорд холода" },
    { value: "380K+", label: "жителей" },
  ]

  return (
    <footer ref={ref} className="relative overflow-hidden py-28 md:py-40">
      {/* Background layers */}
      <motion.div className="absolute inset-0 z-0" style={{ opacity: bgOpacity }}>
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
        <div className="absolute bottom-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/[0.02] blur-[180px]" />
        <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-primary/[0.01] blur-[120px]" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.6em] text-primary/60 md:text-xs">
            400 лет истории
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mt-8 font-serif text-4xl font-bold text-[#F8FAFC] md:text-5xl lg:text-6xl">
            <span className="text-balance">История продолжается</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 1 }}
        >
          <YakutOrnament className="my-7" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 1.2 }}
        >
          <p className="mx-auto max-w-lg text-sm leading-[1.8] text-[#F8FAFC]/35 md:text-base">
            Каждый день Якутск пишет новую главу, соединяя древние традиции народа саха
            с технологиями будущего.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 1 }}
          className="mx-auto mt-14 flex max-w-xl items-center justify-center gap-10 md:gap-20"
        >
          {stats.map((stat, i) => (
            <div key={i} className="group text-center">
              <p className="font-serif text-2xl font-bold text-primary transition-all duration-500 group-hover:text-[#F8FAFC] md:text-3xl lg:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-[9px] uppercase tracking-[0.25em] text-[#F8FAFC]/20 transition-colors duration-500 group-hover:text-[#F8FAFC]/40 md:text-[10px]">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Bottom credit line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 1.2 }}
          className="mt-24 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2">
            <div className="h-px w-6 bg-primary/10" />
            <div className="h-1 w-1 rotate-45 border border-primary/15" />
            <div className="h-px w-6 bg-primary/10" />
          </div>
          <span className="text-[9px] tracking-[0.4em] text-[#F8FAFC]/15">
            ЯКУТСК : СКВОЗЬ ВЕКА
          </span>
        </motion.div>
      </div>
    </footer>
  )
}
