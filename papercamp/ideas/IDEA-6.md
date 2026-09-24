---
id: IDEA-6
title: Sketch charts
type: feat
status: idea
created: 2026-09-22
tags:
  - charts
  - rough
subject: Components
order: 4
---

This library already draws with rough.js — `Skeleton`, `Divider` and
`Spinner` share `utils/rough.ts` — but exports no chart, so paper-camp
built four on a copy of the same generator: an arc gauge and a bar chart
for the hub, a stacked bar for the status mix, a progress bar for the
roadmap that competes with this library's own `Progress`, and a commit
rail. They are the sketch data-viz of the system and belong here.

**Four components.** `ArcGauge` (`value`, `max`, `label`, a 280° track
and value arc, `roughness` 1.6, stroke 6), `BarChart` (`bars: [{ label,
value, failed? }]`, solid fill with a hachured failed portion, a fixed
viewBox stretched to width), `StackedBar` (`segments: [{ label, value,
variant }]`), and `CommitRail` (`pushed`, `isFirst`, `isLast`: a straight
stroke, dashed amber when unpushed, and a rough dot, filled when pushed).
Colours come from the exported `color` tokens of [[IDEA-3]]; every
drawing seeds with `useStableSeed`.

**`Progress` gains `sketch`.** A hachured track and a solid fill drawn by
the generator, so the roadmap bar and the capacity bar are one component.

### Out of scope

Axes, legends and tooltips. Animated transitions.

### Source to port

These files are the components, byte for byte as paper-camp draws them today. Port them, do not redesign them: keep every constant (roughness, stroke widths, viewBox sizes, seeds, colours) and only change imports — `roughGenerator` and `useStableSeed` from this library's own utils, colours from the exported `color` tokens — and the file locations.

#### `ArcGauge` — port verbatim

```tsx
import { roughGenerator, useStableSeed } from '@dendelion/paper-ui';
import { color, colors } from '@dendelion/paper-ui/tokens';
import { useMemo } from 'react';

export interface ArcGaugeProps {
  value: number;
  max: number;
  label: string;
  /** Fraction (0-1) of `max` to mark with a tick, e.g. a floor that must not be crossed. */
  floor?: number;
  fillColor?: string;
  size?: number;
  className?: string;
}

// A 280° gauge (the 80° gap sits at the bottom) reads clearly at small sizes
// without the ends of the arc touching.
const START_DEG = -220;
const END_DEG = 40;
const SWEEP = END_DEG - START_DEG;
const STROKE_WIDTH = 6;

function pointOnArc(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = pointOnArc(cx, cy, r, startDeg);
  const end = pointOnArc(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`;
}

export const ArcGauge = ({
  value,
  max,
  label,
  floor,
  fillColor = color.textSecondary,
  size = 96,
  className,
}: ArcGaugeProps) => {
  const seed = Math.max(1, Math.round(useStableSeed() * 1_000_000));
  const pct = max > 0 ? Math.max(0, Math.min(1, value / max)) : 0;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - STROKE_WIDTH;
  const valueDeg = START_DEG + SWEEP * pct;

  const trackPaths = useMemo(
    () =>
      roughGenerator.toPaths(
        roughGenerator.path(arcPath(cx, cy, r, START_DEG, END_DEG), {
          seed,
          roughness: 1.6,
          strokeWidth: STROKE_WIDTH,
          stroke: colors.textTertiary,
        }),
      ),
    [seed, cx, cy, r],
  );

  const fillPaths = useMemo(
    () =>
      pct > 0
        ? roughGenerator.toPaths(
            roughGenerator.path(arcPath(cx, cy, r, START_DEG, valueDeg), {
              seed: seed + 1,
              roughness: 1.6,
              strokeWidth: STROKE_WIDTH,
              stroke: fillColor,
            }),
          )
        : [],
    [seed, cx, cy, r, valueDeg, fillColor, pct],
  );

  const floorPoint =
    floor === undefined
      ? null
      : pointOnArc(cx, cy, r, START_DEG + SWEEP * Math.max(0, Math.min(1, floor)));

  return (
    <div className={className}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
        {trackPaths.map((p) => (
          <path key={p.d} d={p.d} stroke={p.stroke} strokeWidth={p.strokeWidth} fill="none" />
        ))}
        {fillPaths.map((p) => (
          <path
            key={`fill-${p.d}`}
            d={p.d}
            stroke={p.stroke}
            strokeWidth={p.strokeWidth}
            fill="none"
          />
        ))}
        {floorPoint && (
          <circle cx={floorPoint.x} cy={floorPoint.y} r={2.5} fill={color.textPrimary} />
        )}
      </svg>
      <div className="text-center font-handwritten text-sm">
        <div>{Math.round(pct * 100)}%</div>
        <div className="text-xs opacity-70">{label}</div>
      </div>
    </div>
  );
};
```

#### `BarChart` — port verbatim

```tsx
import { roughGenerator, useStableSeed } from '@dendelion/paper-ui';
import { color } from '@dendelion/paper-ui/tokens';
import { useMemo } from 'react';

