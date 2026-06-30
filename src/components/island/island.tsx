import type { ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './island.module.scss';

export interface IslandProps {
  children: ReactNode;
  variant?: 'default' | 'chalkboard';
  className?: string;
}

export function Island({ children, variant = 'default', className }: IslandProps) {
  return (
    <section
      className={cn(styles.island, variant === 'chalkboard' && styles.chalkboard, className)}
      aria-label="Controls"
    >
      {children}
    </section>
  );
}
