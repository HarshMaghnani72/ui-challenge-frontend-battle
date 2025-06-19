"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Mail, MapPin, ExternalLink } from "lucide-react"

export function DeveloperInfo() {
  const handleGitHub = () => {
    window.open("https://github.com/HarshMaghnani72", "_blank")
  }

  const handleEmail = () => {
    window.open("mailto:harshmaghnani220@gmail.com.com", "_blank")
  }

  const handleLocation = () => {
    window.open("https://maps.google.com/?q=Ulhasnagar,Maharashtra,India", "_blank")
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800">
      <CardContent className="p-6 text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
            HM
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Harsh Maghnani</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Full Stack Developer</p>
          <Badge variant="secondary" className="mb-4">
            <MapPin className="w-3 h-3 mr-1" />
            Ulhasnagar, India
          </Badge>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleGitHub}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub Profile
            <ExternalLink className="w-3 h-3" />
          </Button>

          <Button
            onClick={handleEmail}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email Me
            <ExternalLink className="w-3 h-3" />
          </Button>

          <Button
            onClick={handleLocation}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 hover:bg-green-600 hover:text-white transition-colors"
          >
            <MapPin className="w-4 h-4" />
            View Location
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Passionate about sustainable technology and environmental solutions
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
