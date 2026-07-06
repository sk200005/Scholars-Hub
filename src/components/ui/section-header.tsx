import { motion } from "framer-motion"
import { colors } from "@/lib/constants/colors"
import { variants, transitions, viewport } from "@/lib/constants/motion"
import { ReactNode } from "react"

interface SectionHeaderProps {
  badge: string
  title: string
  description: ReactNode
  badgeStyle?: React.CSSProperties
}

export function SectionHeader({ badge, title, description, badgeStyle }: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
      <motion.span
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={transitions.smooth}
        viewport={viewport.once}
        className="inline-block rounded-full px-3 py-1 text-sm font-medium"
        style={{
          backgroundColor: colors.background.muted,
          color: colors.foreground.DEFAULT,
          ...badgeStyle,
        }}
      >
        {badge}
      </motion.span>
      <motion.h2
        variants={variants.fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport.once}
        className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        style={{ color: colors.foreground.DEFAULT }}
      >
        {title}
      </motion.h2>
      <motion.p
        variants={variants.fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport.once}
        className="mx-auto max-w-[900px] text-base md:text-xl"
        style={{ color: colors.foreground.muted }}
      >
        {description}
      </motion.p>
    </div>
  )
}
