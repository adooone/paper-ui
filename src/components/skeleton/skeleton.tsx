import type { CSSProperties } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './skeleton.module.scss';

export interface SkeletonProps {
  variant?: 'text' | 'rect' | 'circle';
  width?: number | string;
  height?: number | string;
  surface?: 'paper' | 'chalkboard';
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  surface = 'paper',
  className,
  style,
}: SkeletonProps) {
  return (
    <span
      className={cn(
        styles.skeleton,
        styles[variant],
        surface === 'chalkboard' && styles.chalkboard,
        className,
      )}
      style={{ width, height, ...style }}
      aria-hidden="true"
    />
  );
}
