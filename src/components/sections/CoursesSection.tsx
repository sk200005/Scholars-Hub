"use client"

import React from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { CourseCard } from "@/components/ui/course-card"
import { Tiles } from "@/components/ui/tiles"
import { Button } from "@/components/ui/button"

export function CoursesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  // We are asked to render 3 identical components based on the reference
  const courses = [
    {
      id: 1,
      title: "JEE course : Target 2028",
      classLevel: "11 Plus",
      duration: "1 year",
      targetAudience: "Class XI to XII Moving Students (Duration : 1 Year)",
    },
    {
      id: 2,
      title: "NEET course : Target 2028",
      classLevel: "11 Plus",
      duration: "2 years",
      targetAudience: "Class X to XI Moving Students (Duration : 2 Years)",
    },
    {
      id: 3,
      title: "MHTCET course : Target 2027",
      classLevel: "12 Plus",
      duration: "1 year",
      targetAudience: "Class XI to XII Moving Students (Duration : 1 Year)",
    },
  ]

  return (
    <section className="relative w-full bg-white py-16 md:py-24 overflow-hidden">
      {/* Interactive Tiles Background */}
      <div className="absolute inset-0 z-0">
        <Tiles rows={40} cols={60} tileSize="lg" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        {/* Header */}
        <SectionHeader
          badge="Featured Courses"
          title="Explore Our Programs"
          description="Comprehensive study material, test series, and recorded lectures designed for top ranks."
        />

        {/* Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto mt-8 pt-4 flex w-full snap-x snap-mandatory overflow-x-auto gap-4 pb-8 md:mt-16 md:grid md:max-w-7xl md:grid-cols-2 md:gap-8 lg:grid-cols-3 md:overflow-visible md:pb-0 md:pt-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {courses.map((course) => (
            <motion.div key={course.id} variants={cardVariants} className="h-full w-[280px] shrink-0 snap-center sm:w-[320px] md:w-auto md:shrink">
              <CourseCard
                title={course.title}
                classLevel={course.classLevel}
                duration={course.duration}
                targetAudience={course.targetAudience}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Courses Button */}
        <div className="mt-4 flex justify-center md:mt-12">
          <Button 
            variant="outline" 
            className="w-full max-w-sm rounded-full border-2 border-[#0066FF] py-6 text-[15px] font-bold text-[#1A1A1A] hover:bg-[#0066FF]/5 md:w-auto md:px-12"
          >
            View all courses
          </Button>
        </div>
      </div>
    </section>
  )
}
