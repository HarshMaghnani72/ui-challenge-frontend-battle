"use client"

import { motion } from "framer-motion"
import { Activity, Zap, Leaf, TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRealTimeMetrics } from "@/hooks/use-real-time-data"
import RealTimeStatus from "./real-time-status"
import AirQualityWidget from "./air-quality-widget"
import NearbyLocations from "./nearby-locations"

export default function LiveMetricsDashboard() {
  const { metrics, loading, error, lastUpdated, refresh } = useRealTimeMetrics()

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error || !metrics) {
    return (
      <Card className="mb-8">
        <CardContent className="p-6 text-center">
          <p className="text-slate-500 dark:text-slate-400 mb-4">Failed to load real-time metrics</p>
          <Button onClick={refresh} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  const metricCards = [
    {
      title: "Carbon Footprint",
      value: metrics.carbonFootprint.current.toLocaleString(),
      unit: "tCO₂e",
      change: `${Math.abs(metrics.carbonFootprint.change)}%`,
      trend: metrics.carbonFootprint.trend,
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Energy Intensity",
      value: metrics.energyIntensity.current.toLocaleString(),
      unit: "kWh/m²",
      change: `${Math.abs(metrics.energyIntensity.change)}%`,
      trend: metrics.energyIntensity.trend,
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      title: "Energy Consumption",
      value: (metrics.energyConsumption.current / 1000000).toFixed(1) + "M",
      unit: "kWh",
      change: `${Math.abs(metrics.energyConsumption.change)}%`,
      trend: metrics.energyConsumption.trend,
      icon: Activity,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Real-time Status */}
      <div className="flex items-center justify-between">
        <RealTimeStatus lastUpdated={lastUpdated} />
        <Button onClick={refresh} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {metric.title}
                  </CardTitle>
                  <div className={`w-8 h-8 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${metric.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{metric.value}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{metric.unit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={metric.trend === "up" ? "destructive" : "secondary"}
                      className="text-xs flex items-center gap-1"
                    >
                      {metric.trend === "up" ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {metric.change}
                    </Badge>
                    <span className="text-xs text-slate-500 dark:text-slate-400">vs last period</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Additional Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AirQualityWidget />
        <NearbyLocations />
      </div>
    </div>
  )
}
