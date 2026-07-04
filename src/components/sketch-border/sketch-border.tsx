import { useEffect, useMemo, useRef, useState } from 'react';
import { useStableSeed } from '../../hooks/use-stable-seed';
import { roughGenerator } from '../../utils/rough';
import { cn } from '../../utils/style-helpers';
import styles from './sketch-border.module.scss';

export interface SketchBorderProps {
  /** Base corner radius in px; each corner deviates slightly (seeded). */
  radius?: number;
  /** rough.js roughness — how shaky the pencil hand is. */
  roughness?: number;
  strokeWidth?: number;
  /** Inset from the host edge so the stroke's jitter stays inside the box. */
  inset?: number;
  className?: string;
}

// Internal building block: an absolutely-positioned SVG that measures its
// parent and draws a rough.js hand-sketched outline at real pixel size —
// stretching an abstract viewBox would squash the jitter (see Progress).
// Stroke color comes from the `--sketch-stroke` custom property so hosts
// drive hover/focus/error/chalkboard tinting purely from CSS.
export function SketchBorder({
  radius = 10,
  roughness = 1.4,
  strokeWidth = 1.4,
  inset = 2.5,
  className,
}: SketchBorderProps) {
  const seed = useStableSeed();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const host = svgRef.current?.parentElement;
    if (!host) return;
    const observer = new ResizeObserver(() => {
      const rect = host.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      setSize((prev) =>
        prev && prev.width === width && prev.height === height ? prev : { width, height },
      );
    });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const path = useMemo(() => {
    if (!size || size.width < 8 || size.height < 8) return null;
    const radii = cornerRadii(seed, radius, 3);
    const d = roundedRectPath(inset, inset, size.width - inset * 2, size.height - inset * 2, radii);
    const drawable = roughGenerator.path(d, {
      seed: Math.max(1, Math.round(seed * 1_000_000)),
      roughness,
      strokeWidth,
    });
    return roughGenerator
      .toPaths(drawable)
      .map((p) => p.d)
      .join(' ');
  }, [size, seed, radius, roughness, strokeWidth, inset]);

  return (
    <svg
      ref={svgRef}
      className={cn(styles.svg, className)}
      viewBox={size ? `0 0 ${size.width} ${size.height}` : undefined}
      aria-hidden="true"
    >
      {path && <path className={styles.stroke} d={path} strokeWidth={strokeWidth} />}
    </svg>
  );
}

// Deterministic per-corner radii — the same hand-drawn irregularity as the
// organic-radius mixin, but stable per instance instead of per build.
function cornerRadii(
  seed: number,
  base: number,
  variance: number,
): [number, number, number, number] {
  let s = Math.max(1, Math.round(seed * 2147483646));
  const next = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const r = () => Math.max(2, base + (next() - 0.5) * variance * 2);
  return [r(), r(), r(), r()];
}

function roundedRectPath(
  x: number,
  y: number,
  w: number,
  h: number,
  radii: [number, number, number, number],
): string {
  const clamp = (r: number) => Math.min(r, w / 2, h / 2);
  const [tl, tr, br, bl] = [clamp(radii[0]), clamp(radii[1]), clamp(radii[2]), clamp(radii[3])];
  return [
    `M ${x + tl} ${y}`,
    `L ${x + w - tr} ${y}`,
    `Q ${x + w} ${y} ${x + w} ${y + tr}`,
    `L ${x + w} ${y + h - br}`,
    `Q ${x + w} ${y + h} ${x + w - br} ${y + h}`,
    `L ${x + bl} ${y + h}`,
    `Q ${x} ${y + h} ${x} ${y + h - bl}`,
    `L ${x} ${y + tl}`,
    `Q ${x} ${y} ${x + tl} ${y}`,
    'Z',
  ].join(' ');
}
