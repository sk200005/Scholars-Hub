"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, animate, useMotionValue, useAnimationFrame } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { colors } from "@/lib/constants/colors"
import { wrap } from "framer-motion"

// ─── Data Types & Source ──────────────────────────────────────────────────
type FilterType = "ALL" | "NEET" | "JEE" | "CET"

interface ResultData {
  id: string
  name: string
  exam: string
  rank: string
  score?: string
  category: FilterType
  image: string
}

const mockResults: ResultData[] = [
  {
    id: "1",
    name: "John Doe",
    exam: "NEET-UG '25",
    rank: "AIR 74",
    category: "NEET",
    image: "/Photos/result/latest-result.png",
  },
  {
    id: "2",
    name: "John Doe",
    exam: "JEE Adv. '25",
    rank: "AIR 50",
    category: "JEE",
    image: "/Photos/result/latest-result.png",
  },
  {
    id: "3",
    name: "John Doe",
    exam: "ISER",
    rank: "AIR 600",
    category: "JEE",
    image: "/Photos/result/latest-result.png",
  },
  {
    id: "4",
    name: "John Doe",
    exam: "NDA, '23",
    score: "99.4%",
    rank: "AIR 400",
    category: "CET",
    image: "/Photos/result/latest-result.png",
  },
  {
    id: "5",
    name: "John Doe",
    exam: "NEET-UG '25",
    rank: "AIR 1341",
    category: "NEET",
    image: "/Photos/result/latest-result.png",
  },
  {
    id: "6",
    name: "John Doe",
    exam: "JEE Adv. '25",
    rank: "AIR 395",
    category: "JEE",
    image: "/Photos/result/latest-result.png",
  },
]

// ─── Subcomponents ────────────────────────────────────────────────────────

function Counter({ from = 0, to, duration = 2 }: { from?: number; to: number; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(nodeRef, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!inView) return
    const controls = animate(from, to, {
      duration: duration,
      ease: "easeOut",
      onUpdate(value) {
        if (nodeRef.current) {
          const rounded = Math.round(value)
          nodeRef.current.textContent = rounded === to ? `${rounded} +` : rounded.toString()
        }
      },
    })
    return () => controls.stop()
  }, [from, to, duration, inView])

  return <span ref={nodeRef} className="tabular-nums">{from}</span>
}

export function ResultsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL")
  const filters: FilterType[] = ["ALL", "NEET", "JEE", "CET"]

  const filteredResults = mockResults.filter(
    (item) => activeFilter === "ALL" || item.category === activeFilter
  )

  // Infinite marquee logic using framer-motion
  const baseX = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const [trackWidth, setTrackWidth] = useState(0)

  // Measure the width of one set of items
  useEffect(() => {
    if (trackRef.current) {
      // The track contains 2 duplicated sets. We want the width of exactly half the scrollWidth.
      setTrackWidth(trackRef.current.scrollWidth / 2)
    }
    
    // Recalculate on resize
    const handleResize = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth / 2)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [filteredResults]) // Re-measure if items change

  useAnimationFrame((t, delta) => {
    // Only auto-scroll if not dragging, and if we have a valid width
    if (isDragging || trackWidth === 0) return

    // Move left by 60 pixels per second
    const moveBy = -60 * (delta / 1000)
    let newX = baseX.get() + moveBy

    // Loop seamlessly
    newX = wrap(-trackWidth, 0, newX)
    baseX.set(newX)
  })

  // Ensure seamless dragging wrap
  const handleDrag = (event: any, info: any) => {
    if (trackWidth > 0) {
      const currentX = baseX.get()
      baseX.set(wrap(-trackWidth, 0, currentX))
    }
  }

  return (
    <section className="w-full overflow-hidden py-16 md:py-24">
      <div className="container px-4 md:px-6">
        
        {/* Header */}
        <SectionHeader
          badge="Achievements"
          title="Our Results"
          description="A legacy of excellence and outstanding achievements."
        />

        {/* Stats Row */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center space-y-2 border-border md:border-r md:pr-8">
            <h3 className="text-5xl font-bold tracking-tighter" style={{ color: colors.primary.DEFAULT }}>
              <Counter to={850} />
            </h3>
            <p className="text-sm font-medium tracking-wide" style={{ color: colors.foreground.muted }}>
              NEET
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 border-border md:border-r md:pr-8">
            <h3 className="text-5xl font-bold tracking-tighter" style={{ color: colors.primary.DEFAULT }}>
              <Counter to={185} />
            </h3>
            <p className="text-sm font-medium tracking-wide" style={{ color: colors.foreground.muted }}>
              JEE
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <h3 className="text-5xl font-bold tracking-tighter" style={{ color: colors.primary.DEFAULT }}>
              <Counter to={925} />
            </h3>
            <p className="text-sm font-medium tracking-wide" style={{ color: colors.foreground.muted }}>
              MHTCET
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter)
                baseX.set(0) // Reset position on filter change
              }}
              className="relative rounded-full px-6 py-2 text-sm font-medium transition-colors"
              style={{
                color: activeFilter === filter ? colors.foreground.inverse : colors.foreground.DEFAULT,
              }}
            >
              {activeFilter === filter && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 z-0 rounded-full"
                  style={{ backgroundColor: colors.primary.DEFAULT }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Infinite Marquee Container */}
      <div 
        className="relative mt-12 w-full max-w-[100vw] overflow-hidden"
        style={{
          // Fade masks on left and right edges
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
        }}
      >
        <motion.div
          ref={trackRef}
          style={{ x: baseX }}
          drag="x"
          dragConstraints={{ left: -10000, right: 10000 }} // Arbitrary large numbers to allow free drag
          dragElastic={0}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onDrag={handleDrag}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex w-max cursor-grab active:cursor-grabbing items-center gap-6 px-4 md:gap-8"
        >
          {/* We render the filtered items twice to create the seamless illusion */}
          {[...filteredResults, ...filteredResults].map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className="group relative flex w-[220px] shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:w-[320px]"
              style={{ border: `1px solid ${colors.border.DEFAULT}` }}
              whileHover={{ 
                borderColor: colors.primary.DEFAULT, 
                borderWidth: "1px" 
              }}
            >
              {/* Card Image */}
              <div className="relative h-[200px] md:h-[280px] w-full overflow-hidden bg-muted/50">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 220px, 320px"
                />
                
                {/* Category Badge overlay */}
                <div 
                  className="absolute bottom-0 left-0 w-full py-2 text-center text-xs font-bold uppercase tracking-wider"
                  style={{ backgroundColor: colors.foreground.DEFAULT, color: colors.foreground.inverse }}
                >
                  {item.exam}
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-col items-center justify-center space-y-2 p-6 text-center">
                <h4 className="text-xl font-bold" style={{ color: colors.foreground.DEFAULT }}>
                  {item.name}
                </h4>
                <p className="text-sm font-medium" style={{ color: colors.foreground.muted }}>
                  Classroom Course
                </p>
                <div 
                  className="mt-2 text-2xl font-black"
                  style={{ color: colors.primary.DEFAULT }}
                >
                  {item.rank}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
