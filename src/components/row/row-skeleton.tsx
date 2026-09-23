import type { CSSProperties } from 'react';
import { cn } from '../../utils/style-helpers';
import { Skeleton } from '../skeleton';
import type { RowColumns, RowSurface } from './row';
import styles from './row.module.scss';

export interface RowSkeletonProps {
  /** Mirrors `Row.columns` so the skeleton lines up with real rows. */
  columns?: RowColumns;
  /** Mirrors `Row.surface`. `none` (ruled) is the default for ruled lists. */
  surface?: RowSurface;
  /** Which slots to show skeleton bars in. Defaults to all four. */
  slots?: Array<'id' | 'title' | 'meta' | 'trailing'>;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_COLUMNS: Required<RowColumns> = {
  id: 'auto',
  title: '1fr',
  meta: 'auto',
  trailing: 'auto',
};

const DEFAULT_SLOTS: Array<'id' | 'title' | 'meta' | 'trailing'> = [
  'id',
  'title',
  'meta',
  'trailing',
];

export function RowSkeleton({
  columns,
  surface = 'none',
  slots = DEFAULT_SLOTS,
  className,
  style,
}: RowSkeletonProps) {
  const merged: Required<RowColumns> = { ...DEFAULT_COLUMNS, ...columns };
  const template = `${merged.id} ${merged.title} ${merged.meta} ${merged.trailing}`;
  const surfaceClass =
    surface === 'card'
      ? styles.surfaceCard
      : surface === 'nestedCard'
        ? styles.surfaceNestedCard
        : styles.surfaceNone;

  return (
    <div
      aria-hidden="true"
      style={{ ...style, '--row-columns': template } as CSSProperties}
      className={cn(styles.row, styles.skeleton, surfaceClass, className)}
    >
      {slots.includes('id') && <Skeleton variant="text" width="3em" className={styles.id} />}
      {slots.includes('title') && <Skeleton variant="text" width="70%" className={styles.title} />}
      {slots.includes('meta') && <Skeleton variant="text" width="5em" className={styles.meta} />}
      {slots.includes('trailing') && (
        <div className={styles.trailing}>
          <Skeleton variant="text" width="3em" />
        </div>
      )}
    </div>
  );
}
