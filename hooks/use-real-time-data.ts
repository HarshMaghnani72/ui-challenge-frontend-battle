"use client"

import { useState, useEffect, useCallback } from "react"
import { apiClient, type RealTimeMetrics, type AirQualityData } from "@/lib/api-client"

export function useRealTimeMetrics(refreshInterval = 30000) {
  const [metrics, setMetrics] = useState<RealTimeMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchMetrics = useCallback(async () => {
    try {
      setError(null)
      const data = await apiClient.getRealTimeMetrics()
      setMetrics(data)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch metrics")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMetrics()

    const interval = setInterval(fetchMetrics, refreshInterval)

    return () => clearInterval(interval)
  }, [fetchMetrics, refreshInterval])

  return { metrics, loading, error, lastUpdated, refetch: fetchMetrics }
}

export function useAirQuality(lat?: number, lon?: number, refreshInterval = 60000) {
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAirQuality = useCallback(async () => {
    try {
      setError(null)
      const data = await apiClient.getAirQualityData(lat, lon)
      setAirQuality(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch air quality data")
    } finally {
      setLoading(false)
    }
  }, [lat, lon])

  useEffect(() => {
    fetchAirQuality()

    const interval = setInterval(fetchAirQuality, refreshInterval)

    return () => clearInterval(interval)
  }, [fetchAirQuality, refreshInterval])

  return { airQuality, loading, error, refetch: fetchAirQuality }
}

export function useHistoricalData() {
  const [carbonData, setCarbonData] = useState<any[]>([])
  const [energyData, setEnergyData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        setError(null)
        const [carbon, energy] = await Promise.all([apiClient.getCarbonFootprintData(), apiClient.getEnergyData()])

        setCarbonData(carbon)
        setEnergyData(energy)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch historical data")
      } finally {
        setLoading(false)
      }
    }

    fetchHistoricalData()
  }, [])

  return { carbonData, energyData, loading, error }
}
