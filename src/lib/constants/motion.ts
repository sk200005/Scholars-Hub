/**
 * @file motion.ts
 * @description Single source of truth for all animation / motion tokens.
 *
 * Rules (from DESIGN_SYSTEM.md):
 *  - Only Framer Motion for animations.
 *  - No GSAP, no CSS animations unless explicitly requested.
 *  - Use consistent easing, duration, and motion curves.
 *
 * All values are Framer Motion-compatible (Transition, Variants, etc.).
 * Import these tokens in `motion.*` components and `useAnimate` hooks.
 *
 * Usage:
 *  import { duration, easing, spring, transitions, variants } from '@/lib/constants/motion'
 *  <motion.div transition={transitions.smooth} variants={variants.fadeUp} />
 */

import type { Transition, Variants, Target } from 'framer-motion';

// ---------------------------------------------------------------------------
// Duration scale  (seconds — Framer Motion convention)
// ---------------------------------------------------------------------------

export const duration = {
  /** 75ms — micro-interactions (icon flips, selection dots) */
  instant: 0.075,
  /** 100ms — hover color / opacity changes */
  fast:    0.1,
  /** 150ms — button press feedback */
  quick:   0.15,
  /** 200ms — standard UI transitions (dropdowns, tooltips) */
  normal:  0.2,
  /** 300ms — content reveals, card entrances */
  smooth:  0.3,
  /** 450ms — page section entrances */
  medium:  0.45,
  /** 600ms — hero animations, large element reveals */
  slow:    0.6,
  /** 800ms — complex staggered sequences */
  slower:  0.8,
  /** 1000ms — ambient / looping background effects */
  slowest: 1.0,
} as const;

// ---------------------------------------------------------------------------
// Easing presets (cubic-bezier arrays for Framer Motion)
// ---------------------------------------------------------------------------

