"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import Loader from "@/components/loader"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Metrics from "@/components/metrics"
import Insights from "@/components/insights"
import BrandKits from "@/components/brand-kits"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <AnimatePresence mode="wait">{isLoading && <Loader onComplete={handleLoadingComplete} />}</AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <Metrics />
            <Insights />
            <BrandKits />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
