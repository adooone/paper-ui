import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { useRectBlobPaths } from '../../hooks/use-rect-blob-paths';
import { cn } from '../../utils/style-helpers';
import styles from './list-item.module.scss';

export interface ListItemProps {
  children: ReactNode;
  active?: boolean;
  icon?: ReactNode;
  action?: ReactNode;
  size?: 'small' | 'medium';
  wobble?: number;
  surface?: 'paper' | 'chalkboard';
  /**
   * Render the row as one hit target. The surface keeps its look but gains
   * `role="button"`, Enter/Space activation and a focus ring; nested buttons
   * (e.g. an `action` slot containing a `<Stamp onClick=...>`) stay valid.
   */
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  /** Tooltip / a11y label for the row when used as a single hit target. */
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
}

export function ListItem({
  active = false,
  icon,
  action,
  size = 'medium',
  wobble = 0.5,
  surface = 'paper',
  onClick,
  ariaLabel,
  disabled = false,
  className,
  children,
}: ListItemProps) {
  const paths = useRectBlobPaths(wobble);
  const isClickable = !!onClick && !disabled;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick || disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(event as unknown as MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-disabled={disabled || undefined}
      aria-current={active ? 'page' : undefined}
      aria-label={isClickable ? ariaLabel : undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      className={cn(
        styles.listItem,
        styles[size],
        isClickable && styles.clickable,
        !isClickable && !active && styles.static,
        active && styles.active,
        disabled && styles.disabled,
        surface === 'chalkboard' && styles.chalkboard,
        className,
      )}
    >
      <svg
        className={styles.blobBg}
        viewBox="-10 -10 120 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={paths.blob} className={styles.blobFill} />
        <path d={paths.ring} className={styles.blobRing} />
      </svg>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{children}</span>
      {action && <span className={styles.action}>{action}</span>}
    </div>
  );
}
