"use client"
import { Button } from "@/components/ui/button"
import { DeveloperInfo } from "./developer-info"

export function Hero() {
  const handleWatchDemo = () => {
    // Scroll to the live metrics dashboard
    const element = document.getElementById("live-metrics")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      // Fallback: scroll to metrics section
      const metricsElement = document.getElementById("metrics")
      if (metricsElement) {
        metricsElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const handleStartTrial = () => {
    // Open a demo form or redirect to signup
    window.open("https://forms.google.com/your-form-id", "_blank")
    // Alternative: You can create a modal or redirect to a signup page
  }

  return (
    <section className="py-24">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">Welcome to Our Awesome Platform</h1>
        <p className="text-lg text-gray-600 mb-12">
          Your solution for streamlined workflows and increased productivity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={handleWatchDemo}>
            Watch Demo
          </Button>
          <Button size="lg" variant="outline" onClick={handleStartTrial}>
            Start Free Trial
          </Button>
        </div>

        {/* Add Developer Info Section */}
        <div className="mt-12">
          <DeveloperInfo />
        </div>
      </div>
    </section>
  )
}
