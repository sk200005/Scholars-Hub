/**
 * @file spacing.ts
 * @description Single source of truth for all spacing tokens.
 *
 * Derived from DESIGN_SYSTEM.md ("Mobile First", "Lots of whitespace")
 * and RESPONSIVE_RULES.md (breakpoints at 375 / 640 / 768 / 1024 / 1280 / 1536).
 *
 * Scale: 4-point base grid.
 * All values in pixels expressed as strings for direct CSS / style prop use.
 *
 * Usage:
 *  import { spacing } from '@/lib/constants/spacing'
 *  spacing[4]          → '16px'
 *  spacing.section.y   → { mobile: '64px', desktop: '96px' }
 */

// ---------------------------------------------------------------------------
// Base 4-point grid
// ---------------------------------------------------------------------------

export const spacing = {
  /** 0px */
  0:   '0px',
  /** 2px  — hairline dividers, fine offsets */
  0.5: '2px',
  /** 4px  — icon/badge nudges */
  1:   '4px',
  /** 6px  — tight internal gaps */
  1.5: '6px',
  /** 8px  — compact spacing (icon padding, tag gaps) */
  2:   '8px',
  /** 10px */
  2.5: '10px',
  /** 12px — small insets, chip padding */
  3:   '12px',
  /** 14px */
  3.5: '14px',
  /** 16px — base unit, default gap */
  4:   '16px',
  /** 20px — card padding (mobile) */
  5:   '20px',
  /** 24px — section inner padding, card gaps */
  6:   '24px',
  /** 28px */
  7:   '28px',
  /** 32px — comfortable section gap, grid gap */
  8:   '32px',
  /** 36px */
  9:   '36px',
  /** 40px — touch-target minimum height, section sub-gap */
  10:  '40px',
  /** 44px — minimum button/touch target height (RESPONSIVE_RULES.md) */
  11:  '44px',
  /** 48px — medium section gap */
  12:  '48px',
  /** 56px */
  14:  '56px',
  /** 64px — section vertical padding (mobile) */
  16:  '64px',
  /** 80px — section vertical padding (tablet) */
  20:  '80px',
  /** 96px — section vertical padding (desktop) */
  24:  '96px',
  /** 112px */
  28:  '112px',
  /** 128px — hero internal padding */
  32:  '128px',
  /** 160px */
  40:  '160px',
  /** 192px */
  48:  '192px',
  /** 256px */
  64:  '256px',

  // ---------------------------------------------------------------------------
  // Semantic / composite spacing
  // ---------------------------------------------------------------------------

  /** Responsive section vertical padding (py) */
  section: {
    /** Mobile: 64px top/bottom */
    mobile:  '64px',
    /** Tablet: 80px top/bottom */
    tablet:  '80px',
    /** Desktop: 96px top/bottom */
    desktop: '96px',
  },

  /** Responsive container horizontal padding (px) */
  container: {
    /** Mobile: 20px */
    mobile:  '20px',
    /** Tablet: 32px */
    tablet:  '32px',
    /** Desktop: 48px */
    desktop: '48px',
    /** Wide: 64px */
    wide:    '64px',
  },

  /** Max width constraints */
  maxWidth: {
    /** Content max width */
    content:    '720px',
    /** Prose text max width */
    prose:      '65ch',
    /** Standard container */
    container:  '1280px',
    /** Wide container */
    wide:       '1440px',
    /** Full width */
    full:       '100%',
  },

  /** Card / component internal padding */
  card: {
    /** Mobile card padding */
    mobile:  '20px',
    /** Desktop card padding */
    desktop: '32px',
  },

  /** Grid and flex gap tokens */
  gap: {
    /** 16px — tight grid gap */
    tight:   '16px',
    /** 24px — standard gap */
    normal:  '24px',
    /** 32px — comfortable gap */
    relaxed: '32px',
    /** 48px — loose gap */
    loose:   '48px',
  },

  /** Touch target minimum */
  touchTarget: '44px',
} as const;

// ---------------------------------------------------------------------------
// Type helpers
// ---------------------------------------------------------------------------

export type SpacingToken          = typeof spacing;
export type SpacingScale          = Exclude<keyof SpacingToken, 'section' | 'container' | 'maxWidth' | 'card' | 'gap' | 'touchTarget'>;
export type SpacingSectionToken   = typeof spacing['section'];
export type SpacingContainerToken = typeof spacing['container'];
export type SpacingGapToken       = typeof spacing['gap'];
