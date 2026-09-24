import type { CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { useRectBlobPaths } from '../../hooks/use-rect-blob-paths';
import { cn } from '../../utils/style-helpers';
import styles from './sidebar-item.module.scss';

export type SidebarItemTone = 'default' | 'danger';

export interface SidebarItemProps {
  /** Label rendered in the row's main cell. Replaced by `busy` when set. */
  children?: ReactNode;
  icon?: ReactNode;
  /** Right-aligned secondary number (2xs, tertiary). */
  count?: ReactNode;
  /** Trailing slot after `count`, right-aligned; e.g. a `Stamp`. */
  action?: ReactNode;
  /** A mono 2xs line rendered under the row. */
  note?: ReactNode;
  /** When set, replaces the label and disables the row. */
  busy?: string;
  tone?: SidebarItemTone;
  /** Marks the current entry: `aria-current="page"` and the active fill. */
  active?: boolean;
  disabled?: boolean;
  /** Make the whole row one hit target. */
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

export function SidebarItem({
  children,
  icon,
  count,
  action,
  note,
  busy,
  tone = 'default',
  active = false,
  disabled = false,
  onClick,
  ariaLabel,
  className,
  style,
}: SidebarItemProps) {
  const isDisabled = disabled || busy != null;
  const isInteractive = !!onClick && !isDisabled;
  const label = busy != null ? busy : children;
  const paths = useRectBlobPaths(0.5);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick || isDisabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(event as unknown as MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <div className={cn(styles.sidebarItem, className)} style={style}>
      <div
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        aria-disabled={isDisabled || undefined}
        aria-current={active ? 'page' : undefined}
        aria-label={ariaLabel}
        onClick={isDisabled ? undefined : onClick}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
        className={cn(
          styles.row,
          isInteractive && styles.clickable,
          !isInteractive && styles.static,
          tone === 'danger' && styles.danger,
          busy != null && styles.busy,
          disabled && styles.disabled,
          active && styles.active,
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
        {icon != null && <span className={styles.icon}>{icon}</span>}
        <span className={styles.label}>{label}</span>
        {count != null && <span className={styles.count}>{count}</span>}
        {action != null && <span className={styles.action}>{action}</span>}
      </div>
      {note != null && <div className={styles.note}>{note}</div>}
    </div>
  );
}
