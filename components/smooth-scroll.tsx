"use client"

import { useEffect, useRef } from "react"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<InstanceType<typeof import("@studio-freight/lenis").default> | null>(null)

  useEffect(() => {
    // Ensure we start at the top
    window.scrollTo(0, 0)

    let lenis: InstanceType<typeof import("@studio-freight/lenis").default> | null = null

    const init = async () => {
      const Lenis = (await import("@studio-freight/lenis")).default
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenisRef.current = lenis

      // Scroll to top again after Lenis inits
      lenis.scrollTo(0, { immediate: true })

      function raf(time: number) {
        lenis?.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      // Use event delegation for anchor links so dynamically rendered links work
      const handleClick = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement).closest('a[href^="#"]')
        if (!anchor) return
        const href = anchor.getAttribute("href")
        if (!href || href === "#") return

        e.preventDefault()

        // Use getElementById instead of querySelector to avoid issues with IDs starting with digits
        const targetId = href.slice(1)
        const target = document.getElementById(targetId)
        if (target) {
          lenis?.scrollTo(target, { offset: 0 })
        }
      }

      document.addEventListener("click", handleClick)

      // Store cleanup ref
      return () => {
        document.removeEventListener("click", handleClick)
      }
    }

    let cleanupClick: (() => void) | undefined
    init().then((cleanup) => {
      cleanupClick = cleanup
    })

    return () => {
      cleanupClick?.()
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
