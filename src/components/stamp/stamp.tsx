import type { FC, ReactNode } from 'react';
import { useBlobPaths } from '../../hooks/use-blob-paths';
import { colors, withAlpha } from '../../tokens';
import { cn } from '../../utils/style-helpers';
import styles from './stamp.module.scss';

export type StampVariant = 'neutral' | 'info' | 'success' | 'warning' | 'error';

export interface StampProps {
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: StampVariant;
  dot?: boolean;
  fillColor?: string;
  textColor?: string;
  wobble?: number;
  surface?: 'paper' | 'chalkboard';
  className?: string;
}

const variantColors: Record<StampVariant, { fill: string; text: string; ring: string }> = {
  neutral: {
    fill: withAlpha(colors.accentSlate, 0.14),
    text: colors.accentSlateDark,
    ring: withAlpha(colors.accentSlateDark, 0.35),
  },
  info: {
    fill: withAlpha(colors.accentBlue, 0.14),
    text: colors.accentBlueDark,
    ring: withAlpha(colors.accentBlueDark, 0.35),
  },
  success: {
    fill: withAlpha(colors.accentGreen, 0.16),
    text: colors.accentGreenDark,
    ring: withAlpha(colors.accentGreenDark, 0.35),
  },
  warning: {
    fill: withAlpha(colors.accentAmber, 0.16),
    text: colors.accentAmberDark,
    ring: withAlpha(colors.accentAmberDark, 0.4),
  },
  error: {
    fill: withAlpha(colors.accentRose, 0.16),
    text: colors.accentRoseDark,
    ring: withAlpha(colors.accentRoseDark, 0.35),
  },
};

// On chalkboard, per-variant paper-tinted colors read as muddy/low-contrast
// against the dark background, so every variant collapses to one quiet
// chalk-toned look instead (text color comes from the .chalkboard class).
const chalkboardVariantColor = {
  fill: withAlpha(colors.chalkboardBorderBase, 0.1),
  ring: withAlpha(colors.chalkboardBorderBase, 0.35),
};

export function Stamp({
  children,
  size = 'medium',
  variant,
  dot = false,
  fillColor,
  textColor,
  wobble = 0.3,
  surface = 'paper',
  className,
}: StampProps) {
  const paths = useBlobPaths(wobble);
  const isChalkboard = surface === 'chalkboard';
  const ringColor = variant
    ? isChalkboard
      ? chalkboardVariantColor.ring
      : variantColors[variant].ring
    : undefined;
  const resolvedFill =
    fillColor ??
    (variant
      ? isChalkboard
        ? chalkboardVariantColor.fill
        : variantColors[variant].fill
      : 'transparent');
  const resolvedText =
    textColor ?? (variant && !isChalkboard ? variantColors[variant].text : undefined);

  return (
    <span
      className={cn(styles.stamp, styles[size], isChalkboard && styles.chalkboard, className)}
      style={resolvedText ? { color: resolvedText } : undefined}
    >
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
      <span className={styles.label}>{children}</span>
    </span>
  );
}
