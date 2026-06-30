import { cn } from '../../utils/style-helpers';
import styles from './spinner.module.scss';

export interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  label?: string;
  className?: string;
}

const sizeMap = { small: 18, medium: 28, large: 40 };

export function Spinner({ size = 'medium', color, label = 'Loading', className }: SpinnerProps) {
  const px = sizeMap[size];

  return (
    <span className={cn(styles.spinner, className)} role="status" aria-label={label}>
      <svg
        width={px}
        height={px}
        viewBox="0 0 50 50"
        className={styles.svg}
        style={color ? { color } : undefined}
        aria-hidden="true"
      >
        <circle className={styles.track} cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
        <circle
          className={styles.head}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          pathLength="100"
        />
      </svg>
    </span>
  );
}
