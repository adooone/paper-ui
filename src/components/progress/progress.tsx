import { useMemo } from 'react';
import { useStableSeed } from '../../hooks/use-stable-seed';
import { colors, withAlpha } from '../../tokens';
import { roughGenerator } from '../../utils/rough';
import { cn } from '../../utils/style-helpers';
import styles from './progress.module.scss';

export interface ProgressProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  surface?: 'paper' | 'chalkboard';
  /** Hachured track instead of a solid fill, drawn by the same generator. */
  sketch?: boolean;
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
  sketch = false,
  className,
}: ProgressProps) {
  const pct = max > 0 ? Math.max(0, Math.min(100, Math.round((value / max) * 100))) : 0;
  const isChalkboard = surface === 'chalkboard';
  const seed = Math.max(1, Math.round(useStableSeed() * 1_000_000));

  const trackColor = isChalkboard
    ? withAlpha(colors.chalkboardBorderBase, 0.16)
    : withAlpha(colors.textPrimary, 0.12);
  const fillColor = color ?? (isChalkboard ? colors.chalkboardChalk : colors.textSecondary);

  const trackPaths = useMemo(
    () =>
      roughGenerator.toPaths(
        roughGenerator.rectangle(MARGIN, MARGIN, VIEW_W - MARGIN * 2, height - MARGIN * 2, {
          seed,
          roughness: sketch ? 1.2 : 2.2,
          fill: trackColor,
          fillStyle: sketch ? 'hachure' : 'solid',
          hachureGap: sketch ? 2.5 : undefined,
          stroke: trackColor,
          strokeWidth: sketch ? 1 : 1.5,
        }),
      ),
    [seed, trackColor, height, sketch],
  );

  const fillWidth = Math.max((pct / 100) * (VIEW_W - MARGIN * 2), 0);
  const fillPaths = useMemo(
    () =>
      fillWidth > 0
        ? roughGenerator.toPaths(
            roughGenerator.rectangle(MARGIN, MARGIN, fillWidth, height - MARGIN * 2, {
              seed: seed + 1,
              roughness: sketch ? 1.2 : 2,
              fill: fillColor,
              fillStyle: 'solid',
              stroke: fillColor,
              strokeWidth: 1,
            }),
          )
        : [],
    [seed, fillColor, fillWidth, height, sketch],
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
