"use client"

import { useRef, useState } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion"
import type { TimelineEra } from "@/lib/timeline-data"
import { YakutDivider } from "./yakut-ornament"

interface EraSectionProps {
  era: TimelineEra
  index: number
}

export function EraSection({ era, index }: EraSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, margin: "-60px" })
  const [showSecondImage, setShowSecondImage] = useState(false)

  const isEven = index % 2 === 0

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  
  // Additional parallax effects
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const glowY = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Mouse-follow tilt on the image
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.section
      ref={sectionRef}
      id={era.id}
      className="relative py-24 md:py-36 lg:py-44"
      style={{ opacity: sectionOpacity }}
    >
      {/* Per-section ambient glow with parallax */}
      <motion.div 
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ opacity: glowOpacity }}
      >
        <motion.div
          className={`absolute h-[500px] w-[500px] rounded-full bg-primary/[0.015] blur-[150px] ${
            isEven ? "-left-48 top-1/4" : "-right-48 top-1/3"
          }`}
          style={{ y: glowY, scale: glowScale }}
        />
        {/* Secondary glow on opposite side */}
        <motion.div
          className={`absolute h-[400px] w-[400px] rounded-full bg-primary/[0.01] blur-[120px] ${
            isEven ? "-right-32 bottom-1/4" : "-left-32 bottom-1/3"
          }`}
          style={{ y: useTransform(glowY, (v) => -v * 0.5) }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`flex flex-col items-center gap-12 md:gap-16 lg:flex-row lg:gap-16 ${
            isEven ? "" : "lg:flex-row-reverse"
          }`}
        >
          {/* Image block with tilt */}
          <div className="relative w-full lg:w-[60%]">
            <motion.div
              ref={imageRef}
              style={{ y: imageY, scale: imageScale, rotateX, rotateY, transformPerspective: 1200 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group relative overflow-hidden rounded-sm"
            >
              {/* Overlay glow on hover */}
              <div className="absolute inset-0 z-20 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.06] to-transparent" />
              </div>

              {/* Glass border */}
              <div className="absolute -inset-px z-10 rounded-sm border border-[#F8FAFC]/[0.06]" />

              {/* Image */}
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={showSecondImage && era.image2 ? "img2" : "img1"}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.8 }}
                    src={showSecondImage && era.image2 ? era.image2 : era.image}
                    alt={era.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                  />
                </AnimatePresence>

                {/* Multi-layer overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/60 via-transparent to-[#030303]/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/20 via-transparent to-[#030303]/20" />

                {/* Side accent line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute top-0 bottom-0 z-10 w-[2px] origin-top bg-primary/50 ${
                    isEven ? "left-0" : "right-0"
                  }`}
                />
              </div>

              {/* Image switcher */}
              {era.image2 && (
                <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                  {[false, true].map((isSecond, i) => (
                    <button
                      key={i}
                      onClick={() => setShowSecondImage(isSecond)}
                      aria-label={`Показать изображение ${i + 1}`}
                      className={`h-1.5 transition-all duration-500 ${
                        showSecondImage === isSecond
                          ? "w-8 rounded-full bg-primary shadow-[0_0_8px_rgba(56,189,248,0.4)]"
                          : "w-4 rounded-full bg-[#F8FAFC]/20 hover:bg-[#F8FAFC]/40"
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Year badge - glass morphism */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? 24 : -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute -bottom-6 z-20 ${
                isEven ? "-right-2 md:-right-5" : "-left-2 md:-left-5"
              }`}
            >
              <div className="flex items-center gap-3 border border-[#F8FAFC]/[0.06] bg-[#030303]/90 px-5 py-3 backdrop-blur-xl">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
                <span className="font-serif text-lg font-bold tracking-wider text-primary md:text-xl">
                  {era.year}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Text content */}
          <motion.div 
            className="w-full lg:w-[40%]" 
            ref={contentRef}
            style={{ y: contentY }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-primary/70 md:text-xs">
                {era.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-glow mt-5 font-serif text-3xl font-bold leading-tight text-[#F8FAFC] md:text-4xl lg:text-5xl">
                <span className="text-balance">{era.title}</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="origin-left"
            >
              <div className="mt-5 flex items-center gap-2">
                <div className="h-px w-12 bg-primary/40" />
                <div className="h-1 w-1 rotate-45 border border-primary/30" />
                <div className="h-px w-6 bg-primary/20" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mt-6 max-w-lg text-sm leading-[1.8] text-[#F8FAFC]/45 md:text-base lg:text-lg lg:leading-[1.9]">
                {era.description}
              </p>
            </motion.div>

            {/* Stats block */}
            {era.stats && era.stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <div className="grid grid-cols-3 gap-4">
                  {era.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                      className="relative overflow-hidden border border-[#F8FAFC]/[0.06] bg-[#F8FAFC]/[0.02] p-4 text-center"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent" />
                      <p className="relative font-serif text-2xl font-bold text-primary md:text-3xl">
                        {stat.value}
                      </p>
                      <p className="relative mt-1 text-[9px] uppercase tracking-wider text-[#F8FAFC]/40 md:text-[10px]">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Main fact block */}
            {era.fact && (
              <motion.div
                initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <div className="relative overflow-hidden border-l-2 border-primary/20 bg-[#F8FAFC]/[0.015] py-4 pl-5 pr-5">
                  <div className="absolute -left-20 top-0 h-full w-20 rotate-12 bg-gradient-to-r from-transparent via-[#F8FAFC]/[0.02] to-transparent" />
                  <div className="flex items-start gap-3">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mt-0.5 flex-shrink-0 text-primary/50"
                    >
                      <path d="M12 2L16 8L12 14L8 8Z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 10L16 16L12 22L8 16Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <p className="text-xs leading-relaxed text-[#F8FAFC]/35 md:text-sm">
                      {era.fact}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Additional facts list */}
            {era.facts && era.facts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 space-y-3"
              >
                {era.facts.map((fact, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.1 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1.5 h-1 w-1 flex-shrink-0 rotate-45 border border-primary/40" />
                    <p className="text-xs leading-relaxed text-[#F8FAFC]/30 md:text-sm">
                      {fact}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Section divider */}
      <div className="mt-24 md:mt-32">
        <YakutDivider />
      </div>
    </motion.section>
  )
}
