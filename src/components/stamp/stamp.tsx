import type { MouseEvent, ReactNode } from 'react';
import { useBlobPaths } from '../../hooks/use-blob-paths';
import { color, colors, withAlpha } from '../../tokens';
import { cn } from '../../utils/style-helpers';
import styles from './stamp.module.scss';

export type StampVariant =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'review'
  | 'dropped'
  | 'idea'
  | 'muted'
  | 'faint';

export interface StampProps {
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: StampVariant;
  dot?: boolean;
  /** Leading icon (e.g. a Git/Run/Stop glyph). Rendered before the label, after any dot. */
  icon?: ReactNode;
  fillColor?: string;
  textColor?: string;
  wobble?: number;
  surface?: 'paper' | 'chalkboard';
  /**
   * Draws the pencil ring around the blob. Defaults to on for the five
   * original variants (`neutral`, `info`, `success`, `warning`, `error`)
   * and off for the rest; set explicitly to override either default.
   */
  ring?: boolean;
  /**
   * Render as a `<button>` and fire this handler on click. The stamp's look is
   * kept; a hover lift and focus ring are added.
   */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Pressed-state visual for the chip-toggle case. Only has effect when
   * `onClick` is also set (without a click handler, "pressed" is meaningless).
   */
  pressed?: boolean;
  /** Disables the pressable stamp, taking it out of the tab order. */
  disabled?: boolean;
  /** Tooltip / a11y label when `icon` is the only content. */
  ariaLabel?: string;
  className?: string;
}

const RING_BY_DEFAULT: ReadonlySet<StampVariant> = new Set([
  'neutral',
  'info',
  'success',
  'warning',
  'error',
]);

const FAINT_INK = 'rgba(0, 0, 0, 0.06)';
const FAINT_INK_RING = 'rgba(0, 0, 0, 0.18)';
const REVIEW_FILL = 'rgba(155, 122, 181, 0.25)';
const REVIEW_TEXT = '#7B5E9E';
const MUTED_FILL = 'rgba(168, 155, 168, 0.25)';
const MUTED_TEXT = '#6E5E6E';
const DROPPED_FILL = 'rgba(201, 139, 139, 0.25)';
const DROPPED_TEXT = '#6E3A3A';

const variantColors: Record<StampVariant, { fill: string; text?: string; ring: string }> = {
  neutral: {
    fill: withAlpha(colors.accentSlate, 0.25),
    text: color.accentSlateDark,
    ring: withAlpha(colors.accentSlateDark, 0.35),
  },
  info: {
    fill: withAlpha(colors.accentBlue, 0.14),
    text: color.accentBlueDark,
    ring: withAlpha(colors.accentBlueDark, 0.35),
  },
  success: {
    fill: withAlpha(colors.accentGreen, 0.25),
    text: color.accentGreenDark,
    ring: withAlpha(colors.accentGreenDark, 0.35),
  },
  warning: {
    fill: withAlpha(colors.accentAmber, 0.25),
    text: color.accentAmberDark,
    ring: withAlpha(colors.accentAmberDark, 0.4),
  },
  error: {
    fill: withAlpha(colors.accentRose, 0.16),
    text: color.accentRoseDark,
    ring: withAlpha(colors.accentRoseDark, 0.35),
  },
  review: {
    fill: REVIEW_FILL,
    text: REVIEW_TEXT,
    ring: withAlpha(colors.accentPurpleDark, 0.35),
  },
  dropped: {
    fill: DROPPED_FILL,
    text: DROPPED_TEXT,
    ring: withAlpha(colors.accentRoseDark, 0.45),
  },
  idea: {
    fill: withAlpha(colors.accentSlate, 0.25),
    text: color.accentSlateDark,
    ring: withAlpha(colors.accentSlateDark, 0.35),
  },
  muted: {
    fill: MUTED_FILL,
    text: MUTED_TEXT,
    ring: withAlpha(colors.textTertiary, 0.35),
  },
  faint: {
    fill: FAINT_INK,
    ring: FAINT_INK_RING,
  },
};

