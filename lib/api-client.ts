"use client"

// API Configuration
const API_CONFIG = {
  WORLD_BANK_BASE: "https://api.worldbank.org/v2",
  OPENWEATHER_BASE: "https://api.openweathermap.org/data/2.5",
  CARBON_INTERFACE_BASE: "https://www.carboninterface.com/api/v1",
  IEA_BASE: "https://api.iea.org/stats",
  GEOCODING_BASE: "https://api.bigdatacloud.net/data",
  POLLUTION_BASE: "https://api.waqi.info/feed",
  MOCK_API_BASE: "https://jsonplaceholder.typicode.com",
}

export interface CarbonFootprintData {
  year: string
  value: number
  region: string
  source: string
}

export interface EnergyData {
  year: string
  intensity: number
  consumption: number
  renewable_percentage: number
  region: string
}

export interface RealTimeMetrics {
  carbonFootprint: {
    current: number
    change: number
    trend: "up" | "down"
    lastUpdated: string
  }
  energyIntensity: {
    current: number
    change: number
    trend: "up" | "down"
    lastUpdated: string
  }
  energyConsumption: {
    current: number
    change: number
    trend: "up" | "down"
    lastUpdated: string
  }
}

export interface AirQualityData {
  aqi: number
  co: number
  no2: number
  o3: number
  pm2_5: number
  pm10: number
  location: string
  timestamp: string
}

export interface NearbyLocation {
  name: string
  distance: number
  airQuality: number
  carbonFootprint: number
  energyEfficiency: number
  coordinates: {
    lat: number
    lng: number
  }
}

export class SustainabilityAPIClient {
  private static instance: SustainabilityAPIClient
  private cache: Map<string, { data: any; timestamp: number }> = new Map()
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  static getInstance(): SustainabilityAPIClient {
    if (!SustainabilityAPIClient.instance) {
      SustainabilityAPIClient.instance = new SustainabilityAPIClient()
    }
    return SustainabilityAPIClient.instance
  }

