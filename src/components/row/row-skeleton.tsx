import type { CSSProperties } from 'react';
import { cn } from '../../utils/style-helpers';
import { Skeleton } from '../skeleton';
import { resolveRowColumns, rowHideBelowClass } from './row';
import type { RowColumns, RowSurface } from './row';
import styles from './row.module.scss';

export interface RowSkeletonWidths {
  id?: string | number;
  title?: string | number;
  meta?: string | number;
  trailing?: string | number;
}

export interface RowSkeletonProps {
  /** Mirrors `Row.columns` so the skeleton lines up with real rows. */
  columns?: RowColumns;
  /** Mirrors `Row.surface`. `none` (ruled) is the default for ruled lists. */
  surface?: RowSurface;
  /** Which slots to show skeleton bars in. Defaults to all four. */
  slots?: Array<'id' | 'title' | 'meta' | 'trailing'>;
  /** Per-slot skeleton bar widths, so a list of skeleton rows doesn't look uniform. */
  widths?: RowSkeletonWidths;
  /** Number of pill-shaped stamp placeholders to show in `trailing`, instead of a text bar. */
  stamps?: number;
  /** No gap between slots, for dense ruled lists. */
  boxless?: boolean;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_SLOTS: Array<'id' | 'title' | 'meta' | 'trailing'> = [
  'id',
  'title',
  'meta',
  'trailing',
];

const DEFAULT_WIDTHS: Required<RowSkeletonWidths> = {
  id: '3em',
  title: '70%',
  meta: '5em',
  trailing: '3em',
};

export function RowSkeleton({
  columns,
  surface = 'none',
  slots = DEFAULT_SLOTS,
  widths,
  stamps = 0,
  boxless = false,
  className,
  style,
}: RowSkeletonProps) {
  const resolved = resolveRowColumns(columns);
  const template = `${resolved.id.width} ${resolved.title.width} ${resolved.meta.width} ${resolved.trailing.width}`;
  const mergedWidths: Required<RowSkeletonWidths> = { ...DEFAULT_WIDTHS, ...widths };
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
      className={cn(
        styles.row,
        styles.skeleton,
        surfaceClass,
        boxless && styles.boxless,
        className,
      )}
    >
      {slots.includes('id') && (
        <Skeleton
          variant="text"
          width={mergedWidths.id}
          className={cn(styles.id, rowHideBelowClass(resolved.id.hideBelow))}
        />
      )}
      {slots.includes('title') && (
        <Skeleton
          variant="text"
          width={mergedWidths.title}
          className={cn(styles.title, rowHideBelowClass(resolved.title.hideBelow))}
        />
      )}
      {slots.includes('meta') && (
        <Skeleton
          variant="text"
          width={mergedWidths.meta}
          className={cn(styles.meta, rowHideBelowClass(resolved.meta.hideBelow))}
        />
      )}
      {slots.includes('trailing') && (
        <div className={cn(styles.trailing, rowHideBelowClass(resolved.trailing.hideBelow))}>
          {stamps > 0 ? (
            Array.from({ length: stamps }, (_, i) => (
              <Skeleton
                key={i}
                variant="rect"
                width="3.5em"
                height="1.2em"
                className={styles.stampPlaceholder}
              />
            ))
          ) : (
            <Skeleton variant="text" width={mergedWidths.trailing} />
          )}
        </div>
      )}
    </div>
  );
}
