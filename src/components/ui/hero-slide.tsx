"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { colors } from "@/lib/constants/colors"
import { heroSlides } from "@/data/heroSlides"

type SlideData = typeof heroSlides[0]

interface HeroSlideProps {
  slide: SlideData
  isActive: boolean
}

export function HeroSlide({ slide, isActive }: HeroSlideProps) {
  // Motion variants triggered by isActive
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay: 0.2,
      },
    },
  }

  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${slide.gradient} bg-surface`}>
      {/* Full Cover Image */}
      <motion.div
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={imageVariants}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <Image
          src={slide.image}
          alt={slide.title || "Hero banner"}
          fill
          className="object-cover"
          priority={isActive}
          sizes="100vw"
        />
        {/* Optional dark overlay if text exists */}
        {(slide.title || slide.description) && (
          <div className="absolute inset-0 bg-black/40" />
        )}
      </motion.div>

      {/* Optional Overlay Content (only renders if title/description are provided) */}
      {(slide.title || slide.description) && (
        <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-6 py-12 lg:px-12">
          <motion.div
            className="flex max-w-2xl flex-col items-start justify-center space-y-6"
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.1 },
              },
            }}
          >
            {slide.subtitle && (
              <motion.span
                variants={contentVariants}
                className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide"
                style={{ backgroundColor: colors.background.muted, color: colors.primary.DEFAULT }}
              >
                {slide.subtitle}
              </motion.span>
            )}

            {slide.title && (
              <motion.h1
                variants={contentVariants}
                className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                {slide.title}
              </motion.h1>
            )}

            {slide.description && (
              <motion.p variants={contentVariants} className="max-w-lg text-base leading-relaxed text-white/90 sm:text-lg">
                {slide.description}
              </motion.p>
            )}

            {slide.buttonText && slide.buttonLink && (
              <motion.div variants={contentVariants} className="pt-2">
                <Link href={slide.buttonLink} tabIndex={-1}>
                  <Button size="lg" className="group h-14 rounded-xl px-8 text-base">
                    {slide.buttonText}
                    <ArrowRight size={18} strokeWidth={2} className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
