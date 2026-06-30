import type { CSSProperties } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './skeleton.module.scss';

export interface SkeletonProps {
  variant?: 'text' | 'rect' | 'circle';
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({ variant = 'text', width, height, className, style }: SkeletonProps) {
  return (
    <span
      className={cn(styles.skeleton, styles[variant], className)}
      style={{ width, height, ...style }}
      aria-hidden="true"
    />
  );
}
