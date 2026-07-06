/**
 * @file shadows.ts
 * @description Single source of truth for all box-shadow tokens.
 *
 * Rules (from DESIGN_SYSTEM.md):
 *  - Use only predefined shadow tokens.
 *  - No arbitrary shadows.
 *
 * Brand palette: Green / White / Charcoal — shadows lean cool-neutral.
 * Layered approach: ambient (large, low opacity) + direct (small, crisp).
 *
 * Usage:
 *  import { shadows } from '@/lib/constants/shadows'
 *  shadows.card          → CSS box-shadow value
 *  shadows.button.rest   → CSS box-shadow value
 */

// ---------------------------------------------------------------------------
// Shadow primitives  (raw values — do NOT use directly in components)
// ---------------------------------------------------------------------------

/** RGBA green for glow / focus rings */
const greenGlow   = 'rgba(22, 163, 74,';
/** Cool-neutral ambient shadow color */
const ambient     = 'rgba(17, 24, 39,';

// ---------------------------------------------------------------------------
// Semantic shadow tokens  (use ONLY these in components)
// ---------------------------------------------------------------------------

export const shadows = {
  // ── Elevation ─────────────────────────────────────────────────────────

  /** No shadow — flat / ghost elements */
  none: 'none',

  /**
   * xs — barely lifted.
   * Use: small tags, inline chips.
   */
  xs: `0 1px 2px 0 ${ambient} 0.05)`,

  /**
   * sm — subtly raised.
   * Use: input fields, badges, nav links.
   */
  sm: `0 1px 3px 0 ${ambient} 0.1), 0 1px 2px -1px ${ambient} 0.1)`,

  /**
   * md — default card elevation.
   * Use: standard cards, dropdowns, tooltips.
   */
  md: `0 4px 6px -1px ${ambient} 0.07), 0 2px 4px -2px ${ambient} 0.07)`,

  /**
   * lg — prominent card / modal.
   * Use: feature cards, hover states, modals.
   */
  lg: `0 10px 15px -3px ${ambient} 0.08), 0 4px 6px -4px ${ambient} 0.08)`,

  /**
   * xl — strong elevation.
   * Use: dialogs, popovers, floating action buttons.
   */
  xl: `0 20px 25px -5px ${ambient} 0.1), 0 8px 10px -6px ${ambient} 0.1)`,

  /**
   * 2xl — maximum elevation.
   * Use: hero sections with depth, full-screen modals.
   */
  '2xl': `0 25px 50px -12px ${ambient} 0.18)`,

  // ── Interactive states ─────────────────────────────────────────────────

  /** Button shadow states */
  button: {
    /** Resting state — subtle lift */
    rest:    `0 1px 3px 0 ${ambient} 0.12), 0 1px 2px -1px ${ambient} 0.12)`,
    /** Hover state — more pronounced */
    hover:   `0 4px 12px -2px ${ambient} 0.15), 0 2px 4px -2px ${ambient} 0.1)`,
    /** Active/pressed — pushed in */
    active:  `0 1px 2px 0 ${ambient} 0.1)`,
    /** Focused — brand green ring */
    focus:   `0 0 0 3px ${greenGlow} 0.25)`,
  },

  /** Input field shadow states */
  input: {
    /** Default — hairline shadow */
    rest:    `0 1px 2px 0 ${ambient} 0.05)`,
    /** Focused — brand green ring */
    focus:   `0 0 0 3px ${greenGlow} 0.2), 0 1px 2px 0 ${ambient} 0.05)`,
    /** Error state — red ring */
    error:   `0 0 0 3px rgba(239, 68, 68, 0.2), 0 1px 2px 0 ${ambient} 0.05)`,
  },

  // ── Card states ────────────────────────────────────────────────────────

  /** Card elevation states */
  card: {
    /** Resting card */
    rest:  `0 4px 6px -1px ${ambient} 0.07), 0 2px 4px -2px ${ambient} 0.07)`,
    /** Hovered card — lifted */
    hover: `0 10px 20px -4px ${ambient} 0.12), 0 4px 8px -4px ${ambient} 0.08)`,
  },

  // ── Glow effects (brand green) ─────────────────────────────────────────

  /** Brand green glow — CTA highlights, primary actions */
  glow: {
    sm: `0 0 8px 0 ${greenGlow} 0.3)`,
    md: `0 0 16px 4px ${greenGlow} 0.25)`,
    lg: `0 0 32px 8px ${greenGlow} 0.2)`,
  },

  // ── Navigation ─────────────────────────────────────────────────────────

  /** Navbar — subtle bottom separator shadow */
  nav:    `0 1px 0 0 rgba(229, 231, 235, 0.8), 0 2px 8px -2px ${ambient} 0.06)`,
  /** Sticky header — more prominent on scroll */
  navScrolled: `0 4px 16px -4px ${ambient} 0.12), 0 1px 0 0 rgba(229, 231, 235, 0.6)`,

  // ── Overlay / modal ────────────────────────────────────────────────────

  /** Full-screen overlay / drawer shadow */
  overlay: `0 25px 50px -12px ${ambient} 0.35)`,

  /** Dropdown menu shadow */
  dropdown: `0 8px 24px -4px ${ambient} 0.12), 0 2px 8px -2px ${ambient} 0.08)`,

  /** Tooltip shadow */
  tooltip: `0 4px 8px -2px ${ambient} 0.1), 0 2px 4px -2px ${ambient} 0.06)`,

  // ── Inner shadows ─────────────────────────────────────────────────────

  /** Inset — pressed wells, input backgrounds */
  inner: `inset 0 2px 4px 0 ${ambient} 0.06)`,
} as const;

// ---------------------------------------------------------------------------
// Type helpers
// ---------------------------------------------------------------------------

export type ShadowToken = typeof shadows;
export type ShadowKey   = keyof ShadowToken;
