"use client"

import { motion, useInView } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import { useRef } from "react"
import { projectSources, sourceGroups } from "@/lib/source-data"
import { YakutOrnament } from "./yakut-ornament"

interface SourcesSectionProps {
  onQuizClick: () => void
}

export function SourcesSection({ onQuizClick }: SourcesSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const sourceById = new Map(projectSources.map((source) => [source.id, source]))

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32" id="sources">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
        <div className="absolute right-0 top-1/4 h-[420px] w-[420px] rounded-full bg-primary/[0.015] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-primary/60 md:text-xs">
            Проверено к защите
          </p>
          <h2 className="mt-6 font-serif text-4xl font-bold text-[#F8FAFC] md:text-5xl">
            <span className="text-balance">Источники и контроль фактов</span>
          </h2>
          <YakutOrnament className="my-7" />
          <p className="mx-auto max-w-xl text-sm leading-[1.8] text-[#F8FAFC]/40 md:text-base">
            Даты, статистика и спорные формулировки сверены по открытым источникам.
            Актуальная проверка: май 2026 года.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sourceGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + index * 0.06 }}
              className="border border-[#F8FAFC]/[0.06] bg-[#F8FAFC]/[0.018] p-5"
            >
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rotate-45 border border-primary/40" />
                <h3 className="font-serif text-lg font-bold text-[#F8FAFC]/85">{group.title}</h3>
              </div>

              <div className="mt-5 space-y-4">
                {group.sourceIds.map((sourceId) => {
                  const source = sourceById.get(sourceId)
                  if (!source) return null

                  return (
                    <a
                      key={source.id}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group block border-l border-primary/15 pl-4 transition-colors duration-300 hover:border-primary/50"
                    >
                      <span className="flex items-start gap-2 text-sm font-medium leading-snug text-[#F8FAFC]/55 transition-colors duration-300 group-hover:text-primary">
                        {source.title}
                        <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 opacity-40 transition-opacity group-hover:opacity-80" />
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-[#F8FAFC]/25">
                        {source.note}
                      </span>
                    </a>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-14 max-w-3xl border border-primary/15 bg-primary/[0.035] p-6 text-center"
        >
          <p className="text-sm leading-relaxed text-[#F8FAFC]/45 md:text-base">
            История города лучше запоминается, когда за фактами сразу видно опору:
            документы, музейные материалы, статистика и современные данные.
          </p>
          <button
            onClick={onQuizClick}
            className="group mx-auto mt-6 flex items-center gap-3 border border-primary/30 bg-primary/[0.07] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-primary transition-all duration-300 hover:border-primary/50 hover:bg-primary/[0.12] md:text-sm"
          >
            Перейти к викторине
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
