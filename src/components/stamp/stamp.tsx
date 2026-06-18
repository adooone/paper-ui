import type { FC, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { useBlobPaths } from '../../hooks/use-blob-paths';
import styles from './stamp.module.scss';

export interface StampProps {
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  fillColor?: string;
  textColor?: string;
  wobble?: number;
  variant?: 'default' | 'chalkboard';
  className?: string;
}

export function Stamp({
  children,
  size = 'medium',
  fillColor = 'transparent',
  textColor,
  wobble = 0.3,
  variant = 'default',
  className,
}: StampProps) {
  const paths = useBlobPaths(wobble);

  return (
    <span
      className={cn(styles.stamp, styles[size], variant === 'chalkboard' && styles.chalkboard, className)}
      style={textColor ? { color: textColor } : undefined}
    >
      <svg
        className={styles.blobBg}
        viewBox="-10 -10 120 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={paths.blob}
          className={styles.blobFill}
          style={{ fill: fillColor }}
        />
      </svg>
      <span className={styles.label}>{children}</span>
    </span>
  );
}
