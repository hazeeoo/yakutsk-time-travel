"use client"

import { useState, useCallback, useEffect } from "react"
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

  useEffect(() => {
    document.title = "\u042F\u043A\u0443\u0442\u0441\u043A: \u0421\u043A\u0432\u043E\u0437\u044C \u0432\u0435\u043A\u0430"
  }, [])

  const handleTabChange = useCallback((tab: "timeline" | "quiz") => {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
  }, [])

  return (
    <>
      <LoadingScreen />
      <TopNav activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === "timeline" ? (
        <SmoothScroll>
          <main className="noise-overlay relative min-h-screen bg-[#030303]">
            <ParticleField />
            <AmbientBackground />
            <TimelineNav />
            <Hero />
            <div className="relative z-[2]">
              {timelineData.map((era, index) => (
                <EraSection key={era.id} era={era} index={index} />
              ))}
            </div>
            <Footer />
          </main>
        </SmoothScroll>
      ) : (
        <main className="noise-overlay relative min-h-screen bg-[#030303]">
          <Quiz />
        </main>
      )}
    </>
  )
}
