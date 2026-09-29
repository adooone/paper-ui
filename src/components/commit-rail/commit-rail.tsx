import { useMemo } from 'react';
import { useStableSeed } from '../../hooks/use-stable-seed';
import { color } from '../../tokens';
import { roughGenerator } from '../../utils/rough';
import { cn } from '../../utils/style-helpers';

export interface CommitRailProps {
  pushed: boolean;
  isFirst: boolean;
  isLast: boolean;
  className?: string;
}

const RAIL_WIDTH = 20;
const DOT_RADIUS = 5;
const DASH: [number, number] = [3, 3];
const DOT_BOX = 14;
const LINE_VIEW_HEIGHT = 40;

interface RailLineProps {
  pushed: boolean;
  className: string;
}

// A plain stroke, not a rough one: per-row segments drawn with bowing never meet at the
// same x, so the rail read as a chain of kinks. Only the dots keep the hand-drawn look.
const RailLine = ({ pushed, className }: RailLineProps) => (
  <svg
    viewBox={`0 0 ${RAIL_WIDTH} ${LINE_VIEW_HEIGHT}`}
    preserveAspectRatio="none"
    aria-hidden="true"
    className={`absolute left-0 w-full ${className}`}
  >
    <line
      x1={RAIL_WIDTH / 2}
      y1={0}
      x2={RAIL_WIDTH / 2}
      y2={LINE_VIEW_HEIGHT}
      stroke={pushed ? color.textSecondary : color.accentAmberDark}
      strokeWidth={1.5}
      strokeDasharray={pushed ? undefined : DASH.join(' ')}
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export const CommitRail = ({ pushed, isFirst, isLast, className }: CommitRailProps) => {
  const seed = Math.max(1, Math.round(useStableSeed() * 1_000_000));
  const stroke = pushed ? color.textSecondary : color.accentAmberDark;
  const dot = useMemo(
    () =>
      roughGenerator.toPaths(
        roughGenerator.circle(DOT_BOX / 2, DOT_BOX / 2, DOT_RADIUS * 2, {
          seed: seed + 2,
          roughness: 0.8,
          stroke,
          strokeWidth: 1.5,
          ...(pushed ? { fill: stroke, fillStyle: 'solid' } : {}),
        }),
      ),
    [pushed, seed, stroke],
  );

  return (
    <div className={cn('relative w-5 shrink-0 self-stretch', className)}>
      {!isFirst && <RailLine pushed={pushed} className="top-0 h-[calc(50%-8px)]" />}
      {!isLast && <RailLine pushed={pushed} className="bottom-0 h-[calc(50%-8px)]" />}
      <svg
        viewBox={`0 0 ${DOT_BOX} ${DOT_BOX}`}
        width={DOT_BOX}
        height={DOT_BOX}
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {dot.map((path) => (
          <path
            key={path.d}
            d={path.d}
            stroke={path.stroke}
            strokeWidth={path.strokeWidth}
            fill={path.fill ?? 'none'}
          />
        ))}
      </svg>
    </div>
  );
};
