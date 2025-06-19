"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ArrowRight, Download, TrendingUp, TrendingDown, ExternalLink, FileText, Database } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import LiveMetricsDashboard from "./live-metrics-dashboard"
import { apiClient } from "@/lib/api-client"

// Ripple Effect Component
const RippleButton = ({
  children,
  onClick,
  className = "",
}: { children: React.ReactNode; onClick?: () => void; className?: string }) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const newRipple = { x, y, id: Date.now() }

    setRipples((prev) => [...prev, newRipple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 600)

    onClick?.()
  }

  return (
    <button className={`relative overflow-hidden ${className}`} onClick={handleClick}>
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animationDuration: "0.6s",
          }}
        />
      ))}
    </button>
  )
}

// Animated Counter Component
const AnimatedCounter = ({
  value,
  suffix = "",
  duration = 2000,
}: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)

        setCount(Math.floor(progress * value))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Progress Bar Component
const AnimatedProgressBar = ({
  value,
  maxValue,
  year,
  delay = 0,
}: { value: number; maxValue: number; year: string; delay?: number }) => {
  const percentage = (value / maxValue) * 100
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-between mb-3 group hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors duration-200"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
    >
      <div className="flex items-center gap-4 flex-1">
        <span className="text-slate-600 dark:text-slate-400 font-medium w-12">{year}</span>
        <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: `${percentage}%` } : {}}
            transition={{ delay: delay * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
      <span className="text-slate-700 dark:text-slate-300 font-semibold ml-4 min-w-[80px] text-right">
        {value.toLocaleString()}
      </span>
    </motion.div>
  )
}

// Metric Card Component
const MetricCard = ({
  title,
  value,
  unit,
  change,
  changeType,
  data,
  actionText,
  actionIcon: ActionIcon,
  dataType,
  delay = 0,
}: {
  title: string
  value: string | number
  unit: string
  change: string
  changeType: "increase" | "decrease"
  data: Array<{ year: string; value: number }>
  actionText: string
  actionIcon: any
  dataType: string
  delay?: number
}) => {
  const maxValue = Math.max(...data.map((d) => d.value))
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { toast } = useToast()

  const handleAction = async () => {
    if (actionText.includes("breakdown")) {
      // Navigate to detailed breakdown
      toast({
        title: "Opening Detailed Breakdown",
        description: "Loading comprehensive carbon footprint analysis...",
      })
      // In a real app, this would navigate to a detailed page
      setTimeout(() => {
        window.open("#insights", "_self")
      }, 1000)
    } else if (actionText.includes("Download")) {
      // Handle data download
      try {
        toast({
          title: "Preparing Download",
          description: "Generating your sustainability data export...",
        })

        await apiClient.exportData("csv", dataType)

        toast({
          title: "Download Complete",
          description: "Your data has been downloaded successfully.",
        })
      } catch (error) {
        toast({
          title: "Download Failed",
          description: "There was an error downloading your data. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 group">
        <CardHeader className="pb-4">
          <CardTitle className="text-slate-700 dark:text-slate-300 text-base font-medium leading-relaxed">
            {title}
          </CardTitle>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">
              <AnimatedCounter value={typeof value === "string" ? Number.parseInt(value.replace(/,/g, "")) : value} />
            </span>
            <span className="text-slate-600 dark:text-slate-400 text-sm">{unit}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={changeType === "increase" ? "destructive" : "secondary"} className="text-xs">
              {changeType === "increase" ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {change}
            </Badge>
            <span className="text-xs text-slate-500 dark:text-slate-400">from 2019</span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-1 mb-6">
            {data.map((item, index) => (
              <AnimatedProgressBar
                key={item.year}
                value={item.value}
                maxValue={maxValue}
                year={item.year}
                delay={delay + index}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <RippleButton
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-2 px-4 rounded-full flex items-center justify-center gap-2 transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-500 group-hover:shadow-md"
              onClick={handleAction}
            >
              <span className="text-sm font-medium">{actionText}</span>
              <ActionIcon className="w-4 h-4" />
            </RippleButton>

            {/* Additional Export Options */}
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => apiClient.exportData("json", dataType)}
              >
                <Database className="w-3 h-3 mr-1" />
                JSON
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => apiClient.exportData("pdf", dataType)}
              >
                <FileText className="w-3 h-3 mr-1" />
                PDF
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => window.open(`#insights`, "_self")}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Metrics() {
  const carbonData = [
    { year: "2022", value: 45048 },
    { year: "2021", value: 14111 },
    { year: "2020", value: 32813 },
    { year: "2019", value: 38673 },
  ]

  const energyIntensityData = [
    { year: "2022", value: 123 },
    { year: "2021", value: 128 },
    { year: "2020", value: 135 },
    { year: "2019", value: 157 },
  ]

  const energyConsumptionData = [
    { year: "2022", value: 47790662 },
    { year: "2021", value: 49324077 },
    { year: "2020", value: 48784205 },
    { year: "2019", value: 65198706 },
  ]

  return (
    <section id="metrics" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Sustainability Metrics Dashboard
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Comprehensive real-time insights into your environmental impact and performance
          </p>
        </motion.div>

        <LiveMetricsDashboard />

        {/* Add a separator */}
        <div className="border-t border-slate-200 dark:border-slate-700 my-12"></div>

        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Historical Data Analysis</h3>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Compare current performance with historical trends
          </p>
        </motion.div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <MetricCard
            title="Managed portfolio carbon footprint"
            value="45,048"
            unit="tCO₂e"
            change="16%"
            changeType="increase"
            data={carbonData}
            actionText="See full breakdown of carbon footprint"
            actionIcon={ArrowRight}
            dataType="carbon-footprint"
            delay={0.2}
          />
          <MetricCard
            title="Managed portfolio energy intensity"
            value="123"
            unit="kWh/m²"
            change="22%"
            changeType="decrease"
            data={energyIntensityData}
            actionText="Download the data"
            actionIcon={Download}
            dataType="energy-data"
            delay={0.4}
          />
          <MetricCard
            title="Managed portfolio energy consumption"
            value="47,790,662"
            unit="kWh"
            change="27%"
            changeType="decrease"
            data={energyConsumptionData}
            actionText="Download the data"
            actionIcon={Download}
            dataType="energy-data"
            delay={0.6}
          />
        </div>
      </div>
    </section>
  )
}
