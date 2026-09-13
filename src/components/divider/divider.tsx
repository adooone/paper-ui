import type { ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { DividerSketch } from './divider-sketch';
import styles from './divider.module.scss';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: ReactNode;
  surface?: 'paper' | 'chalkboard';
  /**
   * Draw the rule as one hand-drawn rough.js stroke instead of a CSS line, so a
   * divider and a `SketchBorder` card edge look drawn by the same pencil hand.
   * A rule is one pencil line — generated as a single pass (rough.js's doubling
   * disabled) with the `surface` preset's geometry.
   */
  sketch?: boolean;
  className?: string;
}

export function Divider({
  orientation = 'horizontal',
  label,
  surface = 'paper',
  sketch = false,
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

  if (sketch && label == null) {
    return <DividerSketch className={cn(chalk, className)} />;
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
