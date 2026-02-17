"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { quizData, type QuizQuestion } from "@/lib/quiz-data"
import { YakutOrnament } from "./yakut-ornament"
import { cn } from "@/lib/utils"

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function getGrade(score: number, total: number) {
  const pct = score / total
  if (pct === 1) return { title: "Легенда Якутска!", text: "Вы знаете историю города идеально." }
  if (pct >= 0.8) return { title: "Знаток Севера", text: "Отличный результат! Вы многое знаете о Якутске." }
  if (pct >= 0.6) return { title: "Путешественник", text: "Хорошие знания! Но можно узнать ещё больше." }
  if (pct >= 0.4) return { title: "Начинающий исследователь", text: "Неплохо, но стоит перечитать историю." }
  return { title: "Гость из далёких краёв", text: "Вернитесь к таймлайну и откройте Якутск заново!" }
}

const QUESTIONS_PER_QUIZ = 7

export function Quiz() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro")
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<{ questionId: number; correct: boolean }[]>([])

  const startQuiz = useCallback(() => {
    const shuffled = shuffleArray(quizData).slice(0, QUESTIONS_PER_QUIZ)
    setQuestions(shuffled)
    setCurrentIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setAnswers([])
    setGameState("playing")
  }, [])

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (isAnswered) return
      setSelectedOption(optionIndex)
      setIsAnswered(true)
      const isCorrect = optionIndex === questions[currentIndex].correctIndex
      if (isCorrect) setScore((prev) => prev + 1)
      setAnswers((prev) => [...prev, { questionId: questions[currentIndex].id, correct: isCorrect }])
    },
    [isAnswered, questions, currentIndex]
  )

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setGameState("result")
    } else {
      setCurrentIndex((prev) => prev + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    }
  }, [currentIndex, questions.length])

  const currentQuestion = questions[currentIndex]
  const grade = useMemo(() => getGrade(score, questions.length), [score, questions.length])

  return (
    <div className="relative min-h-screen bg-[#030303]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.02] blur-[200px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/[0.015] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 md:py-28">
        <AnimatePresence mode="wait">
          {/* INTRO */}
          {gameState === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-primary/60 md:text-xs">
                Проверь свои знания
              </p>

              <h1 className="mt-6 font-serif text-4xl font-bold text-[#F8FAFC] md:text-5xl lg:text-6xl">
                <span className="text-balance">Викторина по Якутску</span>
              </h1>

              <YakutOrnament className="my-8" />

              <p className="mx-auto max-w-md text-sm leading-relaxed text-[#F8FAFC]/40 md:text-base">
                {QUESTIONS_PER_QUIZ} вопросов по истории города. Каждый раз вопросы выбираются случайно из
                банка. Узнайте, насколько хорошо вы запомнили путешествие сквозь века.
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={startQuiz}
                className="mt-10 flex items-center gap-3 border border-primary/30 bg-primary/[0.06] px-8 py-4 text-sm font-medium tracking-wider text-primary transition-colors duration-300 hover:border-primary/50 hover:bg-primary/[0.12]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary">
                  <path d="M12 2L16 8L12 14L8 8Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 10L16 16L12 22L8 16Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                НАЧАТЬ ВИКТОРИНУ
              </motion.button>

              {/* Decorative stats */}
              <div className="mt-16 flex items-center gap-8 md:gap-14">
                {[
                  { value: String(quizData.length), label: "вопросов в банке" },
                  { value: "7", label: "эпох истории" },
                  { value: "394", label: "года" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="font-serif text-xl font-bold text-primary/60 md:text-2xl">{stat.value}</p>
                    <p className="mt-1 text-[9px] uppercase tracking-wider text-[#F8FAFC]/20 md:text-[10px]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PLAYING */}
          {gameState === "playing" && currentQuestion && (
            <motion.div
              key={`q-${currentQuestion.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Progress bar */}
              <div className="mb-12">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-[#F8FAFC]/25">
                  <span>
                    Вопрос {currentIndex + 1} / {questions.length}
                  </span>
                  <span className="text-primary/50">{currentQuestion.era}</span>
                </div>
                <div className="mt-3 h-px w-full bg-[#F8FAFC]/[0.06]">
                  <motion.div
                    className="h-full bg-primary/40"
                    animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Question */}
              <h2 className="font-serif text-2xl font-bold leading-snug text-[#F8FAFC] md:text-3xl">
                <span className="text-balance">{currentQuestion.question}</span>
              </h2>

              {/* Options */}
              <div className="mt-8 flex flex-col gap-3">
                {currentQuestion.options.map((option, i) => {
                  const isCorrect = i === currentQuestion.correctIndex
                  const isSelected = selectedOption === i
                  let variant: "default" | "correct" | "wrong" = "default"
                  if (isAnswered) {
                    if (isCorrect) variant = "correct"
                    else if (isSelected && !isCorrect) variant = "wrong"
                  }

                  return (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      onClick={() => handleSelect(i)}
                      disabled={isAnswered}
                      className={cn(
                        "group relative flex items-center gap-4 border px-5 py-4 text-left transition-all duration-300",
                        variant === "default" &&
                          "border-[#F8FAFC]/[0.06] bg-[#F8FAFC]/[0.02] hover:border-primary/30 hover:bg-primary/[0.04]",
                        variant === "correct" &&
                          "border-emerald-500/40 bg-emerald-500/[0.08]",
                        variant === "wrong" &&
                          "border-red-500/40 bg-red-500/[0.08]",
                        isAnswered && !isSelected && !isCorrect && "opacity-40"
                      )}
                    >
                      {/* Letter marker */}
                      <span
                        className={cn(
                          "flex h-7 w-7 flex-shrink-0 items-center justify-center border text-xs font-medium transition-colors duration-300",
                          variant === "default" &&
                            "border-[#F8FAFC]/10 text-[#F8FAFC]/30 group-hover:border-primary/30 group-hover:text-primary/50",
                          variant === "correct" && "border-emerald-500/50 text-emerald-400",
                          variant === "wrong" && "border-red-500/50 text-red-400"
                        )}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>

                      <span
                        className={cn(
                          "text-sm md:text-base transition-colors duration-300",
                          variant === "default" && "text-[#F8FAFC]/50 group-hover:text-[#F8FAFC]/80",
                          variant === "correct" && "text-emerald-300",
                          variant === "wrong" && "text-red-300"
                        )}
                      >
                        {option}
                      </span>

                      {/* Correct / Wrong indicator */}
                      {isAnswered && isCorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto flex-shrink-0"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M5 13l4 4L19 7"
                              stroke="rgb(52, 211, 153)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.div>
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto flex-shrink-0"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M18 6L6 18M6 6l12 12"
                              stroke="rgb(248, 113, 113)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              {/* Explanation + Next */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 16, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 border-l-2 border-primary/20 bg-[#F8FAFC]/[0.015] py-4 pl-5 pr-5">
                      <p className="text-xs leading-relaxed text-[#F8FAFC]/40 md:text-sm">
                        {currentQuestion.explanation}
                      </p>
                    </div>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      className="mt-6 flex w-full items-center justify-center gap-2 border border-[#F8FAFC]/[0.08] bg-[#F8FAFC]/[0.03] py-3.5 text-sm font-medium tracking-wider text-[#F8FAFC]/60 transition-colors duration-300 hover:border-primary/30 hover:text-primary"
                    >
                      {currentIndex + 1 >= questions.length ? "РЕЗУЛЬТАТЫ" : "ДАЛЕЕ"}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12h14M12 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* RESULTS */}
          {gameState === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-primary/60 md:text-xs">
                Результат
              </p>

              <h2 className="mt-6 font-serif text-4xl font-bold text-[#F8FAFC] md:text-5xl">
                {grade.title}
              </h2>

              <YakutOrnament className="my-8" />

              {/* Score circle */}
              <div className="relative flex h-36 w-36 items-center justify-center md:h-44 md:w-44">
                <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 54}
                    initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                    animate={{
                      strokeDashoffset:
                        2 * Math.PI * 54 - (score / questions.length) * 2 * Math.PI * 54,
                    }}
                    transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </svg>
                <div className="text-center">
                  <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="font-serif text-4xl font-bold text-primary md:text-5xl"
                  >
                    {score}
                  </motion.p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-[#F8FAFC]/25">
                    из {questions.length}
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#F8FAFC]/40">{grade.text}</p>

              {/* Answer summary */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                {answers.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.08 }}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center border text-xs font-medium",
                      a.correct
                        ? "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-400"
                        : "border-red-500/30 bg-red-500/[0.08] text-red-400"
                    )}
                  >
                    {i + 1}
                  </motion.div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={startQuiz}
                  className="flex items-center gap-3 border border-primary/30 bg-primary/[0.06] px-8 py-4 text-sm font-medium tracking-wider text-primary transition-colors duration-300 hover:border-primary/50 hover:bg-primary/[0.12]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M1 4v6h6M23 20v-6h-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  ПРОЙТИ ЗАНОВО
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
