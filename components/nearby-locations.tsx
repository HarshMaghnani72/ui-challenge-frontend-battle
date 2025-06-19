"use client"

import { motion } from "framer-motion"
import { MapPin, Leaf, Zap, Wind } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLocation } from "@/hooks/use-location"
import { useEffect, useState } from "react"
import { apiClient, type NearbyLocation } from "@/lib/api-client"

const getAQIColor = (aqi: number) => {
  if (aqi <= 1) return "bg-green-500"
  if (aqi <= 2) return "bg-yellow-500"
  if (aqi <= 3) return "bg-orange-500"
  if (aqi <= 4) return "bg-red-500"
  return "bg-purple-500"
}

const getEfficiencyColor = (efficiency: number) => {
  if (efficiency >= 80) return "text-green-600"
  if (efficiency >= 60) return "text-yellow-600"
  return "text-red-600"
}

export default function NearbyLocations() {
  const { location, loading: locationLoading } = useLocation()
  const [nearbyLocations, setNearbyLocations] = useState<NearbyLocation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNearbyLocations = async () => {
      if (location) {
        try {
          const locations = await apiClient.getNearbyLocations(location.latitude, location.longitude)
          setNearbyLocations(locations)
        } catch (error) {
          console.error("Failed to fetch nearby locations:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchNearbyLocations()
  }, [location])

  if (locationLoading || loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Nearby Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            Nearby Locations
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {location ? `Near ${location.city}, ${location.country}` : "Loading location..."}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {nearbyLocations.map((loc, index) => (
            <motion.div
              key={index}
              className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-shadow duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{loc.name}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{loc.distance} km away</p>
                </div>
                <Badge className={`${getAQIColor(loc.airQuality)} text-white border-0`}>AQI {loc.airQuality}</Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <Leaf className="w-3 h-3 text-green-500" />
                  <span className="text-slate-600 dark:text-slate-400">Carbon:</span>
                  <span className="font-medium">{loc.carbonFootprint}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-500" />
                  <span className="text-slate-600 dark:text-slate-400">Energy:</span>
                  <span className={`font-medium ${getEfficiencyColor(loc.energyEfficiency)}`}>
                    {loc.energyEfficiency}%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="w-3 h-3 text-blue-500" />
                  <span className="text-slate-600 dark:text-slate-400">Air:</span>
                  <span className="font-medium">Good</span>
                </div>
              </div>
            </motion.div>
          ))}

          {nearbyLocations.length === 0 && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">No nearby locations found</div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
