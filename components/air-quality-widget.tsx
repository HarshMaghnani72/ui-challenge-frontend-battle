"use client"

import { motion } from "framer-motion"
import { Wind, AlertTriangle, CheckCircle, XCircle, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAirQuality } from "@/hooks/use-real-time-data"
import { useLocation } from "@/hooks/use-location"

const getAQIStatus = (aqi: number) => {
  if (aqi <= 1) return { label: "Good", color: "bg-green-500", icon: CheckCircle, textColor: "text-green-700" }
  if (aqi <= 2) return { label: "Fair", color: "bg-yellow-500", icon: AlertTriangle, textColor: "text-yellow-700" }
  if (aqi <= 3) return { label: "Moderate", color: "bg-orange-500", icon: AlertTriangle, textColor: "text-orange-700" }
  if (aqi <= 4) return { label: "Poor", color: "bg-red-500", icon: XCircle, textColor: "text-red-700" }
  return { label: "Very Poor", color: "bg-purple-500", icon: XCircle, textColor: "text-purple-700" }
}

export default function AirQualityWidget() {
  const { location } = useLocation()
  const { airQuality, loading, error } = useAirQuality(location?.latitude, location?.longitude)

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="w-5 h-5" />
            Air Quality
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !airQuality) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="w-5 h-5" />
            Air Quality
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500 dark:text-slate-400">Unable to load air quality data</p>
          {location && (
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {location.city}, {location.country}
            </p>
          )}
        </CardContent>
      </Card>
    )
  }

  const status = getAQIStatus(airQuality.aqi)
  const StatusIcon = status.icon

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-blue-500" />
            Air Quality
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {airQuality.location}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* AQI Status */}
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${status.color} rounded-full flex items-center justify-center`}>
              <StatusIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{airQuality.aqi}</div>
              <Badge className={`${status.textColor} bg-transparent border-current`}>{status.label}</Badge>
            </div>
          </div>

          {/* Pollutant Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">PM2.5</span>
                <span className="font-medium">{airQuality.pm2_5.toFixed(1)} μg/m³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">PM10</span>
                <span className="font-medium">{airQuality.pm10.toFixed(1)} μg/m³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">NO₂</span>
                <span className="font-medium">{airQuality.no2.toFixed(1)} μg/m³</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">O₃</span>
                <span className="font-medium">{airQuality.o3.toFixed(1)} μg/m³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">CO</span>
                <span className="font-medium">{(airQuality.co / 1000).toFixed(2)} mg/m³</span>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
            Updated: {new Date(airQuality.timestamp).toLocaleTimeString()}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
