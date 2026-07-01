import type { FC, ReactNode } from 'react';
import { useBlobPaths } from '../../hooks/use-blob-paths';
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
  neutral: { fill: 'rgba(138, 155, 168, 0.14)', text: '#5E7080', ring: 'rgba(94, 112, 128, 0.35)' },
  info: { fill: 'rgba(124, 156, 192, 0.14)', text: '#51719B', ring: 'rgba(81, 113, 155, 0.35)' },
  success: { fill: 'rgba(143, 185, 150, 0.16)', text: '#5E8A66', ring: 'rgba(94, 138, 102, 0.35)' },
  warning: { fill: 'rgba(212, 163, 115, 0.16)', text: '#A67B4F', ring: 'rgba(166, 123, 79, 0.4)' },
  error: { fill: 'rgba(201, 139, 139, 0.16)', text: '#9E5E5E', ring: 'rgba(158, 94, 94, 0.35)' },
};

// On chalkboard, per-variant paper-tinted colors read as muddy/low-contrast
// against the dark background, so every variant collapses to one quiet
// chalk-toned look instead (text color comes from the .chalkboard class).
const chalkboardVariantColor = {
  fill: 'rgba(200, 210, 195, 0.1)',
  ring: 'rgba(200, 210, 195, 0.35)',
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
