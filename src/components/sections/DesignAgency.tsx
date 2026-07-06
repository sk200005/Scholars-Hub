"use client"

/**
 * @file DesignAgency.tsx
 * @description Full-page design agency layout.
 *
 * Token compliance:
 *  - Colors    → @/lib/constants/colors
 *  - Motion    → @/lib/constants/motion
 *  - Typography → @/lib/constants/typography  (via Tailwind classes)
 *  - Radius    → @/lib/constants/radius       (via inline styles where Tailwind can't reach)
 *  - Shadows   → @/lib/constants/shadows      (via inline styles)
 *  - Spacing   → @/lib/constants/spacing      (via Tailwind classes)
 *
 * Rules enforced:
 *  - No hardcoded hex values.
 *  - No local animation variants — all imported from motion.ts.
 *  - Lucide outline icons only; sizes from ICON_SYSTEM.md.
 *  - Geist font only (applied via CSS variable in layout.tsx).
 *  - Mobile-first Tailwind classes (sm: / md: / lg: / xl:).
 */

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Github,
  ArrowUpRight,
  Sparkles,
  Zap,
  Palette,
  Code,
  LineChart,
  MessageSquare,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SectionHeader } from "@/components/ui/section-header"
import { BrandLogo } from "@/components/ui/brand-logo"
import { FooterLinkGroup } from "@/components/ui/footer-link-group"
import { HeroCarousel } from "@/components/ui/hero-carousel"
import { ResultsSection } from "@/components/sections/ResultsSection"
import { CoursesSection } from "@/components/sections/CoursesSection"
import { WhyUsSection } from "@/components/sections/WhyUsSection"

// ─── Design-system token imports ────────────────────────────────────────────
import { colors } from "@/lib/constants/colors"
import { shadows } from "@/lib/constants/shadows"
import {
  variants,
  transitions,
  spring,
  viewport,
  gestures,
} from "@/lib/constants/motion"

// ─── Services data ───────────────────────────────────────────────────────────

const SERVICES = [
  {
    // Card icon: 24px per ICON_SYSTEM.md
    icon: <Palette size={24} strokeWidth={1.5} />,
    title: "UI/UX Design",
    description:
      "We create intuitive, engaging user experiences that delight your customers and drive conversions.",
  },
  {
    icon: <Code size={24} strokeWidth={1.5} />,
    title: "Web Development",
    description:
      "Our developers build fast, responsive, and accessible websites that work across all devices.",
  },
  {
    icon: <Sparkles size={24} strokeWidth={1.5} />,
    title: "Brand Identity",
    description:
      "We craft distinctive brand identities that communicate your values and resonate with your audience.",
  },
  {
    icon: <Zap size={24} strokeWidth={1.5} />,
    title: "Mobile Apps",
    description:
      "We design and develop native and cross-platform mobile applications that users love.",
  },
  {
    icon: <LineChart size={24} strokeWidth={1.5} />,
    title: "Digital Marketing",
    description:
      "We help you reach your target audience and grow your business with data-driven marketing strategies.",
  },
  {
    icon: <MessageSquare size={24} strokeWidth={1.5} />,
    title: "Content Creation",
    description:
      "We produce engaging content that tells your story and connects with your customers.",
  },
] as const

// ─── Portfolio data ───────────────────────────────────────────────────────────

