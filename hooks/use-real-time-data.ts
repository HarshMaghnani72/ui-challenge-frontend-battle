"use client"

import { useState, useEffect, useCallback } from "react"
import { apiClient, type RealTimeMetrics, type AirQualityData } from "@/lib/api-client"

export function useRealTimeMetrics() {
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
      setError("Failed to fetch real-time metrics")
      console.error("Error fetching metrics:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const refresh = useCallback(() => {
    setLoading(true)
    fetchMetrics()
  }, [fetchMetrics])

  useEffect(() => {
    fetchMetrics()

    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchMetrics, 30000)

    return () => clearInterval(interval)
  }, [fetchMetrics])

  return { metrics, loading, error, lastUpdated, refresh }
}

export function useAirQuality(lat?: number, lng?: number) {
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAirQuality = useCallback(async () => {
    if (!lat || !lng) return

    try {
      setError(null)
      const data = await apiClient.getAirQualityData(lat, lng)
      setAirQuality(data)
    } catch (err) {
      setError("Failed to fetch air quality data")
      console.error("Error fetching air quality:", err)
    } finally {
      setLoading(false)
    }
  }, [lat, lng])

  useEffect(() => {
    if (lat && lng) {
      fetchAirQuality()

      // Set up auto-refresh every 5 minutes
      const interval = setInterval(fetchAirQuality, 300000)

      return () => clearInterval(interval)
    }
  }, [fetchAirQuality, lat, lng])

  return { airQuality, loading, error }
}

export function useHistoricalData() {
  const [carbonData, setCarbonData] = useState<any[]>([])
  const [energyData, setEnergyData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHistoricalData = useCallback(async () => {
    try {
      setError(null)
      const [carbon, energy] = await Promise.all([apiClient.getCarbonFootprintData(), apiClient.getEnergyData()])

      setCarbonData(carbon)
      setEnergyData(energy)
    } catch (err) {
      setError("Failed to fetch historical data")
      console.error("Error fetching historical data:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchHistoricalData()
  }, [fetchHistoricalData])

  const refresh = useCallback(() => {
    setLoading(true)
    fetchHistoricalData()
  }, [fetchHistoricalData])

  return { carbonData, energyData, loading, error, refresh }
}
