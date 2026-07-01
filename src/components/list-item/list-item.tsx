import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useRectBlobPaths } from '../../hooks/use-rect-blob-paths';
import { cn } from '../../utils/style-helpers';
import styles from './list-item.module.scss';

export interface ListItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: ReactNode;
  action?: ReactNode;
  size?: 'small' | 'medium';
  wobble?: number;
  surface?: 'paper' | 'chalkboard';
}

export function ListItem({
  active = false,
  icon,
  action,
  size = 'medium',
  wobble = 0.5,
  surface = 'paper',
  children,
  className,
  ...props
}: ListItemProps) {
  const paths = useRectBlobPaths(wobble);
  const isClickable = !!props.onClick;

  return (
    <button
      type="button"
      className={cn(
        styles.listItem,
        styles[size],
        isClickable && styles.clickable,
        !isClickable && !active && styles.static,
        active && styles.active,
        surface === 'chalkboard' && styles.chalkboard,
        className,
      )}
      aria-current={active ? 'page' : undefined}
      {...props}
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
    </button>
  );
}
