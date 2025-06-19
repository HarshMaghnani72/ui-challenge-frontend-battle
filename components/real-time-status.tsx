"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Wifi, WifiOff, RefreshCw, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface RealTimeStatusProps {
  isConnected: boolean
  lastUpdated: Date | null
  onRefresh: () => void
  isRefreshing?: boolean
}

export default function RealTimeStatus({
  isConnected,
  lastUpdated,
  onRefresh,
  isRefreshing = false,
}: RealTimeStatusProps) {
  const formatLastUpdated = (date: Date | null) => {
    if (!date) return "Never"

    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)

    if (seconds < 60) return `${seconds}s ago`
    if (minutes < 60) return `${minutes}m ago`
    return date.toLocaleTimeString()
  }

  return (
    <motion.div
      className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Connection Status */}
      <div className="flex items-center gap-2">
        <AnimatePresence mode="wait">
          {isConnected ? (
            <motion.div
              key="connected"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Wifi className="w-4 h-4 text-green-500" />
              </motion.div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
              >
                Live Data
              </Badge>
            </motion.div>
          ) : (
            <motion.div
              key="disconnected"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <WifiOff className="w-4 h-4 text-red-500" />
              <Badge variant="destructive" className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                Offline
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Last Updated */}
      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <Clock className="w-4 h-4" />
        <span>Updated {formatLastUpdated(lastUpdated)}</span>
      </div>

      {/* Refresh Button */}
      <Button variant="ghost" size="sm" onClick={onRefresh} disabled={isRefreshing} className="ml-auto">
        <motion.div
          animate={isRefreshing ? { rotate: 360 } : {}}
          transition={{ duration: 1, repeat: isRefreshing ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
        >
          <RefreshCw className="w-4 h-4" />
        </motion.div>
        <span className="ml-2">Refresh</span>
      </Button>
    </motion.div>
  )
}
