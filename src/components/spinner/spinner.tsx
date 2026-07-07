import { roughGenerator } from '../../utils/rough';
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

const CENTER = 25;
const RADIUS = 18;

// One continuous hand-drawn circle (single stroke so it takes a clean dash),
// computed from a fixed seed at module load: deterministic, SSR-safe, and
// shared across every instance. The track and the travelling head reuse it, so
// the moving arc follows the exact wobbly contour.
const circlePath = roughGenerator
  .toPaths(
    roughGenerator.circle(CENTER, CENTER, RADIUS * 2, {
      seed: 7,
      roughness: 1.15,
      disableMultiStroke: true,
    }),
  )
  .map((p) => p.d)
  .join(' ');

export function Spinner({
  size = 'medium',
  color,
  label = 'Loading',
  surface = 'paper',
  className,
}: SpinnerProps) {
  const px = sizeMap[size];

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
        <path
          className={styles.track}
          d={circlePath}
          fill="none"
          pathLength={100}
          strokeLinecap="round"
        />
        <path
          className={styles.head}
          d={circlePath}
          fill="none"
          pathLength={100}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
