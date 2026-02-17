"use client"

import { useState, useCallback, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Hero } from "@/components/hero"
import { TimelineNav } from "@/components/timeline-nav"
import { EraSection } from "@/components/era-section"
import { Footer } from "@/components/footer"
import { ParticleField } from "@/components/particle-field"
import { SmoothScroll } from "@/components/smooth-scroll"
import { LoadingScreen } from "@/components/loading-screen"
import { AmbientBackground } from "@/components/ambient-bg"
import { TopNav } from "@/components/top-nav"
import { Quiz } from "@/components/quiz"
import { timelineData } from "@/lib/timeline-data"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"timeline" | "quiz">("timeline")

  const handleTabChange = useCallback((tab: "timeline" | "quiz") => {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
  }, [])

  return (
    <>
      <LoadingScreen />
      <TopNav activeTab={activeTab} onTabChange={handleTabChange} />

      <AnimatePresence mode="wait">
        {activeTab === "timeline" ? (
          <motion.div
            key="timeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SmoothScroll>
              <main className="noise-overlay relative min-h-screen bg-[#030303]">
                {/* Atmospheric layers */}
                <ParticleField />
                <AmbientBackground />

                {/* Timeline navigation */}
                <TimelineNav />

                {/* Hero section */}
                <Hero />

                {/* Era sections */}
                <div className="relative z-[2]">
                  {timelineData.map((era, index) => (
                    <EraSection key={era.id} era={era} index={index} />
                  ))}
                </div>

                {/* Footer */}
                <Footer />
              </main>
            </SmoothScroll>
          </motion.div>
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <main className="noise-overlay relative min-h-screen bg-[#030303]">
              <Quiz />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
