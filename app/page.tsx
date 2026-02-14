"use client"

import { Hero } from "@/components/hero"
import { TimelineNav } from "@/components/timeline-nav"
import { EraSection } from "@/components/era-section"
import { Footer } from "@/components/footer"
import { ParticleField } from "@/components/particle-field"
import { SmoothScroll } from "@/components/smooth-scroll"
import { LoadingScreen } from "@/components/loading-screen"
import { AmbientBackground } from "@/components/ambient-bg"
import { timelineData } from "@/lib/timeline-data"

export default function Home() {
  return (
    <SmoothScroll>
      <LoadingScreen />

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
  )
}
