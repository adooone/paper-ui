import type { ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './badge.module.scss';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium';
  dot?: boolean;
  surface?: 'paper' | 'chalkboard';
  className?: string;
}

export function Badge({
  children,
  variant = 'neutral',
  size = 'medium',
  dot = false,
  surface = 'paper',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        styles.badge,
        styles[variant],
        styles[size],
        surface === 'chalkboard' && styles.chalkboard,
        className,
      )}
    >
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
}