  private async fetchWithCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    try {
      const data = await fetcher()
      this.cache.set(key, { data, timestamp: Date.now() })
      return data
    } catch (error) {
      console.error(`API Error for ${key}:`, error)
      if (cached) return cached.data
      return this.getMockData(key) as T
    }
  }

  // Get nearby locations with sustainability data
  async getNearbyLocations(lat: number, lng: number, radius = 50): Promise<NearbyLocation[]> {
    return this.fetchWithCache(`nearby-${lat}-${lng}-${radius}`, async () => {
      try {
        // In a real implementation, you would use APIs like:
        // - Google Places API for nearby locations
        // - Local environmental agencies for air quality
        // - Energy grid APIs for energy data

        // For demo, we'll generate realistic nearby locations
        const locations: NearbyLocation[] = []
        const baseNames = [
          "Downtown",
          "Midtown",
          "Uptown",
          "Riverside",
          "Hillside",
          "Central District",
          "Business District",
          "Residential Area",
          "Industrial Zone",
          "Green Valley",
          "Tech Hub",
          "Historic District",
        ]

        for (let i = 0; i < 8; i++) {
          const distance = Math.random() * radius
          const angle = Math.random() * 360 * (Math.PI / 180)

          // Calculate approximate coordinates
          const deltaLat = (distance / 111) * Math.cos(angle)
          const deltaLng = (distance / (111 * Math.cos((lat * Math.PI) / 180))) * Math.sin(angle)

          locations.push({
            name: baseNames[i] || `Area ${i + 1}`,
            distance: Math.round(distance * 10) / 10,
            airQuality: Math.floor(Math.random() * 5) + 1,
            carbonFootprint: Math.floor(Math.random() * 100) + 20,
            energyEfficiency: Math.floor(Math.random() * 40) + 60,
            coordinates: {
              lat: lat + deltaLat,
              lng: lng + deltaLng,
            },
          })
        }

        return locations.sort((a, b) => a.distance - b.distance)
      } catch (error) {
        console.error("Error fetching nearby locations:", error)
        return this.getMockNearbyLocations()
      }
    })
  }

  async getCarbonFootprintData(): Promise<CarbonFootprintData[]> {
    return this.fetchWithCache("carbon-footprint", async () => {
      return this.getMockCarbonData()
    })
  }

  async getEnergyData(): Promise<EnergyData[]> {
    return this.fetchWithCache("energy-data", async () => {
      return this.getMockEnergyData()
    })
  }

  async getAirQualityData(lat = 40.7128, lon = -74.006): Promise<AirQualityData> {
    return this.fetchWithCache(`air-quality-${lat}-${lon}`, async () => {
      try {
        // Try to get real air quality data from World Air Quality Index
        // Note: This requires an API key for production use
        const response = await fetch(`${API_CONFIG.POLLUTION_BASE}/geo:${lat};${lon}/?token=demo`)

        if (response.ok) {
          const data = await response.json()
          if (data.status === "ok") {
            return {
              aqi: data.data.aqi || Math.floor(Math.random() * 5) + 1,
              co: data.data.iaqi?.co?.v || Math.random() * 1000,
              no2: data.data.iaqi?.no2?.v || Math.random() * 100,
              o3: data.data.iaqi?.o3?.v || Math.random() * 200,
              pm2_5: data.data.iaqi?.pm25?.v || Math.random() * 50,
              pm10: data.data.iaqi?.pm10?.v || Math.random() * 100,
              location: data.data.city?.name || "Current Location",
              timestamp: new Date().toISOString(),
            }
          }
        }
        throw new Error("API response not ok")
      } catch (error) {
        return this.getMockAirQualityData()
      }
    })
  }

  async getRealTimeMetrics(): Promise<RealTimeMetrics> {
    return this.fetchWithCache("real-time-metrics", async () => {
      const now = new Date().toISOString()

      return {
        carbonFootprint: {
          current: 45048 + Math.floor(Math.random() * 1000 - 500),
          change: Math.floor(Math.random() * 20 - 10),
          trend: Math.random() > 0.5 ? "up" : "down",
          lastUpdated: now,
        },
        energyIntensity: {
          current: 123 + Math.floor(Math.random() * 10 - 5),
          change: Math.floor(Math.random() * 15 - 7),
          trend: Math.random() > 0.6 ? "down" : "up",
          lastUpdated: now,
        },
        energyConsumption: {
          current: 47790662 + Math.floor(Math.random() * 100000 - 50000),
          change: Math.floor(Math.random() * 30 - 15),
          trend: Math.random() > 0.4 ? "down" : "up",
          lastUpdated: now,
        },
      }
    })
  }

  // Export data functionality
  async exportData(type: "csv" | "pdf" | "json", dataType: string): Promise<void> {
    try {
      let data: any
      let filename: string

      switch (dataType) {
        case "carbon-footprint":
          data = await this.getCarbonFootprintData()
          filename = `carbon-footprint-${new Date().toISOString().split("T")[0]}`
          break
        case "energy-data":
          data = await this.getEnergyData()
          filename = `energy-data-${new Date().toISOString().split("T")[0]}`
          break
        case "air-quality":
          data = await this.getAirQualityData()
          filename = `air-quality-${new Date().toISOString().split("T")[0]}`
          break
        default:
          throw new Error("Unknown data type")
      }

      if (type === "csv") {
        this.downloadCSV(data, filename)
      } else if (type === "json") {
        this.downloadJSON(data, filename)
      } else if (type === "pdf") {
        // For PDF, we'll create a simple text-based PDF
        this.downloadPDF(data, filename)
      }
    } catch (error) {
      console.error("Export failed:", error)
      throw error
    }
  }

  private downloadCSV(data: any[], filename: string): void {
    if (!data.length) return

    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) =>
            typeof row[header] === "string" && row[header].includes(",") ? `"${row[header]}"` : row[header],
          )
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  private downloadJSON(data: any, filename: string): void {
    const jsonContent = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonContent], { type: "application/json" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}.json`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  private downloadPDF(data: any, filename: string): void {
    // Simple text-based PDF content
    const content = `Sustainability Report - ${filename}\n\nGenerated on: ${new Date().toLocaleString()}\n\nData:\n${JSON.stringify(data, null, 2)}`
    const blob = new Blob([content], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}.txt`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  private getMockData(key: string): any {
    switch (key) {
      case "carbon-footprint":
        return this.getMockCarbonData()
      case "energy-data":
        return this.getMockEnergyData()
      case "air-quality":
        return this.getMockAirQualityData()
      default:
        return null
    }
  }

  private getMockNearbyLocations(): NearbyLocation[] {
    return [
      {
        name: "Downtown",
        distance: 2.3,
        airQuality: 3,
        carbonFootprint: 85,
        energyEfficiency: 72,
        coordinates: { lat: 40.7589, lng: -73.9851 },
      },
      {
        name: "Midtown",
        distance: 4.1,
        airQuality: 2,
        carbonFootprint: 92,
        energyEfficiency: 68,
        coordinates: { lat: 40.7549, lng: -73.984 },
      },
      {
        name: "Central Park Area",
        distance: 5.8,
        airQuality: 1,
        carbonFootprint: 45,
        energyEfficiency: 89,
        coordinates: { lat: 40.7829, lng: -73.9654 },
      },
    ]
  }

  private getMockCarbonData(): CarbonFootprintData[] {
    return [
      { year: "2023", value: 45048, region: "Global", source: "Mock Data" },
      { year: "2022", value: 44200, region: "Global", source: "Mock Data" },
      { year: "2021", value: 43100, region: "Global", source: "Mock Data" },
      { year: "2020", value: 41800, region: "Global", source: "Mock Data" },
      { year: "2019", value: 42500, region: "Global", source: "Mock Data" },
    ]
  }

  private getMockEnergyData(): EnergyData[] {
    return [
      { year: "2023", intensity: 123, consumption: 47790662, renewable_percentage: 32, region: "Global" },
      { year: "2022", intensity: 128, consumption: 49324077, renewable_percentage: 30, region: "Global" },
      { year: "2021", intensity: 135, consumption: 48784205, renewable_percentage: 28, region: "Global" },
      { year: "2020", intensity: 142, consumption: 50198706, renewable_percentage: 25, region: "Global" },
      { year: "2019", intensity: 157, consumption: 52198706, renewable_percentage: 22, region: "Global" },
    ]
  }

  private getMockAirQualityData(): AirQualityData {
    return {
      aqi: Math.floor(Math.random() * 5) + 1,
      co: Math.random() * 1000,
      no2: Math.random() * 100,
      o3: Math.random() * 200,
      pm2_5: Math.random() * 50,
      pm10: Math.random() * 100,
      location: "Current Location",
      timestamp: new Date().toISOString(),
    }
  }
}

export const apiClient = SustainabilityAPIClient.getInstance()
