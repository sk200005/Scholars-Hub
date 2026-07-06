/**
 * @file typography.ts
 * @description Single source of truth for all typography tokens.
 *
 * Rules (from TYPOGRAPHY.md):
 *  - Font: Geist only — imported via next/font/google.
 *  - Never hardcode font sizes in components.
 *  - Create reusable typography tokens.
 *  - Maintain consistent line heights and spacing.
 *
 * Usage:
 *  import { typography } from '@/lib/constants/typography'
 *  typography.size.desktop.h1   → '48px'
 *  typography.weight.heading    → 700
 */

// ---------------------------------------------------------------------------
// Font family
// ---------------------------------------------------------------------------

export const fontFamily = {
  /**
   * Primary (and only) typeface.
   * Loaded via `next/font/google` in `layout.tsx` as a CSS variable.
   * Reference the variable here; never import the font directly in components.
   */
  sans: 'var(--font-geist-sans)',
  mono: 'var(--font-geist-mono)',
} as const;

// ---------------------------------------------------------------------------
// Font weights
// ---------------------------------------------------------------------------

export const fontWeight = {
  /** Hero / marketing display text */
  display:    800,
  /** Section headings (h1–h2) */
  heading:    700,
  /** Sub-headings (h3–h4), labels, buttons */
  subheading: 600,
  /** Button labels */
  button:     600,
  /** Body copy */
  body:       400,
  /** Small labels, captions */
  small:      400,
} as const;

// ---------------------------------------------------------------------------
// Font sizes  (rem-based; 1rem = 16px browser default)
// ---------------------------------------------------------------------------

/** Desktop type scale (≥ 1024 px) */
const desktopSizes = {
  display: '72px',   // 4.5rem
  h1:      '48px',   // 3rem
  h2:      '36px',   // 2.25rem
  h3:      '28px',   // 1.75rem
  h4:      '24px',   // 1.5rem
  body:    '16px',   // 1rem
  small:   '14px',   // 0.875rem
  caption: '12px',   // 0.75rem
} as const;

/** Mobile type scale (< 640 px) */
const mobileSizes = {
  display: '42px',   // 2.625rem
  h1:      '34px',   // 2.125rem
  h2:      '28px',   // 1.75rem
  h3:      '22px',   // 1.375rem
  h4:      '20px',   // 1.25rem
  body:    '16px',   // 1rem
  small:   '14px',   // 0.875rem
  caption: '12px',   // 0.75rem
} as const;

// ---------------------------------------------------------------------------
// Line heights
// ---------------------------------------------------------------------------

export const lineHeight = {
  /** Tight — display, large headings */
  tight:   1.1,
  /** Snug — h3, h4 */
  snug:    1.25,
  /** Normal — body copy */
  normal:  1.5,
  /** Relaxed — long-form prose */
  relaxed: 1.625,
  /** Fixed pixel values for UI elements */
  none:    1,
} as const;

// ---------------------------------------------------------------------------
// Letter spacing
// ---------------------------------------------------------------------------

export const letterSpacing = {
  tighter: '-0.05em',
  tight:   '-0.025em',
  normal:  '0em',
  wide:    '0.025em',
  wider:   '0.05em',
  widest:  '0.1em',
} as const;

// ---------------------------------------------------------------------------
// Composed scale — the primary export for component use
// ---------------------------------------------------------------------------

