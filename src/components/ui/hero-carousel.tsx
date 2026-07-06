"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Keyboard } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

import { heroSlides } from "@/data/heroSlides"
import { HeroSlide } from "@/components/ui/hero-slide"

export function HeroCarousel() {
  return (
    <section className="w-full pt-6 md:pt-8 lg:pt-10">
      {/* 
        Container constraints:
        - Max width 1400px
        - Centered horizontally (mx-auto)
        - Rounded corners 28-32px
        - Overflow hidden (via the wrapper)
        - Custom pagination styles using Tailwind arbitrary variants 
      */}
      <div
        className="group relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8"
      >
        <div 
          className="relative overflow-hidden rounded-[28px] md:rounded-[32px] bg-background shadow-sm ring-1 ring-border"
        >
          <Swiper
            modules={[Autoplay, Pagination, Keyboard]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            speed={700}
            keyboard={{ enabled: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: '.custom-hero-pagination',
            }}
            className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] w-full"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                {({ isActive }) => <HeroSlide slide={slide} isActive={isActive} />}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        {/* Extracted Custom Pagination Below the Banner */}
        <div className="custom-hero-pagination mt-6 flex justify-center w-full
            [&_.swiper-pagination-bullet]:!mx-1.5 
            [&_.swiper-pagination-bullet]:!h-2.5 
            [&_.swiper-pagination-bullet]:!w-2.5 
            [&_.swiper-pagination-bullet]:!rounded-full 
            [&_.swiper-pagination-bullet]:!bg-foreground/20 
            [&_.swiper-pagination-bullet]:!opacity-100 
            [&_.swiper-pagination-bullet]:!transition-all 
            [&_.swiper-pagination-bullet]:!duration-300 
            hover:[&_.swiper-pagination-bullet]:!bg-foreground/40
            [&_.swiper-pagination-bullet-active]:!w-8 
            [&_.swiper-pagination-bullet-active]:!bg-primary
            hover:[&_.swiper-pagination-bullet-active]:!bg-primary" 
        />
      </div>
    </section>
  )
}
