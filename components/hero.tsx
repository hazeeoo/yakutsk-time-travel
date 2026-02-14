"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { YakutOrnament } from "./yakut-ornament"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    // Принудительно запускаем видео после загрузки
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay blocked:", error)
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Video background with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: videoScale, opacity: videoOpacity }}>
        {/* Постер пока видео грузится */}
        {!videoLoaded && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/1. 1632 год Основание.jpg')" }}
          />
        )}
        
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          poster="/images/1. 1632 год Основание.jpg"
          onLoadedData={() => setVideoLoaded(true)}
          onError={(e) => console.error("Video error:", e)}
        >
          <source src="/images/intro-compressed.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-[#030303]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/20 via-transparent to-[#030303]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/30 via-transparent to-[#030303]/30" />
      </motion.div>

      {/* Frosty vignette edges */}
      <div className="absolute inset-0 z-[1] pointer-events-none shadow-[inset_0_0_200px_rgba(3,3,3,0.9)]" />

      {/* Horizontal frost lines */}
      <div className="absolute top-[15%] left-0 right-0 z-[1] h-px bg-gradient-to-r from-transparent via-[#F8FAFC]/[0.03] to-transparent" />
      <div className="absolute bottom-[20%] left-0 right-0 z-[1] h-px bg-gradient-to-r from-transparent via-primary/[0.04] to-transparent" />

      {/* Content */}
      <motion.div className="relative z-10 px-6 text-center" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.5em] text-[#F8FAFC]/40 md:text-xs md:tracking-[0.6em]">
            Город, где начинается Россия
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-serif text-7xl font-bold tracking-tight text-[#F8FAFC] md:text-[8rem] lg:text-[11rem]">
            <span className="text-balance">Якутск</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <YakutOrnament className="my-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-serif text-xl font-light tracking-[0.3em] text-primary/80 md:text-2xl lg:text-3xl">
            Сквозь века
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-[#F8FAFC]/30 md:text-base">
            Путешествие через 400 лет истории от острога до IT-столицы
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.2 }}
          className="mt-24"
        >
          <motion.a
            href="#era-1632"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="group inline-flex flex-col items-center gap-4 text-[#F8FAFC]/20 transition-colors hover:text-primary/60"
            aria-label="Прокрутить вниз"
          >
            <span className="text-[9px] uppercase tracking-[0.5em] transition-colors group-hover:text-primary/60">
              Начать путешествие
            </span>
            <div className="relative flex flex-col items-center gap-1">
              <div className="h-8 w-px bg-gradient-to-b from-transparent to-current" />
              <ChevronDown className="h-3.5 w-3.5" />
            </div>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-48 bg-gradient-to-t from-[#030303] to-transparent" />
    </section>
  )
}
