"use client"

import { motion } from "framer-motion"
import { TrendingDown, Zap, BarChart3, Target, Award, Lightbulb, Activity } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useHistoricalData } from "@/hooks/use-real-time-data"

export default function Insights() {
  const { carbonData, energyData, loading: dataLoading } = useHistoricalData()

  const insights = [
    {
      icon: <TrendingDown className="w-6 h-6 text-green-600" />,
      title: "Energy Efficiency Improved",
      description: "22% reduction in energy intensity demonstrates successful optimization initiatives",
      color: "from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "Consumption Reduced",
      description: "27% decrease in total energy consumption across managed portfolio",
      color: "from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-orange-600" />,
      title: "Carbon Monitoring",
      description: "Comprehensive tracking enables targeted reduction strategies",
      color: "from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30",
      borderColor: "border-orange-200 dark:border-orange-800",
    },
    {
      icon: <Target className="w-6 h-6 text-purple-600" />,
      title: "Goal Achievement",
      description: "85% of sustainability targets met ahead of schedule",
      color: "from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    {
      icon: <Award className="w-6 h-6 text-yellow-600" />,
      title: "Industry Recognition",
      description: "Top 10% performer in environmental sustainability metrics",
      color: "from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30",
      borderColor: "border-yellow-200 dark:border-yellow-800",
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-indigo-600" />,
      title: "Smart Recommendations",
      description: "AI-powered insights suggest 15% additional savings potential",
      color: "from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30",
      borderColor: "border-indigo-200 dark:border-indigo-800",
    },
  ]

  return (
    <section id="insights" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Key Environmental Insights
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Data-driven insights that power your sustainability strategy and decision-making
          </p>
        </motion.div>

        {/* API-Driven Insights */}
        {!dataLoading && carbonData.length > 0 && (
          <motion.div
            className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Live Data Insights
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                <div className="font-semibold text-slate-900 dark:text-white">Latest Carbon Data</div>
                <div className="text-slate-600 dark:text-slate-400">
                  {carbonData[0]?.value.toLocaleString()} tCO₂e from {carbonData[0]?.source}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                <div className="font-semibold text-slate-900 dark:text-white">Energy Trend</div>
                <div className="text-slate-600 dark:text-slate-400">
                  {energyData[0]?.renewable_percentage}% renewable energy mix
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                <div className="font-semibold text-slate-900 dark:text-white">Data Freshness</div>
                <div className="text-green-600 dark:text-green-400 font-medium">Updated in real-time</div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card
                className={`p-6 h-full hover:shadow-xl transition-all duration-300 border-2 ${insight.borderColor} bg-gradient-to-br ${insight.color} group cursor-pointer`}
              >
                <motion.div
                  className="flex flex-col items-center text-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {insight.icon}
                  </motion.div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2 text-lg">{insight.title}</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{insight.description}</p>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { value: "2.5M", label: "Tons CO₂ Saved", color: "text-green-600" },
            { value: "45%", label: "Energy Reduction", color: "text-blue-600" },
            { value: "$1.2M", label: "Cost Savings", color: "text-purple-600" },
            { value: "98%", label: "Accuracy Rate", color: "text-orange-600" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