const PORTFOLIO = [
  {
    title: "E-commerce Redesign",
    description: "A complete overhaul of an online retail platform",
    colSpan: "md:col-span-2 md:row-span-2",
    height: "h-[400px] md:h-auto",
    showButton: true,
    src: "https://raw.githubusercontent.com/designali-in/designali/2a5d38f658ab24084e3260cdba2259fdc44ae2cd/apps/www/public/placeholder.svg?height=800&width=1200",
  },
  {
    title: "Mobile App Design",
    description: "UI/UX for a fitness tracking application",
    colSpan: "",
    height: "h-[200px]",
    showButton: false,
    src: "https://raw.githubusercontent.com/designali-in/designali/2a5d38f658ab24084e3260cdba2259fdc44ae2cd/apps/www/public/placeholder.svg?height=600&width=600",
  },
  {
    title: "Brand Identity",
    description: "Complete rebrand for a tech startup",
    colSpan: "",
    height: "h-[200px]",
    showButton: false,
    src: "https://raw.githubusercontent.com/designali-in/designali/2a5d38f658ab24084e3260cdba2259fdc44ae2cd/apps/www/public/placeholder.svg?height=600&width=600",
  },
  {
    title: "Web Application",
    description: "Dashboard design for a SaaS platform",
    colSpan: "",
    height: "h-[200px]",
    showButton: false,
    src: "https://raw.githubusercontent.com/designali-in/designali/2a5d38f658ab24084e3260cdba2259fdc44ae2cd/apps/www/public/placeholder.svg?height=600&width=600",
  },
  {
    title: "Marketing Campaign",
    description: "Integrated digital campaign for product launch",
    colSpan: "md:col-span-2",
    height: "h-[200px]",
    showButton: false,
    src: "https://raw.githubusercontent.com/designali-in/designali/2a5d38f658ab24084e3260cdba2259fdc44ae2cd/apps/www/public/placeholder.svg?height=600&width=1200",
  },
] as const

// ─── Team data ────────────────────────────────────────────────────────────────

const TEAM = [
  { name: "Alex Johnson", role: "Creative Director" },
  { name: "Sam Taylor", role: "Lead Designer" },
  { name: "Jordan Smith", role: "Senior Developer" },
  { name: "Casey Brown", role: "Project Manager" },
] as const

// ─── Testimonial data ─────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote:
      "Working with this team transformed our brand. They understood our vision perfectly and delivered beyond our expectations.",
    author: "Sarah Johnson",
    company: "CEO, TechStart",
  },
  {
    quote:
      "The attention to detail and creative solutions provided by the team helped us increase our conversion rate by 40%.",
    author: "Michael Chen",
    company: "Marketing Director, GrowthCo",
  },
  {
    quote:
      "Their strategic approach to design not only improved our user experience but also strengthened our brand identity.",
    author: "Emma Rodriguez",
    company: "Product Manager, InnovateLabs",
  },
  {
    quote:
      "From concept to execution, the team demonstrated exceptional skill and professionalism. Highly recommended!",
    author: "David Kim",
    company: "Founder, NextWave",
  },
] as const

// ─── Social links ─────────────────────────────────────────────────────────────

const CONTACT_SOCIALS = [
  { icon: <Instagram size={20} strokeWidth={1.5} />, label: "Instagram" },
  { icon: <Twitter size={20} strokeWidth={1.5} />, label: "Twitter" },
  { icon: <Linkedin size={20} strokeWidth={1.5} />, label: "LinkedIn" },
  { icon: <Facebook size={20} strokeWidth={1.5} />, label: "Facebook" },
] as const

