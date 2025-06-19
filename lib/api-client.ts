"use client"

// API Configuration
const API_CONFIG = {
  WORLD_BANK_BASE: "https://api.worldbank.org/v2",
  OPENWEATHER_BASE: "https://api.openweathermap.org/data/2.5",
  CARBON_INTERFACE_BASE: "https://www.carboninterface.com/api/v1",
  IEA_BASE: "https://api.iea.org/stats",
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

  async getCarbonFootprintData(): Promise<CarbonFootprintData[]> {
    return this.fetchWithCache("carbon-footprint", async () => {
      // Return mock data for demo
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
      return this.getMockAirQualityData()
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
      location: "New York, NY",
      timestamp: new Date().toISOString(),
    }
  }
}

export const apiClient = SustainabilityAPIClient.getInstance()
