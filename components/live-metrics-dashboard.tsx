"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Activity, Zap, Leaf } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRealTimeMetrics } from "@/hooks/use-real-time-data"
import RealTimeStatus from "./real-time-status"
import AirQualityWidget from "./air-quality-widget"

export default function LiveMetricsDashboard() {
  const { metrics, loading, error, lastUpdated, refetch } = useRealTimeMetrics(30000) // 30 second updates

  if (loading && !metrics) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error && !metrics) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Failed to load real-time data</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  const metricsData = [
    {
      title: "Carbon Footprint",
      value: metrics?.carbonFootprint.current || 0,
      unit: "tCO₂e",
      change: metrics?.carbonFootprint.change || 0,
      trend: metrics?.carbonFootprint.trend || "up",
      icon: Leaf,
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20",
    },
    {
      title: "Energy Intensity",
      value: metrics?.energyIntensity.current || 0,
      unit: "kWh/m²",
      change: metrics?.energyIntensity.change || 0,
      trend: metrics?.energyIntensity.trend || "down",
      icon: Activity,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
    },
    {
      title: "Energy Consumption",
      value: metrics?.energyConsumption.current || 0,
      unit: "kWh",
      change: metrics?.energyConsumption.change || 0,
      trend: metrics?.energyConsumption.trend || "down",
      icon: Zap,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
    },
  ]

  return (
    <section className="py-12 space-y-8">
      {/* Real-time Status */}
      <RealTimeStatus isConnected={!error} lastUpdated={lastUpdated} onRefresh={refetch} isRefreshing={loading} />

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Main Metrics */}
        {metricsData.map((metric, index) => {
          const Icon = metric.icon
          const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown

          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card
                className={`h-full hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${metric.bgColor} border-0`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
                    <span>{metric.title}</span>
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <motion.span
                        className="text-2xl font-bold text-slate-900 dark:text-white"
                        key={metric.value}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {metric.value.toLocaleString()}
                      </motion.span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">{metric.unit}</span>
                    </div>

                    <motion.div
                      className="flex items-center gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <TrendIcon className={`w-3 h-3 ${metric.trend === "up" ? "text-red-500" : "text-green-500"}`} />
                      <span
                        className={`text-xs font-medium ${
                          metric.trend === "up"
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {Math.abs(metric.change)}% vs last period
                      </span>
                    </motion.div>

                    {/* Live indicator */}
                    <div className="flex items-center gap-2 pt-2">
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <span className="text-xs text-slate-500 dark:text-slate-400">Live</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}

        {/* Air Quality Widget */}
        <AirQualityWidget />
      </div>

      {/* Data Sources */}
      <motion.div
        className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Data Sources</h4>
        <div className="flex flex-wrap gap-2">
          {["World Bank Climate API", "OpenWeatherMap Air Quality", "IEA Energy Statistics", "Real-time Sensors"].map(
            (source, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {source}
              </Badge>
            ),
          )}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
          Data is updated every 30 seconds from multiple verified sources
        </p>
      </motion.div>
    </section>
  )
}
