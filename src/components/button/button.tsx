import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useBlobPaths } from '../../hooks/use-blob-paths';
import { cn } from '../../utils/style-helpers';
import styles from './button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
  surface?: 'paper' | 'chalkboard';
  size?: 'tiny' | 'small' | 'medium' | 'large';
  icon?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  wobble?: number;
  isActive?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    surface = 'paper',
    size = 'medium',
    icon,
    iconRight,
    fullWidth = false,
    wobble = 0.5,
    isActive = false,
    children,
    className,
    ...props
  },
  ref,
) {
  const isLink = variant === 'link';
  const paths = useBlobPaths(isLink ? 0 : wobble);

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        styles.button,
        styles[variant],
        !isLink && styles[size],
        !isLink && surface === 'chalkboard' && styles.chalkboard,
        isActive && styles.isActive,
        fullWidth && styles.fullWidth,
        className,
      )}
      {...props}
    >
      {!isLink && (
        <svg
          className={styles.blobBg}
          viewBox="-10 -10 120 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={paths.blob} className={styles.blobFill} />
          <path d={paths.ring} className={styles.blobRing} />
        </svg>
      )}
      {icon && <span className={styles.iconLeft}>{icon}</span>}
      <span className={styles.label}>{children}</span>
      {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
    </button>
  );
});