export const typography = {
  fontFamily,
  fontWeight,
  lineHeight,
  letterSpacing,

  /** Raw sizes by breakpoint */
  size: {
    desktop: desktopSizes,
    mobile:  mobileSizes,
  },

  /**
   * Semantic text styles — composite tokens that pair size, weight,
   * line-height, and letter-spacing into ready-to-use style objects.
   *
   * These are for use in Tailwind `className` construction helpers or
   * inline `style` props via Framer Motion variants.
   */
  styles: {
    display: {
      desktop: {
        fontSize:      desktopSizes.display,
        fontWeight:    fontWeight.display,
        lineHeight:    lineHeight.tight,
        letterSpacing: letterSpacing.tight,
      },
      mobile: {
        fontSize:      mobileSizes.display,
        fontWeight:    fontWeight.display,
        lineHeight:    lineHeight.tight,
        letterSpacing: letterSpacing.tight,
      },
    },
    h1: {
      desktop: {
        fontSize:      desktopSizes.h1,
        fontWeight:    fontWeight.heading,
        lineHeight:    lineHeight.tight,
        letterSpacing: letterSpacing.tight,
      },
      mobile: {
        fontSize:      mobileSizes.h1,
        fontWeight:    fontWeight.heading,
        lineHeight:    lineHeight.tight,
        letterSpacing: letterSpacing.tight,
      },
    },
    h2: {
      desktop: {
        fontSize:      desktopSizes.h2,
        fontWeight:    fontWeight.heading,
        lineHeight:    lineHeight.snug,
        letterSpacing: letterSpacing.tight,
      },
      mobile: {
        fontSize:      mobileSizes.h2,
        fontWeight:    fontWeight.heading,
        lineHeight:    lineHeight.snug,
        letterSpacing: letterSpacing.tight,
      },
    },
    h3: {
      desktop: {
        fontSize:      desktopSizes.h3,
        fontWeight:    fontWeight.subheading,
        lineHeight:    lineHeight.snug,
        letterSpacing: letterSpacing.normal,
      },
      mobile: {
        fontSize:      mobileSizes.h3,
        fontWeight:    fontWeight.subheading,
        lineHeight:    lineHeight.snug,
        letterSpacing: letterSpacing.normal,
      },
    },
    h4: {
      desktop: {
        fontSize:      desktopSizes.h4,
        fontWeight:    fontWeight.subheading,
        lineHeight:    lineHeight.snug,
        letterSpacing: letterSpacing.normal,
      },
      mobile: {
        fontSize:      mobileSizes.h4,
        fontWeight:    fontWeight.subheading,
        lineHeight:    lineHeight.snug,
        letterSpacing: letterSpacing.normal,
      },
    },
    body: {
      desktop: {
        fontSize:      desktopSizes.body,
        fontWeight:    fontWeight.body,
        lineHeight:    lineHeight.normal,
        letterSpacing: letterSpacing.normal,
      },
      mobile: {
        fontSize:      mobileSizes.body,
        fontWeight:    fontWeight.body,
        lineHeight:    lineHeight.normal,
        letterSpacing: letterSpacing.normal,
      },
    },
    small: {
      desktop: {
        fontSize:      desktopSizes.small,
        fontWeight:    fontWeight.small,
        lineHeight:    lineHeight.normal,
        letterSpacing: letterSpacing.normal,
      },
      mobile: {
        fontSize:      mobileSizes.small,
        fontWeight:    fontWeight.small,
        lineHeight:    lineHeight.normal,
        letterSpacing: letterSpacing.normal,
      },
    },
    caption: {
      desktop: {
        fontSize:      desktopSizes.caption,
        fontWeight:    fontWeight.small,
        lineHeight:    lineHeight.normal,
        letterSpacing: letterSpacing.wide,
      },
      mobile: {
        fontSize:      mobileSizes.caption,
        fontWeight:    fontWeight.small,
        lineHeight:    lineHeight.normal,
        letterSpacing: letterSpacing.wide,
      },
    },
    button: {
      fontSize:      desktopSizes.body,
      fontWeight:    fontWeight.button,
      lineHeight:    lineHeight.none,
      letterSpacing: letterSpacing.normal,
    },
  },
} as const;

// ---------------------------------------------------------------------------
// Type helpers
// ---------------------------------------------------------------------------

export type TypographyToken    = typeof typography;
export type TypographyScale    = keyof typeof typography['styles'];
export type BreakpointScale    = 'desktop' | 'mobile';
export type FontWeightToken    = typeof fontWeight;
export type LineHeightToken    = typeof lineHeight;
export type LetterSpacingToken = typeof letterSpacing;
