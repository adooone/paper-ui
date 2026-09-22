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
   * Render as a `<button>` and fire this handler on click. The stamp's look is
   * kept; a hover lift and focus ring are added.
   */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Pressed-state visual for the chip-toggle case. Only has effect when
   * `onClick` is also set (without a click handler, "pressed" is meaningless).
   */
  pressed?: boolean;
  /** Tooltip / a11y label when `icon` is the only content. */
  ariaLabel?: string;
  className?: string;
}

const FAINT_INK = 'rgba(0, 0, 0, 0.06)';
const FAINT_INK_RING = 'rgba(0, 0, 0, 0.18)';

const variantColors: Record<StampVariant, { fill: string; text: string; ring: string }> = {
  neutral: {
    fill: withAlpha(colors.accentSlate, 0.14),
    text: color.accentSlateDark,
    ring: withAlpha(colors.accentSlateDark, 0.35),
  },
  info: {
    fill: withAlpha(colors.accentBlue, 0.14),
    text: color.accentBlueDark,
    ring: withAlpha(colors.accentBlueDark, 0.35),
  },
  success: {
    fill: withAlpha(colors.accentGreen, 0.16),
    text: color.accentGreenDark,
    ring: withAlpha(colors.accentGreenDark, 0.35),
  },
  warning: {
    fill: withAlpha(colors.accentAmber, 0.16),
    text: color.accentAmberDark,
    ring: withAlpha(colors.accentAmberDark, 0.4),
  },
  error: {
    fill: withAlpha(colors.accentRose, 0.16),
    text: color.accentRoseDark,
    ring: withAlpha(colors.accentRoseDark, 0.35),
  },
  review: {
    fill: withAlpha(colors.accentPurple, 0.16),
    text: color.accentPurpleDark,
    ring: withAlpha(colors.accentPurpleDark, 0.35),
  },
  dropped: {
    fill: withAlpha(colors.accentRose, 0.2),
    text: color.accentRoseDark,
    ring: withAlpha(colors.accentRoseDark, 0.45),
  },
  idea: {
    fill: withAlpha(colors.accentSlate, 0.14),
    text: color.accentSlateDark,
    ring: withAlpha(colors.accentSlateDark, 0.35),
  },
  muted: {
    fill: withAlpha(colors.textTertiary, 0.1),
    text: colors.textSecondary,
    ring: withAlpha(colors.textTertiary, 0.35),
  },
  faint: {
    fill: FAINT_INK,
    text: colors.textSecondary,
    ring: FAINT_INK_RING,
  },
};

// On chalkboard, paper-tinted accent fills read as muddy, so each variant
// collapses to the chalk pass / fail / running set instead. Text colour comes
// from the .chalkboard class; the ring matches the chalk fill.
const chalkboardFill: Record<StampVariant, { fill: string; ring: string }> = {
  neutral: { fill: withAlpha(color.chalkRunning, 0.1), ring: withAlpha(color.chalkRunning, 0.35) },
  info: { fill: withAlpha(color.chalkRunning, 0.1), ring: withAlpha(color.chalkRunning, 0.35) },
  success: { fill: withAlpha(color.chalkPass, 0.16), ring: withAlpha(color.chalkPass, 0.45) },
  warning: { fill: withAlpha(color.chalkRunning, 0.1), ring: withAlpha(color.chalkRunning, 0.35) },
  error: { fill: withAlpha(color.chalkFail, 0.16), ring: withAlpha(color.chalkFail, 0.45) },
  review: { fill: withAlpha(color.chalkRunning, 0.1), ring: withAlpha(color.chalkRunning, 0.35) },
  dropped: { fill: withAlpha(color.chalkFail, 0.16), ring: withAlpha(color.chalkFail, 0.45) },
  idea: { fill: withAlpha(color.chalkRunning, 0.1), ring: withAlpha(color.chalkRunning, 0.35) },
  muted: { fill: withAlpha(color.chalkRunning, 0.1), ring: withAlpha(color.chalkRunning, 0.35) },
  faint: { fill: withAlpha(color.chalkRunning, 0.06), ring: withAlpha(color.chalkRunning, 0.25) },
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
  onClick,
  pressed = false,
  ariaLabel,
  className,
}: StampProps) {
  const paths = useBlobPaths(wobble);
  const isChalkboard = surface === 'chalkboard';
  const ringColor = variant
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
    textColor ?? (variant && !isChalkboard ? variantColors[variant].text : undefined);

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
