import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { useStableSeed } from '../../hooks/use-stable-seed';
import { roughGenerator } from '../../utils/rough';
import { cn } from '../../utils/style-helpers';
import styles from './skeleton.module.scss';

export interface SkeletonProps {
  variant?: 'text' | 'rect' | 'circle';
  width?: number | string;
  height?: number | string;
  surface?: 'paper' | 'chalkboard';
  className?: string;
  style?: CSSProperties;
}

const VARIANT_VIEWBOX = {
  text: [0, 0, 200, 24] as const,
  rect: [0, 0, 200, 100] as const,
  circle: [0, 0, 40, 40] as const,
};

const MARGIN = 2;

export function Skeleton({
  variant = 'text',
  width,
  height,
  surface = 'paper',
  className,
  style,
}: SkeletonProps) {
  const isChalkboard = surface === 'chalkboard';
  const seed = Math.max(1, Math.round(useStableSeed() * 1_000_000));
  const fillColor = isChalkboard ? 'rgba(200, 210, 195, 0.16)' : 'rgba(26, 25, 23, 0.09)';

  const paths = useMemo(() => {
    const [, , vw, vh] = VARIANT_VIEWBOX[variant];
    const drawable =
      variant === 'circle'
        ? roughGenerator.ellipse(vw / 2, vh / 2, vw - MARGIN * 2, vh - MARGIN * 2, {
            seed,
            roughness: 1.5,
            fill: fillColor,
            fillStyle: 'solid',
            stroke: fillColor,
            strokeWidth: 1,
          })
        : roughGenerator.rectangle(MARGIN, MARGIN, vw - MARGIN * 2, vh - MARGIN * 2, {
            seed,
            roughness: 1.4,
            fill: fillColor,
            fillStyle: 'solid',
            stroke: fillColor,
            strokeWidth: 1,
          });
    return roughGenerator.toPaths(drawable);
  }, [variant, seed, fillColor]);

  return (
    <span
      className={cn(styles.skeleton, styles[variant], className)}
      style={{ width, height, ...style }}
      aria-hidden="true"
    >
      <svg
        className={styles.svg}
        viewBox={VARIANT_VIEWBOX[variant].join(' ')}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {paths.map((p, i) => (
          <path key={i} d={p.d} stroke={p.stroke} strokeWidth={p.strokeWidth} fill={p.fill} />
        ))}
      </svg>
    </span>
  );
}
