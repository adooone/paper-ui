import type { ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './island.module.scss';

export interface IslandProps {
  children: ReactNode;
  surface?: 'paper' | 'chalkboard';
  /** Accessible name for the landmark. When omitted, the island is a plain container, not a labelled region. */
  label?: string;
  className?: string;
}

export function Island({ children, surface = 'paper', label, className }: IslandProps) {
  return (
    <section
      className={cn(styles.island, surface === 'chalkboard' && styles.chalkboard, className)}
      aria-label={label}
    >
      {children}
    </section>
  );
}
