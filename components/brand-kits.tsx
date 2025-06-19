"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Check, Settings, Cloud } from "lucide-react"
import { useState } from "react"

interface BrandKit {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  selected: boolean
}

export default function BrandKits() {
  const [brandKits, setBrandKits] = useState<BrandKit[]>([
    {
      id: "ecorp",
      name: "ECorp",
      icon: <Cloud className="w-6 h-6 text-green-500" />,
      color: "from-green-500 to-emerald-600",
      selected: false,
    },
    {
      id: "icorp",
      name: "ICorp",
      icon: <Cloud className="w-6 h-6 text-orange-500" />,
      color: "from-orange-500 to-red-600",
      selected: false,
    },
    {
      id: "agency",
      name: "The Agency",
      icon: <Cloud className="w-6 h-6 text-red-500" />,
      color: "from-purple-500 to-pink-600",
      selected: true,
    },
  ])

  const toggleSelection = (id: string) => {
    setBrandKits((prev) =>
      prev.map((kit) => ({
        ...kit,
        selected: kit.id === id ? !kit.selected : false,
      })),
    )
  }

  return (
    <section id="brand-kits" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Brand Kits</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Manage your sustainability brand assets and corporate identity
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <motion.div
            className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 p-[2px]">
              <div className="w-full h-full rounded-2xl bg-slate-900" />
            </div>

            <div className="relative z-10">
              <h3 className="text-white text-xl font-semibold mb-6">Brand Kits</h3>

              <div className="space-y-4">
                {brandKits.map((kit, index) => (
                  <motion.div
                    key={kit.id}
                    className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      kit.selected
                        ? "border-purple-500 bg-slate-800/50"
                        : "border-slate-600 bg-slate-800/30 hover:bg-slate-800/50"
                    }`}
                    onClick={() => toggleSelection(kit.id)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Selection gradient border */}
                    {kit.selected && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-[1px]">
                        <div className="w-full h-full rounded-xl bg-slate-800" />
                      </div>
                    )}

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Checkbox */}
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                            kit.selected ? "bg-purple-500 border-purple-500" : "border-slate-500 hover:border-slate-400"
                          }`}
                        >
                          {kit.selected && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </div>

                        {/* Icon and Name */}
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-r ${kit.color} flex items-center justify-center`}
                          >
                            {kit.icon}
                          </div>
                          <span className="text-white font-medium">{kit.name}</span>
                        </div>
                      </div>

                      {/* Settings Icon */}
                      <motion.button
                        className="text-slate-400 hover:text-white transition-colors p-1"
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Settings className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
