"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { YakutOrnament } from "./yakut-ornament";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Фиксированные позиции для частиц (избегаем Math.random для SSR)
  const particlePositions = [
    { left: 15, top: 20, duration: 3.2, delay: 0.1 },
    { left: 85, top: 15, duration: 4.1, delay: 0.5 },
    { left: 45, top: 60, duration: 3.8, delay: 1.2 },
    { left: 70, top: 35, duration: 4.5, delay: 0.8 },
    { left: 25, top: 75, duration: 3.5, delay: 1.5 },
    { left: 90, top: 50, duration: 4.2, delay: 0.3 },
    { left: 10, top: 40, duration: 3.9, delay: 1.8 },
    { left: 60, top: 80, duration: 4.0, delay: 0.6 },
    { left: 35, top: 25, duration: 3.7, delay: 1.0 },
    { left: 80, top: 70, duration: 4.3, delay: 0.4 },
    { left: 50, top: 10, duration: 3.6, delay: 1.4 },
    { left: 20, top: 55, duration: 4.4, delay: 0.9 },
    { left: 75, top: 45, duration: 3.4, delay: 1.6 },
    { left: 40, top: 90, duration: 4.1, delay: 0.2 },
    { left: 95, top: 30, duration: 3.8, delay: 1.1 },
    { left: 5, top: 65, duration: 4.2, delay: 0.7 },
    { left: 65, top: 20, duration: 3.5, delay: 1.3 },
    { left: 30, top: 85, duration: 4.0, delay: 0.5 },
    { left: 55, top: 50, duration: 3.9, delay: 1.7 },
    { left: 85, top: 15, duration: 4.3, delay: 0.3 },
  ];

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setMounted(true);
    // Показываем контент с задержкой для эффекта печати
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Принудительно запускаем видео после загрузки
    if (videoRef.current && videoLoaded) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay blocked:", error);
      });
    }
  }, [videoLoaded]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030303]"
    >
      {/* Animated background pattern while loading */}
      {!videoLoaded && !videoFailed && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#030303] via-[#0a0a0a] to-[#030303]" />

          {/* Animated grid */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.03) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(248, 250, 252, 0.03) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Animated light rays */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Frost particles */}
          {mounted &&
            particlePositions.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                }}
              />
            ))}
        </motion.div>
      )}

      {/* Video background with cinematic reveal */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: videoScale, opacity: videoOpacity }}
      >
        {videoFailed ? (
          <motion.img
            src="/images/1. 1632 год Основание - 2.jpg"
            alt="Якутский острог"
            className="h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : (
          <motion.video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/1. 1632 год Основание - 2.jpg"
            className="h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            animate={{
              opacity: videoLoaded ? 1 : 0,
              scale: videoLoaded ? 1 : 1.1,
              filter: videoLoaded ? "blur(0px)" : "blur(20px)",
            }}
            transition={{
              duration: 2,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.3,
            }}
            onCanPlay={() => setVideoLoaded(true)}
            onError={(error) => {
              console.log("Video fallback enabled:", error);
              setVideoFailed(true);
            }}
          >
            <source src="/images/intro-compressed.mp4" type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </motion.video>
        )}

        {/* Multi-layer overlay for depth */}
        <motion.div
          className="absolute inset-0 bg-[#030303]/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: videoLoaded || videoFailed ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/30 via-transparent to-[#030303]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/40 via-transparent to-[#030303]/40" />
      </motion.div>

      {/* Frosty vignette edges */}
      <div className="absolute inset-0 z-[1] pointer-events-none shadow-[inset_0_0_250px_rgba(3,3,3,0.95)]" />

      {/* Horizontal frost lines */}
      <div className="absolute top-[15%] left-0 right-0 z-[1] h-px bg-gradient-to-r from-transparent via-[#F8FAFC]/[0.03] to-transparent" />
      <div className="absolute bottom-[20%] left-0 right-0 z-[1] h-px bg-gradient-to-r from-transparent via-primary/[0.04] to-transparent" />

      {/* Content with typewriter effect */}
      <motion.div
        className="relative z-10 px-6 text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {showContent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="mb-4 text-[10px] font-medium uppercase tracking-[0.5em] text-[#F8FAFC]/60 drop-shadow-lg md:text-xs md:tracking-[0.6em]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {"Город, где начинается Россия".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.05, delay: 0.3 + i * 0.03 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.2 }}
            >
              <h1 className="font-serif text-7xl font-bold tracking-tight text-[#F8FAFC] drop-shadow-2xl md:text-[8rem] lg:text-[11rem]">
                <span className="text-balance">Якутск</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <YakutOrnament className="my-6" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              <p className="font-serif text-xl font-light tracking-[0.3em] text-primary drop-shadow-lg md:text-2xl lg:text-3xl">
                {"Сквозь века".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: 1.9 + i * 0.08 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 2.15 }}
            >
              <div className="mx-auto mt-8 h-px w-[min(18rem,70vw)] bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
              <div className="mx-auto mt-4 flex w-fit items-end justify-center gap-3 px-2 md:mt-9">
                <span className="relative font-serif text-4xl font-bold leading-[0.9] text-[#F8FAFC] drop-shadow-[0_0_26px_rgba(56,189,248,0.18)] [-webkit-text-stroke:0.8px_rgba(248,250,252,0.72)] md:text-5xl">
                  394
                </span>
                <span className="relative mb-1 text-left text-[10px] font-semibold uppercase leading-[1.3] tracking-[0.3em] text-[#F8FAFC]/65 md:text-[11px]">
                  года
                  <br />
                  истории
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.3 }}
            >
              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#F8FAFC]/60 drop-shadow-[0_0_16px_rgba(56,189,248,0.08)] md:text-base">
                Путешествие от острога XVII века до IT-столицы
              </p>
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-48 bg-gradient-to-t from-[#030303] to-transparent" />
    </section>
  );
}
