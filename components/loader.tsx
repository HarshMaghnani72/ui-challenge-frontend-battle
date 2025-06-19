"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setShowLoader(false)
            setTimeout(onComplete, 300)
          }, 500)
          return 100
        }
        return prev + 1.5
      })
    }, 40)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />

          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center px-4">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-8">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #8b5cf6, #06b6d4, #10b981, #f59e0b, #ef4444, #8b5cf6)",
                  padding: "3px",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <div className="w-full h-full rounded-full bg-black" />
              </motion.div>

              <motion.div
                className="absolute inset-4 rounded-full"
                style={{
                  background: "conic-gradient(from 180deg, #06b6d4, #8b5cf6, #10b981, #06b6d4)",
                  padding: "2px",
                }}
                animate={{ rotate: -360 }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <div className="w-full h-full rounded-full bg-black" />
              </motion.div>

              <motion.div
                className="absolute inset-8 rounded-full bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              <div className="absolute inset-12 rounded-full bg-white shadow-lg" />

              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: "50%",
                    top: "50%",
                    marginLeft: "-4px",
                    marginTop: "-4px",
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  transformTemplate={({ rotate }) =>
                    `rotate(${rotate || 0}) translateX(${40 + i * 8}px) rotate(-${rotate || 0})`
                  }
                />
              ))}
            </div>

            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">EcoMetrics</h2>
              <motion.p
                className="text-gray-300 text-sm sm:text-base"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Loading sustainability data...
              </motion.p>
            </motion.div>

            <div className="w-64 sm:w-80 mx-auto">
              <motion.div
                className="h-1 bg-gray-800 rounded-full overflow-hidden mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </motion.div>

              <motion.div
                className="flex justify-between items-center text-xs sm:text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <span>Initializing...</span>
                <span>{Math.round(progress)}%</span>
              </motion.div>
            </div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="text-xs sm:text-sm text-gray-500 space-y-1">
                <motion.div
                  animate={{ opacity: progress > 20 ? 1 : 0.3 }}
                  className="flex items-center justify-center gap-2"
                >
                  <div className={`w-2 h-2 rounded-full ${progress > 20 ? "bg-green-500" : "bg-gray-600"}`} />
                  <span>Connecting to APIs</span>
                </motion.div>
                <motion.div
                  animate={{ opacity: progress > 50 ? 1 : 0.3 }}
                  className="flex items-center justify-center gap-2"
                >
                  <div className={`w-2 h-2 rounded-full ${progress > 50 ? "bg-green-500" : "bg-gray-600"}`} />
                  <span>Loading dashboard</span>
                </motion.div>
                <motion.div
                  animate={{ opacity: progress > 80 ? 1 : 0.3 }}
                  className="flex items-center justify-center gap-2"
                >
                  <div className={`w-2 h-2 rounded-full ${progress > 80 ? "bg-green-500" : "bg-gray-600"}`} />
                  <span>Finalizing setup</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