// On chalkboard, paper-tinted accent fills read as muddy, so each variant
// collapses to the chalk pass / fail / running plates instead — opaque
// fills, not washes, matching paper-camp. The ring is a stroke of the
// same plate colour.
const chalkboardFill: Record<StampVariant, { fill: string; text: string; ring: string }> = {
  neutral: {
    fill: color.chalkRunning,
    text: color.chalkRunningText,
    ring: withAlpha(color.chalkRunning, 0.6),
  },
  info: {
    fill: color.chalkRunning,
    text: color.chalkRunningText,
    ring: withAlpha(color.chalkRunning, 0.6),
  },
  success: {
    fill: color.chalkPass,
    text: color.chalkPassText,
    ring: withAlpha(color.chalkPass, 0.6),
  },
  warning: {
    fill: color.chalkRunning,
    text: color.chalkRunningText,
    ring: withAlpha(color.chalkRunning, 0.6),
  },
  error: {
    fill: color.chalkFail,
    text: color.chalkFailText,
    ring: withAlpha(color.chalkFail, 0.6),
  },
  review: {
    fill: color.chalkRunning,
    text: color.chalkRunningText,
    ring: withAlpha(color.chalkRunning, 0.6),
  },
  dropped: {
    fill: color.chalkFail,
    text: color.chalkFailText,
    ring: withAlpha(color.chalkFail, 0.6),
  },
  idea: {
    fill: color.chalkRunning,
    text: color.chalkRunningText,
    ring: withAlpha(color.chalkRunning, 0.6),
  },
  muted: {
    fill: color.chalkRunning,
    text: color.chalkRunningText,
    ring: withAlpha(color.chalkRunning, 0.6),
  },
  faint: {
    fill: color.chalkRunning,
    text: color.chalkRunningText,
    ring: withAlpha(color.chalkRunning, 0.3),
  },
};

export function Stamp({
  children,
  size = 'medium',
  variant,
  dot = false,
  icon,
  fillColor,
  textColor,
  wobble = 0.3,
  surface = 'paper',
  ring,
  onClick,
  pressed = false,
  disabled = false,
  ariaLabel,
  className,
}: StampProps) {
  const paths = useBlobPaths(wobble);
  const isChalkboard = surface === 'chalkboard';
  const resolvedRing = ring ?? (variant ? RING_BY_DEFAULT.has(variant) : false);
  const ringColor =
    variant && resolvedRing
      ? isChalkboard
        ? chalkboardFill[variant].ring
        : variantColors[variant].ring
      : undefined;
  const resolvedFill =
    fillColor ??
    (variant
      ? isChalkboard
        ? chalkboardFill[variant].fill
        : variantColors[variant].fill
      : 'transparent');
  const resolvedText =
    textColor ??
    (variant
      ? isChalkboard
        ? chalkboardFill[variant].text
        : variantColors[variant].text
      : undefined);

  const isPressable = !!onClick;
  const isPressed = isPressable && pressed;

  const sharedClassName = cn(
    styles.stamp,
    styles[size],
    isChalkboard && styles.chalkboard,
    isPressable && styles.pressable,
    isPressed && styles.pressed,
    className,
  );

  const inner = (
    <>
      <svg
        className={styles.blobBg}
        viewBox="-10 -10 120 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={paths.blob} className={styles.blobFill} style={{ fill: resolvedFill }} />
        {ringColor && (
          <path d={paths.ring} className={styles.blobRing} style={{ stroke: ringColor }} />
        )}
      </svg>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{children}</span>
    </>
  );

  if (isPressable) {
    return (
      <button
        type="button"
        aria-pressed={pressed}
        aria-label={ariaLabel}
        className={sharedClassName}
        style={resolvedText ? { color: resolvedText } : undefined}
        onClick={onClick}
        disabled={disabled}
      >
        {inner}
      </button>
    );
  }

  return (
    <span className={sharedClassName} style={resolvedText ? { color: resolvedText } : undefined}>
      {inner}
    </span>
  );
}
