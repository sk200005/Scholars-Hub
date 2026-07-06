/**
 * @file radius.ts
 * @description Single source of truth for all border-radius tokens.
 *
 * Derived from DESIGN_SYSTEM.md:
 *  - Buttons  → 12px
 *  - Cards    → 20px
 *  - Inputs   → 12px
 *
 * Usage:
 *  import { radius } from '@/lib/constants/radius'
 *  radius.button  → '12px'
 *  radius.card    → '20px'
 */

// ---------------------------------------------------------------------------
// Primitive scale
// ---------------------------------------------------------------------------

const primitiveRadius = {
  /** 0px — no rounding */
  none:  '0px',
  /** 2px — subtle rounding (dividers) */
  xs:    '2px',
  /** 4px — micro rounding (tags, chips) */
  sm:    '4px',
  /** 8px — moderate rounding (badges, small elements) */
  md:    '8px',
  /** 12px — standard rounding */
  lg:    '12px',
  /** 16px — comfortable rounding */
  xl:    '16px',
  /** 20px — generous rounding */
  '2xl': '20px',
  /** 24px — very rounded */
  '3xl': '24px',
  /** 9999px — fully pill-shaped */
  full:  '9999px',
} as const;

// ---------------------------------------------------------------------------
// Semantic tokens  (DESIGN_SYSTEM.md — use these in all components)
// ---------------------------------------------------------------------------

export const radius = {
  // ── Component-level semantic tokens ─────────────────────────────────────

  /** Primary action buttons — 12px */
  button:   primitiveRadius.lg,
  /** Secondary / ghost buttons — 12px */
  buttonSm: primitiveRadius.lg,
  /** Icon-only circular buttons — full pill */
  buttonRound: primitiveRadius.full,

  /** Cards / panels / modals — 20px */
  card:     primitiveRadius['2xl'],
  /** Feature cards (nested) — 16px */
  cardInner: primitiveRadius.xl,

  /** Text inputs, selects, textareas — 12px */
  input:    primitiveRadius.lg,
  /** Search bars — 12px */
  search:   primitiveRadius.lg,

  /** Pill badges / tags — full */
  badge:    primitiveRadius.full,
  /** Chip / label components — 4px */
  chip:     primitiveRadius.sm,

  /** Tooltips — 8px */
  tooltip:  primitiveRadius.md,
  /** Dropdown menus / popovers — 12px */
  popover:  primitiveRadius.lg,
  /** Modals / dialogs — 20px */
  modal:    primitiveRadius['2xl'],
  /** Drawer panels — 20px on opening edge */
  drawer:   primitiveRadius['2xl'],

  /** Avatar / profile image — full circle */
  avatar:   primitiveRadius.full,
  /** Image thumbnails — 12px */
  image:    primitiveRadius.lg,

  /** Progress bars — full pill */
  progress: primitiveRadius.full,
  /** Switch / toggle track — full pill */
  toggle:   primitiveRadius.full,

  // ── Primitive pass-through (use only when no semantic token fits) ────────
  ...primitiveRadius,
} as const;

// ---------------------------------------------------------------------------
// Type helpers
// ---------------------------------------------------------------------------

export type RadiusToken = typeof radius;
export type RadiusKey   = keyof RadiusToken;
