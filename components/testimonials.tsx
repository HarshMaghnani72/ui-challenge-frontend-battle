"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "The sustainability insights have transformed how we approach our environmental strategy. The data visualization makes complex metrics accessible to our entire team.",
      author: "Sarah Chen",
      role: "Sustainability Director",
      company: "GreenTech Solutions",
      rating: 5,
      avatar: "SC",
      color: "from-green-400 to-green-600",
    },
    {
      quote:
        "Having real-time access to our carbon footprint data has enabled us to make informed decisions and achieve our net-zero targets ahead of schedule.",
      author: "Michael Rodriguez",
      role: "Environmental Manager",
      company: "EcoBuilders Inc",
      rating: 5,
      avatar: "MR",
      color: "from-blue-400 to-blue-600",
    },
    {
      quote:
        "The comprehensive reporting and intuitive interface have streamlined our ESG compliance process significantly.",
      author: "Emma Thompson",
      role: "Chief Operations Officer",
      company: "Sustainable Ventures",
      rating: 5,
      avatar: "ET",
      color: "from-purple-400 to-purple-600",
    },
    {
      quote:
        "EcoMetrics has become an essential tool for our sustainability team. The insights are actionable and the platform is incredibly user-friendly.",
      author: "David Park",
      role: "Head of Sustainability",
      company: "CleanEnergy Corp",
      rating: 5,
      avatar: "DP",
      color: "from-orange-400 to-orange-600",
    },
    {
      quote:
        "The automated reporting features have saved us countless hours while improving the accuracy of our environmental data.",
      author: "Lisa Wang",
      role: "Environmental Analyst",
      company: "Future Green",
      rating: 5,
      avatar: "LW",
      color: "from-pink-400 to-pink-600",
    },
    {
      quote:
        "Outstanding platform that delivers on its promises. Our stakeholders love the clear, comprehensive sustainability reports.",
      author: "James Mitchell",
      role: "Sustainability Manager",
      company: "EcoTech Industries",
      rating: 5,
      avatar: "JM",
      color: "from-cyan-400 to-cyan-600",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">What Our Customers Say</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Join hundreds of organizations already using EcoMetrics to achieve their environmental goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 group">
                <motion.div className="flex flex-col h-full" whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start mb-4">
                    <Quote className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-slate-700 dark:text-slate-300 mb-6 italic flex-grow leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center text-white font-semibold shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">{testimonial.author}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-500">{testimonial.company}</div>
                    </div>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-slate-600 dark:text-slate-400 mb-8">Trusted by leading organizations worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {[
              "GreenTech Solutions",
              "EcoBuilders Inc",
              "Sustainable Ventures",
              "CleanEnergy Corp",
              "Future Green",
              "EcoTech Industries",
            ].map((company, index) => (
              <motion.div
                key={index}
                className="text-slate-500 dark:text-slate-400 font-semibold"
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
