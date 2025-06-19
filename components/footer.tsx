"use client"

import { motion } from "framer-motion"
import { Leaf, Twitter, Linkedin, Github, Mail } from "lucide-react"

export default function Footer() {
  const footerLinks = {
    Product: [
      { name: "Dashboard", href: "#dashboard" },
      { name: "Analytics", href: "#metrics" },
      { name: "Reports", href: "#insights" },
      { name: "Integrations", href: "#" },
    ],
    Company: [
      { name: "About", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#contact" },
      { name: "Blog", href: "#" },
    ],
    Resources: [
      { name: "Documentation", href: "#" },
      { name: "Support", href: "#" },
      { name: "API", href: "#" },
      { name: "Community", href: "#" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "GDPR", href: "#" },
    ],
  }

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
    { icon: <Mail className="w-5 h-5" />, href: "#", label: "Email" },
  ]

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      } else {
        // If element doesn't exist, scroll to top as fallback
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    } else {
      // For external links, open in new tab
      window.open(href, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xl font-bold">EcoMetrics</h4>
            </motion.div>
            <motion.p
              className="text-slate-400 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Empowering sustainable decisions through data-driven insights. Transform your environmental impact with
              comprehensive real-time analytics.
            </motion.p>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h5 className="font-semibold mb-4 text-white">{category}</h5>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={(e) => {
                        try {
                          e.preventDefault()
                          scrollToSection(link.href)
                        } catch (error) {
                          console.warn("Navigation error:", error)
                        }
                      }}
                      className="text-slate-400 hover:text-white transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-slate-400 text-sm mb-4 md:mb-0">&copy; 2024 EcoMetrics. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <span>Made with 💚 for a sustainable future</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