export interface BarChartBar {
  label: string;
  value: number;
  /** Portion of `value` drawn hatched instead of solid, e.g. failed runs within a total. */
  hatchedValue?: number;
}

export interface BarChartProps {
  bars: BarChartBar[];
  maxValue?: number;
  color?: string;
  hatchedColor?: string;
  height?: number;
  className?: string;
}

// The viewBox is sized near the column's real width, so stretching it to fill the card
// leaves the pencil strokes at roughly their drawn thickness.
const VIEW_WIDTH = 190;
const BAR_GAP_RATIO = 0.32;

export const BarChart = ({
  bars,
  maxValue,
  color: barColor = color.textSecondary,
  hatchedColor = color.accentRose,
  height = 64,
  className,
}: BarChartProps) => {
  const seed = Math.max(1, Math.round(useStableSeed() * 1_000_000));
  const max = maxValue ?? Math.max(1, ...bars.map((b) => b.value));
  const slot = VIEW_WIDTH / Math.max(1, bars.length);
  const barWidth = slot * (1 - BAR_GAP_RATIO);

  const drawnBars = useMemo(
    () =>
      bars.map((bar, i) => {
        const x = i * slot + (slot - barWidth) / 2;
        const total = Math.min(bar.value, max);
        const hatched = Math.min(bar.hatchedValue ?? 0, total);
        const plain = total - hatched;
        const totalHeight = (total / max) * height;
        const hatchedHeight = (hatched / max) * height;
        const plainHeight = totalHeight - hatchedHeight;
        const parts = [];
        if (plain > 0) {
          parts.push(
            ...roughGenerator.toPaths(
              roughGenerator.rectangle(x, height - totalHeight, barWidth, plainHeight, {
                seed: seed + i * 2,
                roughness: 1.1,
                fill: barColor,
                fillStyle: 'solid',
                stroke: barColor,
                strokeWidth: 1,
              }),
            ),
          );
        }
        if (hatched > 0) {
          parts.push(
            ...roughGenerator.toPaths(
              roughGenerator.rectangle(x, height - hatchedHeight, barWidth, hatchedHeight, {
                seed: seed + i * 2 + 1,
                roughness: 1.6,
                fill: hatchedColor,
                fillStyle: 'hachure',
                hachureGap: 3,
                stroke: hatchedColor,
                strokeWidth: 1,
              }),
            ),
          );
        }
        return parts.map((p) => ({ ...p, key: `${bar.label}-${p.d}` }));
      }),
    [bars, max, seed, barColor, hatchedColor, height, slot, barWidth],
  );

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${height}`}
        width="100%"
        height={height}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {drawnBars.flat().map((p) => (
          <path key={p.key} d={p.d} stroke={p.stroke} strokeWidth={p.strokeWidth} fill={p.fill} />
        ))}
      </svg>
      <div className="flex w-full font-handwritten text-2xs opacity-60">
        {bars.map((bar) => (
          <span key={bar.label} className="flex-1 truncate text-center">
            {bar.label}
          </span>
        ))}
      </div>
    </div>
  );
};
```

#### `StackedBar` — port verbatim

```tsx
import { roughGenerator, useStableSeed } from '@dendelion/paper-ui';
import { useMemo } from 'react';

export interface StackedBarSegment {
  label: string;
  value: number;
  color: string;
}

export interface StackedBarProps {
  segments: StackedBarSegment[];
  width?: number;
  height?: number;
  className?: string;
}

export const StackedBar = ({ segments, width = 240, height = 20, className }: StackedBarProps) => {
  const seed = Math.max(1, Math.round(useStableSeed() * 1_000_000));
  const total = Math.max(
    1,
    segments.reduce((sum, segment) => sum + segment.value, 0),
  );

  const paths = useMemo(() => {
    let x = 0;
    return segments.flatMap((segment, i) => {
      const segmentWidth = (segment.value / total) * width;
      if (segmentWidth <= 0) return [];
      const drawn = roughGenerator.toPaths(
        roughGenerator.rectangle(x, 0, segmentWidth, height, {
          seed: seed + i,
          roughness: 1.4,
          fill: segment.color,
          fillStyle: 'solid',
          stroke: segment.color,
          strokeWidth: 1,
        }),
      );
      x += segmentWidth;
      return drawn.map((p) => ({ ...p, key: `${segment.label}-${p.d}` }));
    });
  }, [segments, total, width, height, seed]);

  return (
    <div className={className}>
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden="true">
        {paths.map((p) => (
          <path key={p.key} d={p.d} stroke={p.stroke} strokeWidth={p.strokeWidth} fill={p.fill} />
        ))}
      </svg>
      <div className="flex flex-wrap gap-x-3 gap-y-1 font-handwritten text-xs">
        {segments.map((segment) => (
          <span key={segment.label} className="flex items-center gap-1">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: segment.color }}
              aria-hidden="true"
            />
            {segment.label} {segment.value}
          </span>
        ))}
      </div>
    </div>
  );
};
```

#### `Progress sketch (RoughProgressBar)` — port verbatim

```tsx
import { roughGenerator, useStableSeed } from '@dendelion/paper-ui';
import { color, colors } from '@dendelion/paper-ui/tokens';
import { useMemo } from 'react';

interface RoughProgressBarProps {
  done: number;
  total: number;
  width?: number;
  height?: number;
  className?: string;
}

export const RoughProgressBar = ({
  done,
  total,
  width = 96,
  height = 7,
  className,
}: RoughProgressBarProps) => {
  const seed = Math.max(1, Math.round(useStableSeed() * 1_000_000));
  const fillWidth = total > 0 ? (Math.min(done, total) / total) * width : 0;

  const paths = useMemo(() => {
    const track = roughGenerator.toPaths(
      roughGenerator.rectangle(0, 0, width, height, {
        seed,
        roughness: 1.2,
        fill: colors.textTertiary,
        fillStyle: 'hachure',
        hachureGap: 2.5,
        stroke: colors.textTertiary,
        strokeWidth: 1,
      }),
    );
    if (fillWidth <= 0) return track;
    const fill = roughGenerator.toPaths(
      roughGenerator.rectangle(0, 0, fillWidth, height, {
        seed: seed + 1,
        roughness: 1.2,
        fill: color.accentGreen,
        fillStyle: 'solid',
        stroke: color.accentGreenDark,
        strokeWidth: 1,
      }),
    );
    return [...track, ...fill];
  }, [width, height, seed, fillWidth]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
    >
      {paths.map((p) => (
        <path key={p.d} d={p.d} stroke={p.stroke} strokeWidth={p.strokeWidth} fill={p.fill} />
      ))}
    </svg>
  );
};
```

#### `CommitRail` — port verbatim (the rail part of commit-history.tsx)

```tsx
const RAIL_WIDTH = 20;
const DOT_RADIUS = 5;
const DASH: [number, number] = [3, 3];

function formatRelativeTime(iso: string): string {
  const diffSec = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (diffSec < 60) return 'just now';
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return diffMin === 1 ? '1 minute ago' : `${diffMin} minutes ago`;
  const diffHour = Math.round(diffMin / 60);
  if (diffHour < 24) return diffHour === 1 ? '1 hour ago' : `${diffHour} hours ago`;
  const diffDay = Math.round(diffHour / 24);
  if (diffDay < 30) return diffDay === 1 ? '1 day ago' : `${diffDay} days ago`;
  const diffMonth = Math.round(diffDay / 30);
  if (diffMonth < 12) return diffMonth === 1 ? '1 month ago' : `${diffMonth} months ago`;
  const diffYear = Math.round(diffMonth / 12);
  return diffYear === 1 ? '1 year ago' : `${diffYear} years ago`;
}

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

interface RailSegmentProps {
  pushed: boolean;
  isFirst: boolean;
  isLast: boolean;
  seed: number;
}

const RailSegment = ({ pushed, isFirst, isLast, seed }: RailSegmentProps) => {
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
    <div className="relative w-5 shrink-0 self-stretch">
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
```

### Phases
- [ ] Add `ArcGauge`
      A 280° rough track with the value arc over it, seeded by `useStableSeed`.
- [ ] Add `BarChart` and `StackedBar`
      Both draw filled bars into a fixed viewBox stretched to width, so they share the drawing helper; `BarChart` hachures the failed portion.
- [ ] Add `CommitRail`
      A stroke plus a dot per row, dashed amber until `pushed`, with `isFirst`/`isLast` trimming the stroke.
- [ ] Give `Progress` a `sketch` prop
      Hachured track, solid fill, drawn by the generator rather than CSS.
- [ ] Export the charts and show them
      Add the four components to `src/index.ts` and give each a showcase example with prop rows, including the new `Progress` prop.
