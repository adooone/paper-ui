import { useId } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './spinner.module.scss';

export interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  label?: string;
  surface?: 'paper' | 'chalkboard';
  className?: string;
}

const sizeMap = { small: 18, medium: 28, large: 40 };

export function Spinner({
  size = 'medium',
  color,
  label = 'Loading',
  surface = 'paper',
  className,
}: SpinnerProps) {
  const px = sizeMap[size];
  const gradId = `spinner-${useId().replace(/:/g, '')}`;

  return (
    <span
      className={cn(styles.spinner, surface === 'chalkboard' && styles.chalkboard, className)}
      role="status"
      aria-label={label}
    >
      <svg
        width={px}
        height={px}
        viewBox="0 0 50 50"
        className={styles.svg}
        style={color ? { color } : undefined}
        aria-hidden="true"
      >
        <defs>
          {/* ink brush stroke — fades from faint to solid, tintable via `color` */}
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle className={styles.track} cx="25" cy="25" r="20" fill="none" strokeWidth="6" />
        <circle
          className={styles.head}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          stroke={`url(#${gradId})`}
          pathLength="100"
        />
      </svg>
    </span>
  );
}