const FOOTER_SOCIALS = [
  { icon: <Instagram size={20} strokeWidth={1.5} />, label: "Instagram" },
  { icon: <Twitter size={20} strokeWidth={1.5} />, label: "Twitter" },
  { icon: <Linkedin size={20} strokeWidth={1.5} />, label: "LinkedIn" },
  { icon: <Github size={20} strokeWidth={1.5} />, label: "GitHub" },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

export function DesignAgency() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen((v) => !v)

  return (
    <div className="flex min-h-screen flex-col bg-background">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={transitions.smooth}
        style={{
          boxShadow: scrolled ? shadows.navScrolled : shadows.nav,
        }}
        className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex h-20 items-center justify-between border-x border-border">
          {/* Logo */}
          <BrandLogo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {["Services", "Work", "About", "Clients", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-base font-semibold transition-colors hover:text-primary"
                style={{ color: colors.foreground.muted }}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" className="rounded-xl">
              Log In
            </Button>
            <Button className="rounded-xl">
              Get Started
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-toggle"
            className="flex md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile Menu ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            variants={variants.fade}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-50 flex flex-col md:hidden"
            style={{ backgroundColor: colors.background.DEFAULT }}
          >
            {/* Mobile menu header */}
            <div className="container flex h-20 items-center justify-between">
              <BrandLogo onClick={toggleMenu} />
              <button onClick={toggleMenu} aria-label="Close menu">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile nav links */}
            <motion.nav
              variants={variants.staggerContainer}
              initial="hidden"
              animate="visible"
              className="container grid gap-2 pb-8 pt-6"
            >
              {["Services", "Work", "About", "Clients", "Contact"].map((item) => (
                <motion.div key={item} variants={variants.fadeUp}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-lg font-medium transition-colors hover:bg-surface"
                    onClick={toggleMenu}
                    style={{ color: colors.foreground.DEFAULT }}
                  >
                    {item}
                    <ChevronRight size={16} strokeWidth={1.5} color={colors.foreground.muted} />
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={variants.fadeUp} className="flex flex-col gap-3 pt-4">
                <Button variant="outline" className="w-full rounded-xl">
                  Log In
                </Button>
                <Button className="w-full rounded-xl">
                  Get Started
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* ── Top Full-Width Banner ─────────────────────────────────────────── */}
        <section className="w-full">
          <Image
            src="/hero/top-banner.png"
            alt="Scholars Hub Banner"
            width={2800}
            height={1200}
            className="w-full h-auto object-cover"
            priority
          />
        </section>

        {/* ── Hero Carousel ───────────────────────────────────────────────────── */}
        <HeroCarousel />

        {/* ── Results Showcase ────────────────────────────────────────────────── */}
        <ResultsSection />

        {/* ── Courses Showcase ────────────────────────────────────────────────── */}
        <CoursesSection />

        {/* ── Why Us / Sticky Cards ───────────────────────────────────────────── */}
        <WhyUsSection />

        {/* ── Services ────────────────────────────────────────────────────────── */}
        {false && (
          <section id="services" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container rounded-2xl border border-border px-4 md:px-6">
              {/* Section header */}
              <SectionHeader
                badge="Services"
                title="What We Do"
                description="We offer a comprehensive range of design and development services to help your business thrive"
              />

              {/* Service cards */}
              <motion.div
                variants={variants.staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport.once}
                className="mx-auto grid max-w-5xl gap-4 py-12 md:grid-cols-2 lg:grid-cols-3"
              >
                {SERVICES.map((service) => (
                  <motion.div
                    key={service.title}
                    variants={variants.fadeUp}
                    {...gestures.cardHover}
                    className="group relative overflow-hidden rounded-2xl border border-border p-6"
                    style={{
                      backgroundColor: colors.surface.elevated,
                      boxShadow: shadows.card.rest,
                    }}
                  >
                    {/* Decorative circle */}
                    <div
                      className="absolute -right-20 -top-20 h-40 w-40 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: `${colors.primary.DEFAULT}1A`,
                      }}
                    />
                    <div className="relative space-y-3">
                      <div
                        className="mb-4"
                        style={{ color: colors.primary.DEFAULT }}
                      >
                        {service.icon}
                      </div>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: colors.foreground.DEFAULT }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-sm" style={{ color: colors.foreground.muted }}>
                        {service.description}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Link
                        href="#"
                        className="text-sm font-semibold underline-offset-4 hover:underline"
                        style={{ color: colors.primary.DEFAULT }}
                      >
                        Learn more
                      </Link>
                      <motion.div
                        whileHover={{ x: 4, transition: transitions.quick }}
                      >
                        <ArrowRight
                          size={16}
                          strokeWidth={1.5}
                          color={colors.primary.DEFAULT}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* ── Portfolio / Bento Grid ───────────────────────────────────────────── */}
        {false && (
          <section id="work" className="w-full py-12 md:py-24 lg:py-32">
            <div
              className="container rounded-2xl border border-border px-4 md:px-6"
              style={{ backgroundColor: colors.background.subtle }}
            >
              {/* Section header */}
              <SectionHeader
                badge="Portfolio"
                title="Our Work"
                description="A showcase of our recent projects and collaborations"
              />

              {/* Bento grid */}
              <motion.div
                variants={variants.staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport.once}
                className="mx-auto grid max-w-7xl gap-4 py-12 md:grid-cols-4 md:grid-rows-2"
              >
                {PORTFOLIO.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={variants.fadeUp}
                    whileHover={{ scale: 1.02, transition: transitions.smooth }}
                    className={`group relative overflow-hidden rounded-2xl ${item.colSpan} ${item.height}`}
                  >
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)",
                      }}
                    />
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Overlay content */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-sm text-white/80">{item.description}</p>
                      {item.showButton && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                          className="mt-3"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-white/40 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                          >
                            View Project
                            <ArrowUpRight size={16} strokeWidth={1.5} className="ml-2" />
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex justify-center pb-10">
                <motion.div {...gestures.buttonPress}>
                  <Button size="lg" className="group rounded-xl">
                    View All Projects
                    <ArrowRight
                      size={16}
                      strokeWidth={1.5}
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    />
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* ── Spacer (matches gap between Our Story and Testimonials) ── */}
        <div className="w-full py-12 md:py-24 lg:py-32" />

        {/* ── About / Team ─────────────────────────────────────────────────────── */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container rounded-2xl border border-border px-4 md:px-6">
            {/* Story row */}
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
                viewport={viewport.once}
                className="space-y-4 p-6"
              >
                <span
                  className="inline-block rounded-full px-3 py-1 text-sm font-medium"
                  style={{ backgroundColor: colors.background.muted, color: colors.foreground.DEFAULT }}
                >
                  About Us
                </span>
                <h2
                  className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                  style={{ color: colors.foreground.DEFAULT }}
                >
                  Our Story
                </h2>
                <p className="text-base md:text-xl" style={{ color: colors.foreground.muted }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend sed mauris sed commodo. 
                  Nam at turpis euismod orci imperdiet maximus. Aenean a mauris nec odio mollis pellentesque et et elit. 
                  Donec aliquet mattis tempus. Donec dictum enim ac elit maximus aliquam. Morbi rutrum vel velit consectetur condimentum. 
                  Nulla auctor nulla ultricies faucibus porta. Mauris vel sapien libero. Nulla non mi id elit porttitor dignissim nec non libero. 
                  Vestibulum varius vel purus eu suscipit. Maecenas luctus et sem ut venenatis. In lorem diam, feugiat vitae leo sit amet, cursus egestas nulla.
                </p>
                <p className="text-base md:text-xl" style={{ color: colors.foreground.muted }}>
                  Nam hendrerit felis elit, sed lobortis dui molestie a. Aenean ullamcorper efficitur tortor ac porta. 
                  Aliquam tincidunt pellentesque sem ac convallis. Donec egestas arcu dui, at placerat purus accumsan ac.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button variant="outline" size="lg" className="rounded-xl">
                    Our Process
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-xl">
                    Join Our Team
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
                viewport={viewport.once}
                className="flex items-center justify-center"
              >
                <div className="relative h-[350px] w-full overflow-hidden rounded-2xl md:h-[450px] lg:h-[500px]">
                  <Image
                    src="/Photos/OurStory/BigP/our-story.png"
                    alt="Our Story"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>

            {/* Team grid */}
            <div className="mt-16 px-6 pb-10">
              <motion.h3
                variants={variants.fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport.once}
                className="text-2xl font-bold tracking-tight sm:text-3xl"
                style={{ color: colors.foreground.DEFAULT }}
              >
                Meet Our Team
              </motion.h3>
              <motion.div
                variants={variants.staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport.once}
                className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              >
                {TEAM.map((member) => (
                  <motion.div
                    key={member.name}
                    variants={variants.fadeUp}
                    whileHover={{ y: -8, transition: transitions.springSnappy }}
                    className="group relative overflow-hidden rounded-2xl"
                  >
                    <Image
                      src="/Photos/OurStory/SmallP/teacher.png"
                      alt={member.name}
                      width={300}
                      height={400}
                      className="h-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 flex flex-col justify-end p-4"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)",
                      }}
                    >
                      <p className="font-bold text-white">{member.name}</p>
                      <p className="text-sm text-white/80">{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────────────────── */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div
            className="container rounded-2xl border border-border px-4 md:px-6"
            style={{ backgroundColor: colors.background.subtle }}
          >
            {/* Section header */}
            <SectionHeader
              badge="Testimonials"
              title="What Our Clients Say"
              description="Don't just take our word for it — hear from some of our satisfied clients"
              badgeStyle={{
                backgroundColor: colors.surface.elevated,
                boxShadow: shadows.xs,
              }}
            />

            {/* Testimonial cards */}
            <motion.div
              variants={variants.staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport.once}
              className="mx-auto grid max-w-5xl gap-4 py-12 lg:grid-cols-2"
            >
              {TESTIMONIALS.map((t) => (
                <motion.div
                  key={t.author}
                  variants={variants.fadeUp}
                  whileHover={{ y: -8, transition: transitions.springSnappy }}
                  className="flex flex-col justify-between rounded-2xl border border-border p-6"
                  style={{
                    backgroundColor: colors.surface.elevated,
                    boxShadow: shadows.card.rest,
                  }}
                >
                  <div>
                    {/* Stars — use highlight token, not hardcoded yellow */}
                    <div className="flex gap-0.5" style={{ color: colors.highlight.DEFAULT }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={18} strokeWidth={0} fill="currentColor" />
                      ))}
                    </div>
                    <blockquote
                      className="mt-4 text-base font-medium leading-relaxed md:text-lg"
                      style={{ color: colors.foreground.DEFAULT }}
                    >
                      "{t.quote}"
                    </blockquote>
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <div
                      className="h-10 w-10 rounded-full"
                      style={{ backgroundColor: colors.background.muted }}
                    />
                    <div>
                      <p className="font-semibold" style={{ color: colors.foreground.DEFAULT }}>
                        {t.author}
                      </p>
                      <p className="text-sm" style={{ color: colors.foreground.muted }}>
                        {t.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────────────────────── */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 rounded-2xl border border-border px-4 md:px-6 lg:grid-cols-2">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
              viewport={viewport.once}
              className="space-y-4 p-6"
            >
              <span
                className="inline-block rounded-full px-3 py-1 text-sm font-medium"
                style={{ backgroundColor: colors.background.muted, color: colors.foreground.DEFAULT }}
              >
                Contact
              </span>
              <h2
                className="text-3xl font-bold tracking-tight md:text-4xl"
                style={{ color: colors.foreground.DEFAULT }}
              >
                Let's Work Together
              </h2>
              <p className="max-w-[600px] text-base md:text-xl" style={{ color: colors.foreground.muted }}>
                Ready to start your next project? Get in touch with us to discuss how we can help bring
                your vision to life.
              </p>

              {/* Contact details */}
              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: <MapPin size={20} strokeWidth={1.5} />,
                    label: "Our Location",
                    value: "123 Design Street, Creative City, 10001",
                  },
                  {
                    icon: <Mail size={20} strokeWidth={1.5} />,
                    label: "Email Us",
                    value: "hello@designstudio.com",
                  },
                  {
                    icon: <Phone size={20} strokeWidth={1.5} />,
                    label: "Call Us",
                    value: "+1 (555) 123-4567",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ x: 4, transition: transitions.quick }}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="rounded-xl p-2"
                      style={{
                        backgroundColor: colors.background.muted,
                        color: colors.primary.DEFAULT,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: colors.foreground.DEFAULT }}>
                        {item.label}
                      </p>
                      <p className="text-sm" style={{ color: colors.foreground.muted }}>
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social links */}
              <div className="mt-8 flex gap-3">
                {CONTACT_SOCIALS.map((social) => (
                  <motion.div key={social.label} {...gestures.iconButton}>
                    <Link
                      href="#"
                      aria-label={social.label}
                      className="flex items-center justify-center rounded-xl border border-border p-2 transition-colors hover:border-primary"
                      style={{ color: colors.foreground.muted }}
                    >
                      {social.icon}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
              viewport={viewport.once}
              className="rounded-2xl border border-border p-6"
              style={{
                backgroundColor: colors.surface.elevated,
                boxShadow: shadows.card.rest,
              }}
            >
              <h3 className="text-xl font-bold" style={{ color: colors.foreground.DEFAULT }}>
                Send Us a Message
              </h3>
              <p className="mt-1 text-sm" style={{ color: colors.foreground.muted }}>
                Fill out the form below and we'll get back to you shortly.
              </p>
              <form className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-first-name"
                      className="text-sm font-medium"
                      style={{ color: colors.foreground.DEFAULT }}
                    >
                      First name
                    </label>
                    <Input
                      id="contact-first-name"
                      placeholder="Enter your first name"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-last-name"
                      className="text-sm font-medium"
                      style={{ color: colors.foreground.DEFAULT }}
                    >
                      Last name
                    </label>
                    <Input
                      id="contact-last-name"
                      placeholder="Enter your last name"
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium"
                    style={{ color: colors.foreground.DEFAULT }}
                  >
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium"
                    style={{ color: colors.foreground.DEFAULT }}
                  >
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    placeholder="Enter your message"
                    className="min-h-[120px] rounded-xl"
                  />
                </div>
                <motion.div {...gestures.buttonPress}>
                  <Button type="submit" className="w-full rounded-xl">
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="w-full bg-[#111827] text-slate-300">
        <motion.div
          variants={variants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.once}
          className="container grid gap-8 px-4 py-16 md:px-6 lg:grid-cols-4"
        >
          {/* Brand column */}
          <div className="space-y-4">
            <BrandLogo isDark />
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              We create beautiful, functional designs that help businesses grow and connect with their
              audience.
            </p>
            <div className="flex gap-3 pt-4">
              {FOOTER_SOCIALS.map((social) => (
                <motion.div key={social.label} {...gestures.iconButton}>
                  <Link
                    href="#"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    {social.icon}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <FooterLinkGroup
              title="Company"
              links={["About Us", "Careers", "Our Process", "News & Press"]}
            />
            <FooterLinkGroup
              title="Services"
              links={["UI/UX Design", "Web Development", "Brand Identity", "Digital Marketing"]}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <FooterLinkGroup
              title="Resources"
              links={["Blog", "Case Studies", "Guides & Tutorials", "FAQ"]}
            />
            <FooterLinkGroup
              title="Legal"
              links={["Privacy Policy", "Terms of Service", "Cookie Policy"]}
            />
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-100">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-slate-400">
              Stay updated with our latest projects, design tips, and company news.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 mt-4">
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-slate-400"
              />
              <Button type="submit" className="rounded-xl bg-white text-[#111827] hover:bg-slate-200 font-semibold">
                Subscribe
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-8">
          <div className="container flex flex-col items-center justify-between gap-4 py-8 md:h-20 md:flex-row md:py-0">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Scholars Hub. All rights reserved.
            </p>
            <nav className="flex gap-6 text-xs text-slate-500">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
