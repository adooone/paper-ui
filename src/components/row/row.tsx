import type { CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './row.module.scss';

export interface RowColumns {
  /** Width of the `id` slot (mono identifier). */
  id?: string;
  /** Width of the `title` slot — the main, truncating label. */
  title?: string;
  /** Width of the `meta` slot (a `MetaLine`). */
  meta?: string;
  /** Width of the `trailing` slot (stamps, actions). */
  trailing?: string;
}

export type RowSurface = 'none' | 'card' | 'nestedCard';

export interface RowProps {
  /** Mono identifier at the row's left edge (e.g. a record id). */
  id?: ReactNode;
  /** Main label — truncates with an ellipsis when the cell narrows. */
  title?: ReactNode;
  /** A `MetaLine` describing the row beneath its title. */
  meta?: ReactNode;
  /** Stamps and actions, right-aligned. */
  trailing?: ReactNode;
  /**
   * Grid-template-columns widths for the four slots, in the order `id title meta trailing`.
   * Any omitted slot is sized by its content. Pass `auto`, `minmax(...)`, fractional
   * units (`1fr`) or fixed widths (`120px`). Under 640px the template collapses to a
   * single column with `title` on top — see `.module.scss`.
   */
  columns?: RowColumns;
  /** Row surface. `none` is a ruled cell (the Divider between rows draws the line),
   *  `card` and `nestedCard` give the row its own paper surface. */
  surface?: RowSurface;
  /** Make the whole row one hit target. Adds role/tabIndex/keyboard activation. */
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  /** Tooltip / a11y label for the row when used as a single hit target. */
  ariaLabel?: string;
  /** Draw the amber outline paper-camp uses to mark a deep-linked row. */
  highlighted?: boolean;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_COLUMNS: Required<RowColumns> = {
  id: 'auto',
  title: '1fr',
  meta: 'auto',
  trailing: 'auto',
};

export function Row({
  id,
  title,
  meta,
  trailing,
  columns,
  surface = 'none',
  onClick,
  ariaLabel,
  highlighted = false,
  className,
  style,
}: RowProps) {
  const merged: Required<RowColumns> = { ...DEFAULT_COLUMNS, ...columns };
  const template = `${merged.id} ${merged.title} ${merged.meta} ${merged.trailing}`;
  const isClickable = !!onClick;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(event as unknown as MouseEvent<HTMLDivElement>);
    }
  };

  const surfaceClass =
    surface === 'card'
      ? styles.surfaceCard
      : surface === 'nestedCard'
        ? styles.surfaceNestedCard
        : styles.surfaceNone;

  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? ariaLabel : undefined}
      onClick={onClick}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      style={{ ...style, '--row-columns': template } as CSSProperties}
      className={cn(
        styles.row,
        surfaceClass,
        isClickable && styles.clickable,
        !isClickable && styles.static,
        highlighted && styles.highlighted,
        className,
      )}
    >
      {id != null && <div className={styles.id}>{id}</div>}
      {title != null && <div className={styles.title}>{title}</div>}
      {meta != null && <div className={styles.meta}>{meta}</div>}
      {trailing != null && <div className={styles.trailing}>{trailing}</div>}
    </div>
  );
}
