"use client"

import { useState, useEffect } from "react"

export interface LocationData {
  latitude: number
  longitude: number
  city: string
  country: string
  region: string
  error?: string
}

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getLocation = async () => {
      try {
        // Try to get user's current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords

              try {
                // Use reverse geocoding to get location details
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
                )

                if (response.ok) {
                  const data = await response.json()
                  setLocation({
                    latitude,
                    longitude,
                    city: data.city || data.locality || "Unknown City",
                    country: data.countryName || "Unknown Country",
                    region: data.principalSubdivision || "Unknown Region",
                  })
                } else {
                  throw new Error("Failed to get location details")
                }
              } catch (geocodeError) {
                // Fallback to default location if geocoding fails
                setLocation({
                  latitude,
                  longitude,
                  city: "Current Location",
                  country: "Unknown",
                  region: "Unknown",
                })
              }
              setLoading(false)
            },
            (geoError) => {
              // Fallback to a default location (Ulhasnagar, India)
              setLocation({
                latitude: 19.2183,
                longitude: 73.1581,
                city: "Ulhasnagar",
                country: "India",
                region: "Maharashtra",
              })
              setError("Location access denied. Using default location.")
              setLoading(false)
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 300000, // 5 minutes
            },
          )
        } else {
          throw new Error("Geolocation not supported")
        }
      } catch (err) {
        setError("Failed to get location")
        // Fallback to default location
        setLocation({
          latitude: 19.2183,
          longitude: 73.1581,
          city: "Ulhasnagar",
          country: "India",
          region: "Maharashtra",
        })
        setLoading(false)
      }
    }

    getLocation()
  }, [])

  return { location, loading, error }
}
