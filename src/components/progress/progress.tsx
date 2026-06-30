import { cn } from '../../utils/style-helpers';
import styles from './progress.module.scss';

export interface ProgressProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  className?: string;
}

export function Progress({ value, max = 100, color, height = 6, className }: ProgressProps) {
  const pct = max > 0 ? Math.max(0, Math.min(100, Math.round((value / max) * 100))) : 0;

  return (
    <div className={cn(styles.track, className)} style={{ height, borderRadius: height / 2 }}>
      <div
        className={styles.fill}
        style={{
          width: `${pct}%`,
          height,
          borderRadius: height / 2,
          background: color,
        }}
      />
    </div>
  );
}
