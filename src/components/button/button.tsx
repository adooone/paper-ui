import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { useBlobPaths } from '../../hooks/use-blob-paths';
import styles from './button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'chalkboard';
  size?: 'small' | 'medium' | 'large';
  icon?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  wobble?: number;
  isActive?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  icon,
  iconRight,
  fullWidth = false,
  wobble = 0.5,
  isActive = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const paths = useBlobPaths(wobble);

  return (
    <button
      type="button"
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        variant === 'chalkboard' && styles.chalkboard,
        isActive && styles.isActive,
        fullWidth && styles.fullWidth,
        className,
      )}
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
      {icon && <span className={styles.iconLeft}>{icon}</span>}
      <span className={styles.label}>{children}</span>
      {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
    </button>
  );
}
