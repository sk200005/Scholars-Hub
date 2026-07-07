"use client"

import React from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export default function FloatingActions() {
  return (
    <>
      {/* WhatsApp Button (Left) */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.96 }}
        className="pointer-events-auto fixed bottom-8 left-6 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:shadow-xl md:h-[72px] md:w-[72px]"
        aria-label="WhatsApp"
      >
        <FaWhatsapp className="h-8 w-8 md:h-9 md:w-9" />
      </motion.button>

      {/* AI Chat Button (Right) */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.96 }}
        className="pointer-events-auto fixed bottom-8 right-6 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:shadow-xl md:h-[72px] md:w-[72px]"
        aria-label="AI Chat"
      >
        <Sparkles className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2.2} />
      </motion.button>
    </>
  )
}
