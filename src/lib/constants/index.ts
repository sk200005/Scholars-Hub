/**
 * @file index.ts
 * @description Barrel export for all design tokens.
 *
 * Import from this file anywhere in the codebase:
 *
 * @example
 *   import { colors, typography, spacing, radius, shadows, motion } from '@/lib/constants'
 *
 * Or cherry-pick named exports:
 *
 * @example
 *   import { colors } from '@/lib/constants/colors'
 *   import { variants, transitions } from '@/lib/constants/motion'
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radius';
export * from './shadows';
export * from './motion';
