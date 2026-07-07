"use client"

import React from "react"
import { Check, PlayCircle } from "lucide-react"

export interface CourseCardProps {
  badgeText?: string
  title: string
  classLevel: string
  duration: string
  language: string
  startingDate: string
  targetAudience: string
  features: string[]
}

export function CourseCard({
  badgeText = "STUDY MATERIAL + TEST SERIES + RECORDED",
  title = "NEET Self-Study PRO course (CBT + Online Test Series): Target 2027",
  classLevel = "12 Plus",
  duration = "1 year",
  language = "Hinglish",
  startingDate = "28 June, 2026",
  targetAudience = "Class XI to XII Moving Students (Duration : 1 Year)",
  features = [
    "Learn in a classroom with India's top faculties.",
    "Printed study material, DPPs, and test series.",
    "Peer-to-peer interaction and healthy competition.",
  ],
}: Partial<CourseCardProps>) {
  return (
    <div className="group relative flex h-full flex-col rounded-[24px] border border-slate-200 bg-white pt-[14px] shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
      {/* Floating Badge */}
      <div className="absolute -top-3 left-4 z-10 flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-white shadow-sm transition-transform duration-300 group-hover:scale-105 md:left-6 md:px-4 md:py-1.5 md:text-xs">
        <PlayCircle className="h-3.5 w-3.5" />
        {badgeText}
      </div>

      {/* Header Area */}
      <div className="flex flex-col gap-4 rounded-t-[24px] bg-[#f8fafc] px-4 pb-5 pt-6 transition-colors duration-300 group-hover:bg-slate-50 md:gap-5 md:px-6 md:pb-6 md:pt-8">
        <h3 className="text-lg font-bold leading-snug tracking-tight text-slate-900 md:text-2xl">
          {title}
        </h3>

        <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-xs md:gap-x-4 md:gap-y-4 md:text-base">
          <div className="flex items-center gap-1 text-slate-500">
            <span>Class:</span>
            <span className="font-bold text-slate-900">{classLevel}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Duration:</span>
            <span className="font-bold text-slate-900">{duration}</span>
          </div>
          <div className="flex flex-col gap-1 text-slate-500">
            <span>Language:</span>
            <span className="font-bold text-slate-900">{language}</span>
          </div>
          <div className="flex flex-col gap-1 text-slate-500">
            <span>Starting from:</span>
            <span className="font-bold text-slate-900">{startingDate}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col px-4 py-5 pb-24 md:px-6 md:py-8 md:pb-28">
        {/* Target Audience with Orange Line */}
        <div className="relative pl-3.5 text-sm leading-relaxed text-slate-700 md:text-base">
          <div className="absolute left-0 top-1 h-4 w-[3px] rounded-full bg-[#f59e0b] transition-transform duration-300 group-hover:scale-y-125 md:top-1.5" />
          {targetAudience}
        </div>

        {/* Feature List */}
        <ul className="mt-4 flex flex-col gap-3 md:mt-6 md:gap-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 md:gap-3 md:text-base">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-600 stroke-[2.5] md:h-4 md:w-4" />
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Fixed Footer */}
      <div className="absolute bottom-0 left-0 w-full rounded-b-[24px] border-t border-slate-100 bg-white p-4 md:p-5">
        <button className="w-full rounded-full bg-[#0064e1] py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#0052cc] hover:shadow-md active:scale-[0.98] md:py-3 md:text-base">
          Enrol now
        </button>
      </div>
    </div>
  )
}
