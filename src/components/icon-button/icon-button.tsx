import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useBlobPaths } from '../../hooks/use-blob-paths';
import { cn } from '../../utils/style-helpers';
import styles from './icon-button.module.scss';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: 'default' | 'ghost' | 'danger';
  surface?: 'paper' | 'chalkboard';
  size?: 'small' | 'medium' | 'large';
  label?: string;
  wobble?: number;
  isActive?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    icon,
    variant = 'default',
    surface = 'paper',
    size = 'medium',
    label,
    wobble = 0.5,
    isActive = false,
    className,
    ...props
  },
  ref,
) {
  const paths = useBlobPaths(wobble);

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        styles.iconButton,
        styles[variant],
        surface === 'chalkboard' && styles.chalkboard,
        styles[size],
        isActive && styles.isActive,
        className,
      )}
      aria-label={label}
      title={label}
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
      <span className={styles.icon}>{icon}</span>
    </button>
  );
});
