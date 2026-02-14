"use client"

import { motion, useScroll, useTransform } from "framer-motion"

export function AmbientBackground() {
  const { scrollYProgress } = useScroll()

  // Shift hue subtly as user scrolls through eras
  const hue = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [200, 210, 195, 220, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Top-left ambient glow */}
      <motion.div
        className="absolute -left-1/4 -top-1/4 h-[50vh] w-[50vh] rounded-full blur-[160px]"
        style={{
          background: useTransform(
            hue,
            (h) => `radial-gradient(circle, hsla(${h}, 70%, 50%, 0.04), transparent 70%)`
          ),
        }}
      />

      {/* Bottom-right ambient glow */}
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 h-[60vh] w-[60vh] rounded-full blur-[180px]"
        style={{
          background: useTransform(
            hue,
            (h) => `radial-gradient(circle, hsla(${h + 20}, 60%, 40%, 0.03), transparent 70%)`
          ),
        }}
      />

      {/* Center subtle glow that pulses */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.02, 0.04, 0.02],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.02] blur-[200px]"
      />
    </motion.div>
  )
}
