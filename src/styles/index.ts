/**
 * Paper UI Shared Styles
 *
 * Reusable Tailwind class arrays for consistent paper-themed styling
 * across applications.
 */

// =============================================================================
// Layout
// =============================================================================

/** Full container with paper texture padding */
export const container = ['w-full h-full p-4 overflow-auto pb-24'] as const;

/** Centered content wrapper with max width */
export const content = ['mx-auto max-w-7xl'] as const;

/** Page title styling */
export const title = ['mb-6 font-display text-3xl font-bold text-ink tracking-wide'] as const;

// =============================================================================
// Paper Surfaces
// =============================================================================

/** Card with paper texture and ink border */
export const paperCard = [
  'rounded-lg bg-paper-100 border border-ink/10 p-6',
  'shadow-paper-md relative overflow-hidden',
  'transition-all duration-300 hover:shadow-paper-lg',
] as const;

/** Card title */
export const paperCardTitle = [
  'mb-3 text-lg font-display font-semibold text-ink uppercase tracking-wide',
] as const;

/** Muted ink text for descriptions */
export const inkText = ['text-ink/80'] as const;

/** Handwritten annotation text */
export const handwritten = ['font-handwritten text-lg text-ink/70'] as const;

// =============================================================================
// Grids
// =============================================================================

/** Stats grid - responsive 1-2-3 columns */
export const statsGrid = ['grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'] as const;

/** Card grid - responsive 1-2 columns */
export const cardGrid = ['grid grid-cols-1 gap-6 lg:grid-cols-2'] as const;

// =============================================================================
// Convenience Exports
// =============================================================================

/** All surface patterns */
export const surfaces = {
  paperCard,
  paperCardTitle,
  inkText,
  handwritten,
} as const;

/** All layout utilities */
export const layout = {
  container,
  content,
  title,
} as const;

/** All grid layouts */
export const grids = {
  statsGrid,
  cardGrid,
} as const;

/** All shared styles combined */
export const sharedStyles = {
  ...surfaces,
  ...layout,
  ...grids,
} as const;

export default sharedStyles;