export const easing = {
  /** Linear — progress bars, loading indicators */
  linear:      [0, 0, 1, 1]     as [number, number, number, number],
  /** Ease in — elements exiting the screen */
  easeIn:      [0.4, 0, 1, 1]   as [number, number, number, number],
  /** Ease out — elements entering the screen */
  easeOut:     [0, 0, 0.2, 1]   as [number, number, number, number],
  /** Ease in-out — shared elements, repositioning */
  easeInOut:   [0.4, 0, 0.2, 1] as [number, number, number, number],
  /** Sharp — quick, snappy UI elements */
  sharp:       [0.4, 0, 0.6, 1] as [number, number, number, number],
  /** Anticipate — slight pull-back before motion */
  anticipate:  [0.36, 0, 0.66, -0.56] as [number, number, number, number],
  /** Overshoot — playful bounce-out */
  overshoot:   [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  /** Decelerate — fast-in, slow-out (preferred for enter) */
  decelerate:  [0, 0, 0.2, 1]   as [number, number, number, number],
  /** Accelerate — slow-in, fast-out (preferred for exit) */
  accelerate:  [0.4, 0, 1, 1]   as [number, number, number, number],
} as const;

// ---------------------------------------------------------------------------
// Spring configs  (physics-based — preferred for interactive elements)
// ---------------------------------------------------------------------------

export const spring = {
  /** Gentle — modals, overlays, side panels */
  gentle: {
    type:    'spring' as const,
    stiffness: 200,
    damping:   30,
    mass:      1,
  },
  /** Snappy — button press, toggle, tab indicator */
  snappy: {
    type:    'spring' as const,
    stiffness: 400,
    damping:   40,
    mass:      0.8,
  },
  /** Bouncy — playful cards, tooltips */
  bouncy: {
    type:    'spring' as const,
    stiffness: 350,
    damping:   20,
    mass:      1,
  },
  /** Stiff — nav indicator, precise repositioning */
  stiff: {
    type:    'spring' as const,
    stiffness: 600,
    damping:   60,
    mass:      0.5,
  },
  /** Smooth — hero, large section reveals */
  smooth: {
    type:    'spring' as const,
    stiffness: 100,
    damping:   25,
    mass:      1.2,
  },
} as const;

// ---------------------------------------------------------------------------
// Pre-composed transitions  (Framer Motion `Transition` objects)
// ---------------------------------------------------------------------------

export const transitions = {
  /** Micro: hover color / opacity — 100ms ease-out */
  micro: {
    duration: duration.fast,
    ease:     easing.easeOut,
  } satisfies Transition,

  /** Quick: button feedback, icon state — 150ms ease-out */
  quick: {
    duration: duration.quick,
    ease:     easing.easeOut,
  } satisfies Transition,

  /** Smooth: standard enter/exit — 300ms ease-out */
  smooth: {
    duration: duration.smooth,
    ease:     easing.easeOut,
  } satisfies Transition,

  /** Enter: content reveal — 450ms decelerate */
  enter: {
    duration: duration.medium,
    ease:     easing.decelerate,
  } satisfies Transition,

  /** Exit: content hide — 300ms accelerate */
  exit: {
    duration: duration.smooth,
    ease:     easing.accelerate,
  } satisfies Transition,

  /** Lazy: hero / page-level — 600ms ease-out */
  lazy: {
    duration: duration.slow,
    ease:     easing.easeOut,
  } satisfies Transition,

  /** Spring gentle: overlays, modals */
  springGentle: spring.gentle,

  /** Spring snappy: tabs, toggles */
  springSnappy: spring.snappy,

  /** Spring bouncy: cards, tooltips */
  springBouncy: spring.bouncy,
} as const;

// ---------------------------------------------------------------------------
// Stagger helpers
// ---------------------------------------------------------------------------

export const stagger = {
  /** 40ms between children — tight lists */
  tight:   0.04,
  /** 75ms between children — card grids */
  normal:  0.075,
  /** 120ms between children — feature sections */
  relaxed: 0.12,
  /** 200ms between children — slow reveals */
  loose:   0.2,
} as const;

// ---------------------------------------------------------------------------
// Viewport / scroll trigger config
// ---------------------------------------------------------------------------

export const viewport = {
  /** Default scroll trigger — enters at 20% visible */
  once:   { once: true, amount: 0.2 },
  /** Repeat trigger — fires on every scroll-in */
  repeat: { once: false, amount: 0.2 },
  /** Generous trigger — enters at 10% visible */
  generous: { once: true, amount: 0.1 },
  /** Strict trigger — enters at 40% visible */
  strict: { once: true, amount: 0.4 },
} as const;

// ---------------------------------------------------------------------------
// Standard initial / animate / exit states  (shared across components)
// ---------------------------------------------------------------------------

export const states = {
  visible:   { opacity: 1, y: 0, x: 0, scale: 1 } satisfies Target,
  hidden:    { opacity: 0 }                         satisfies Target,
  hiddenUp:  { opacity: 0, y: -20 }                satisfies Target,
  hiddenDown: { opacity: 0, y: 20 }                satisfies Target,
  hiddenLeft: { opacity: 0, x: -20 }               satisfies Target,
  hiddenRight: { opacity: 0, x: 20 }               satisfies Target,
  scaledDown:  { opacity: 0, scale: 0.92 }          satisfies Target,
  scaledUp:    { opacity: 0, scale: 1.08 }          satisfies Target,
} as const;

// ---------------------------------------------------------------------------
// Pre-composed Variants  (use as `variants={variants.xxx}`)
// ---------------------------------------------------------------------------

export const variants = {
  /** Fade in from below — universal content reveal */
  fadeUp: {
    hidden:  states.hiddenDown,
    visible: {
      ...states.visible,
      transition: transitions.enter,
    },
  } satisfies Variants,

  /** Fade in from above — nav dropdowns, tooltips */
  fadeDown: {
    hidden:  states.hiddenUp,
    visible: {
      ...states.visible,
      transition: transitions.smooth,
    },
  } satisfies Variants,

  /** Simple fade — overlays, modals */
  fade: {
    hidden:  states.hidden,
    visible: {
      opacity: 1,
      transition: transitions.smooth,
    },
  } satisfies Variants,

  /** Scale + fade — cards, popovers */
  scale: {
    hidden:  states.scaledDown,
    visible: {
      ...states.visible,
      transition: transitions.springBouncy,
    },
  } satisfies Variants,

  /** Slide in from left — drawers, panels */
  slideInLeft: {
    hidden:  states.hiddenLeft,
    visible: {
      ...states.visible,
      transition: transitions.springGentle,
    },
  } satisfies Variants,

  /** Slide in from right — drawers, panels */
  slideInRight: {
    hidden:  states.hiddenRight,
    visible: {
      ...states.visible,
      transition: transitions.springGentle,
    },
  } satisfies Variants,

  /**
   * Container variant for staggered children.
   * Pair with a child variant that uses `variants.fadeUp` or similar.
   */
  staggerContainer: {
    hidden:  {},
    visible: {
      transition: {
        staggerChildren:  stagger.normal,
        delayChildren:    0.1,
      },
    },
  } satisfies Variants,

  /** Tighter stagger for dense grids */
  staggerTight: {
    hidden:  {},
    visible: {
      transition: {
        staggerChildren: stagger.tight,
        delayChildren:   0.05,
      },
    },
  } satisfies Variants,

  /** Relaxed stagger for hero sections */
  staggerRelaxed: {
    hidden:  {},
    visible: {
      transition: {
        staggerChildren: stagger.relaxed,
        delayChildren:   0.15,
      },
    },
  } satisfies Variants,
} as const;

// ---------------------------------------------------------------------------
// Hover / tap gesture props  (spread directly onto `motion.*` elements)
// ---------------------------------------------------------------------------

export const gestures = {
  /** Standard card hover — subtle lift */
  cardHover: {
    whileHover: { y: -4, transition: transitions.springSnappy },
    whileTap:   { scale: 0.98, transition: transitions.quick },
  },

  /** Button press — scale feedback */
  buttonPress: {
    whileHover: { scale: 1.02, transition: transitions.quick },
    whileTap:   { scale: 0.97, transition: transitions.quick },
  },

  /** Icon button — subtle scale */
  iconButton: {
    whileHover: { scale: 1.1, transition: transitions.quick },
    whileTap:   { scale: 0.9, transition: transitions.micro },
  },

  /** Link — no scale, just opacity */
  link: {
    whileHover: { opacity: 0.75, transition: transitions.micro },
    whileTap:   { opacity: 0.5, transition: transitions.micro },
  },
} as const;

// ---------------------------------------------------------------------------
// Type helpers
// ---------------------------------------------------------------------------

export type DurationToken    = typeof duration;
export type EasingToken      = typeof easing;
export type SpringToken      = typeof spring;
export type TransitionToken  = typeof transitions;
export type StaggerToken     = typeof stagger;
export type ViewportToken    = typeof viewport;
export type VariantsToken    = typeof variants;
export type GesturesToken    = typeof gestures;
