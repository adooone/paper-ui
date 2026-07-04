import { useMemo } from 'react';
import { useStableSeed } from '../../hooks/use-stable-seed';
import { roughGenerator } from '../../utils/rough';
import { cn } from '../../utils/style-helpers';
import styles from './progress.module.scss';

export interface ProgressProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  surface?: 'paper' | 'chalkboard';
  className?: string;
}

// Width stays an abstract, resolution-independent unit (real width is
// fluid/unknown in JS), but height is drawn at the real pixel value —
// stretching a fixed-height viewBox non-uniformly to fit a much shorter
// bar squashes the vertical jitter until the sketchy edges disappear.
const VIEW_W = 300;
const MARGIN = 1;

export function Progress({
  value,
  max = 100,
  color,
  height = 6,
  surface = 'paper',
  className,
}: ProgressProps) {
  const pct = max > 0 ? Math.max(0, Math.min(100, Math.round((value / max) * 100))) : 0;
  const isChalkboard = surface === 'chalkboard';
  const seed = Math.max(1, Math.round(useStableSeed() * 1_000_000));

  const trackColor = isChalkboard ? 'rgba(200, 210, 195, 0.16)' : 'rgba(26, 25, 23, 0.12)';
  const fillColor = color ?? (isChalkboard ? '#d4e8cb' : '#68635C');

  const trackPaths = useMemo(
    () =>
      roughGenerator.toPaths(
        roughGenerator.rectangle(MARGIN, MARGIN, VIEW_W - MARGIN * 2, height - MARGIN * 2, {
          seed,
          roughness: 2.2,
          fill: trackColor,
          fillStyle: 'solid',
          stroke: trackColor,
          strokeWidth: 1.5,
        }),
      ),
    [seed, trackColor, height],
  );

  const fillWidth = Math.max((pct / 100) * (VIEW_W - MARGIN * 2), 0);
  const fillPaths = useMemo(
    () =>
      fillWidth > 0
        ? roughGenerator.toPaths(
            roughGenerator.rectangle(MARGIN, MARGIN, fillWidth, height - MARGIN * 2, {
              seed: seed + 1,
              roughness: 2,
              fill: fillColor,
              fillStyle: 'solid',
              stroke: fillColor,
              strokeWidth: 1,
            }),
          )
        : [],
    [seed, fillColor, fillWidth, height],
  );

  return (
    <div className={cn(styles.track, className)} style={{ height, borderRadius: height / 2 }}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${VIEW_W} ${height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {trackPaths.map((p, i) => (
          <path key={i} d={p.d} stroke={p.stroke} strokeWidth={p.strokeWidth} fill={p.fill} />
        ))}
        {fillPaths.map((p, i) => (
          <path key={i} d={p.d} stroke={p.stroke} strokeWidth={p.strokeWidth} fill={p.fill} />
        ))}
      </svg>
    </div>
  );
}
