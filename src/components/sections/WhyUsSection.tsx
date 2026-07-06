"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// --- Type Definitions for props ---
export interface Stat {
  value: string;
  label: string;
}

export interface FeatureCardType {
  title: string;
  description: string;
  image: string;
  icon?: React.ReactNode;
}

export interface WhyUsSectionProps {
  tagLabel: string;
  title: string;
  description: string;
  stats: Stat[];
  featureCards: FeatureCardType[];
  primaryActionLabel: string;
  secondaryActionLabel: string;
  className?: string;
}

const DEFAULT_STATS: Stat[] = [
  { value: "50k+", label: "Happy Students" },
  { value: "15+", label: "Years Experience" },
  { value: "99%", label: "Success Rate" },
];

const DEFAULT_FEATURE_CARDS: FeatureCardType[] = [
  {
    title: "Comprehensive Study Material",
    description: "Well-structured study resources, practice MCQs and extensive library support for complete preparation.",
    image: "/Photos/whyUs/book-pile-of-must-read-books-scaled1.jpeg",
  },
  {
    title: "Expert Faculty",
    description: "Learn from experienced educators who simplify complex concepts and provide individual attention for academic excellence.",
    image: "/Photos/whyUs/happy-black-teacher-teaching-elementary-students-math-classroom.jpg",
  },
  {
    title: "Regular Tests & Performance Analysis",
    description: "Frequent exams, detailed performance reports and personalized feedback to continuously improve results.",
    image: "/Photos/whyUs/closeup-person-filling-out-questionary-form.jpg",
  },
  {
    title: "Outstanding Results",
    description: "Consistent top ranks, excellent success rate and proven mentoring that helps students achieve their goals.",
    image: "/Photos/whyUs/business-team-discussing-their-ideas-while-working-office.jpg",
  },
];

// --- Internal Sub-Components ---

// StatCard using native Tailwind instead of missing Shadcn Card, memoized to prevent re-renders
const StatCard = React.memo(({ value, label }: Stat) => (
  <div className="bg-muted/50 border border-border text-center rounded-xl shadow-sm">
    <div className="p-4 flex flex-col items-center justify-center">
      <p className="text-3xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  </div>
));
StatCard.displayName = "StatCard";

// A sticky feature card for the stacking effect, memoized.
const StickyFeatureCard = React.memo(({ feature, index }: { feature: FeatureCardType; index: number }) => {
  return (
    <div
      className="sticky w-full will-change-transform [transform:translateZ(0)]"
      style={{ top: `${130 + index * 24}px` }} // Staggered top position for stacking
    >
      <div className={cn(
        "group relative flex flex-col h-auto w-full overflow-hidden rounded-[28px] border border-white/10",
        "min-h-[350px] md:min-h-[400px] justify-end items-center text-center p-8 pb-12 transform-gpu"
      )}>
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 z-0 will-change-transform"
          loading="lazy"
          priority={false}
          decoding="async"
          quality={65} // Reduced from default 75 to save memory footprint on large covers
        />
        
        {/* Dark Gradient Overlay - Optimized to avoid animating colors (paint thrashing) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/55 to-black/20" />
        {/* Hover Gradient - GPU accelerated opacity transition */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/45 to-black/10 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 will-change-[opacity]" />

        {/* Card Content */}
        <div className="relative z-20 flex flex-col items-center">
          {feature.icon && (
            <div className="mb-4">
              {feature.icon}
            </div>
          )}
          <h3 className="mb-4 text-[#FFE600] text-3xl md:text-5xl font-black tracking-tight leading-none [text-shadow:0_4px_8px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out group-hover:-translate-y-[2px] will-change-transform">
            {feature.title}
          </h3>
          <p className="text-white text-base md:text-lg font-medium leading-relaxed max-w-[90%] [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
});
StickyFeatureCard.displayName = "StickyFeatureCard";

// --- Main Exported Component ---

export const WhyUsSection = ({
  tagLabel = "Why Choose Us",
  title = "Unmatched Excellence in Education",
  description = "Discover why thousands of students trust us to shape their academic futures. We provide the perfect environment for achieving top ranks.",
  stats = DEFAULT_STATS,
  featureCards = DEFAULT_FEATURE_CARDS,
  primaryActionLabel = "Enrol Now",
  secondaryActionLabel = "Learn More",
  className,
}: Partial<WhyUsSectionProps>) => {
  // Calculate a height for the scroll container to ensure all cards can stack
  const scrollContainerHeight = `calc(100vh + ${featureCards.length * 100}px)`;

  return (
    <section className={cn("w-full bg-background text-foreground py-20 md:py-28", className)}>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start px-4 md:px-6">
        
        {/* Left Column: Sticky Content */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-32">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-muted/50 px-3 py-1 text-sm">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-muted-foreground">{tagLabel}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
          <div className="flex items-center gap-4 mt-6">
            <Button variant="outline" size="lg" className="rounded-full">{secondaryActionLabel}</Button>
            <Button size="lg" className="rounded-full bg-[#0064e1] hover:bg-[#0052cc] text-white">{primaryActionLabel}</Button>
          </div>
        </div>

        {/* Right Column: Container for the sticky card stack */}
        <div className="relative flex flex-col gap-4" style={{ height: scrollContainerHeight }}>
          {featureCards.map((feature, index) => (
            <StickyFeatureCard
              key={feature.title}
              index={index}
              feature={feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
