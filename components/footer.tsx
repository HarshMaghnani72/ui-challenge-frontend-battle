"use client"

import { Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">EcoMetrics</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Real-time sustainability monitoring and environmental insights for a greener future.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium">Developed by Harsh Maghnani</p>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open("https://github.com/HarshMaghnani72", "_blank")}
                  className="p-2 h-auto"
                >
                  <Github className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open("mailto:harshmaghnani220@gmail.com", "_blank")}
                  className="p-2 h-auto"
                >
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">📍 Ulhasnagar, Maharashtra, India</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <p className="text-sm text-muted-foreground">Learn more about our mission and team.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-sm text-muted-foreground">Get in touch with us for inquiries and support.</p>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} EcoMetrics. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
