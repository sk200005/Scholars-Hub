import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { colors } from "@/lib/constants/colors"
import { spring } from "@/lib/constants/motion"

import { cn } from "@/lib/utils"

export function BrandLogo({ onClick, isDark }: { onClick?: () => void; isDark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" onClick={onClick}>
      <motion.div
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={spring.snappy}
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: colors.primary.DEFAULT }}
      >
        <Sparkles size={20} strokeWidth={1.5} color={colors.foreground.inverse} />
      </motion.div>
      <span 
        className={cn("text-xl font-bold", isDark ? "text-white" : "")} 
        style={!isDark ? { color: colors.foreground.DEFAULT } : undefined}
      >
        Studio
      </span>
    </Link>
  )
}
