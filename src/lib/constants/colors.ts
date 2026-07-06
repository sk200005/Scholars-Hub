/**
 * @file colors.ts
 * @description Single source of truth for all color tokens.
 *
 * Rules (from DESIGN_SYSTEM.md):
 *  - Never invent new colors.
 *  - Never hardcode hex values inside components.
 *  - Always use theme tokens.
 *  - Use semantic colors only.
 *
 * Usage:
 *  import { colors } from '@/lib/constants/colors'
 *  colors.primary.DEFAULT  → '#16A34A'
 */

// ---------------------------------------------------------------------------
// Primitive palette  (raw brand values — do NOT use directly in components)
// ---------------------------------------------------------------------------

const primitive = {
  /** Brand green */
  green: {
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },
  /** Accent lime */
  lime: {
    400: '#84CC16',
    500: '#65A30D',
  },
  /** Highlight amber */
  amber: {
    400: '#FACC15',
    500: '#EAB308',
  },
  /** Neutrals */
  neutral: {
    0:   '#FFFFFF',
    50:  '#F8FAFC',
    100: '#F1F5F9',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    700: '#374151',
    900: '#111827',
  },
  /** Status red */
  red: {
    100: '#FEE2E2',
    500: '#EF4444',
    700: '#B91C1C',
  },
  /** Status green (success — distinct from brand green) */
  emerald: {
    100: '#D1FAE5',
    500: '#10B981',
    700: '#047857',
  },
  /** Status amber (warning — distinct from highlight) */
  yellow: {
    100: '#FEF9C3',
    500: '#F59E0B',
    700: '#B45309',
  },
} as const;

// ---------------------------------------------------------------------------
// Semantic tokens  (these are what components MUST use)
// ---------------------------------------------------------------------------

export const colors = {
  // ── Brand ──────────────────────────────────────────────────────────────

  primary: {
    DEFAULT: primitive.green[600],
    hover:   primitive.green[700],
    active:  primitive.green[800],
    dark:    primitive.green[900],
  },

  accent: {
    DEFAULT: primitive.lime[400],
    hover:   primitive.lime[500],
  },

  highlight: {
    DEFAULT: primitive.amber[400],
    hover:   primitive.amber[500],
  },

  // ── Surfaces ───────────────────────────────────────────────────────────

  background: {
    DEFAULT: primitive.neutral[0],
    subtle:  primitive.neutral[50],
    muted:   primitive.neutral[100],
  },

  surface: {
    DEFAULT:  primitive.neutral[50],
    elevated: primitive.neutral[0],
    overlay:  'rgba(255, 255, 255, 0.85)',
  },

  // ── Foreground / text ──────────────────────────────────────────────────

  foreground: {
    DEFAULT:  primitive.neutral[900],
    secondary: primitive.neutral[700],
    muted:    primitive.neutral[500],
    disabled: primitive.neutral[400],
    inverse:  primitive.neutral[0],
  },

  // ── Borders ────────────────────────────────────────────────────────────

  border: {
    DEFAULT: primitive.neutral[200],
    strong:  primitive.neutral[300],
    focus:   primitive.green[600],
  },

  // ── Status ─────────────────────────────────────────────────────────────

  success: {
    bg:     primitive.emerald[100],
    DEFAULT: primitive.emerald[500],
    text:   primitive.emerald[700],
  },

  warning: {
    bg:     primitive.yellow[100],
    DEFAULT: primitive.yellow[500],
    text:   primitive.yellow[700],
  },

  error: {
    bg:     primitive.red[100],
    DEFAULT: primitive.red[500],
    text:   primitive.red[700],
  },

  // ── Overlays ───────────────────────────────────────────────────────────

  overlay: {
    light:  'rgba(255, 255, 255, 0.6)',
    medium: 'rgba(0, 0, 0, 0.4)',
    heavy:  'rgba(0, 0, 0, 0.7)',
    scrim:  'rgba(0, 0, 0, 0.5)',
  },

  // ── Transparent ────────────────────────────────────────────────────────

  transparent: 'transparent',
} as const;

// ---------------------------------------------------------------------------
// Type helpers
// ---------------------------------------------------------------------------

export type ColorToken = typeof colors;
export type PrimaryColor = typeof colors['primary'];
export type ForegroundColor = typeof colors['foreground'];
