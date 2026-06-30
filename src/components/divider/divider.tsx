import type { ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './divider.module.scss';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: ReactNode;
  surface?: 'paper' | 'chalkboard';
  className?: string;
}

export function Divider({
  orientation = 'horizontal',
  label,
  surface = 'paper',
  className,
}: DividerProps) {
  const chalk = surface === 'chalkboard' && styles.chalkboard;

  if (orientation === 'vertical') {
    return (
      // biome-ignore lint/a11y/useFocusableInteractive: a static decorative separator, not an adjustable splitter, so it is intentionally not focusable.
      <span
        className={cn(styles.vertical, chalk, className)}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  return (
    // biome-ignore lint/a11y/useFocusableInteractive: a static decorative separator, not an adjustable splitter, so it is intentionally not focusable.
    <div className={cn(styles.horizontal, chalk, className)} role="separator">
      <span className={styles.line} />
      {label != null && (
        <>
          <span className={styles.label}>{label}</span>
          <span className={styles.line} />
        </>
      )}
    </div>
  );
}
