import { useEffect, useMemo, useRef, useState } from 'react';
import { useStableSeed } from '../../hooks/use-stable-seed';
import { roughGenerator } from '../../utils/rough';
import { cn } from '../../utils/style-helpers';
import styles from './sketch-border.module.scss';

export interface SketchBorderProps {
  /** Base corner radius in px; each corner deviates slightly (seeded). */
  radius?: number;
  /** rough.js roughness for the corner arcs — edges draw calmer than this. */
  roughness?: number;
  /** rough.js bowing — how much a stroke curves along its length. Low by
   * design: this is a pencil line, not a wavy one. */
  bowing?: number;
  strokeWidth?: number;
  /** Nominal distance from the host's true edge. The drawn line wanders a
   * little to either side of this via jitter, so it isn't a perfect offset. */
  inset?: number;
  className?: string;
}

interface Size {
  width: number;
  height: number;
}

type Radii = [number, number, number, number];

// Internal building block: an absolutely-positioned SVG that measures its
// parent and draws a rough.js hand-sketched outline at real pixel size —
// stretching an abstract viewBox would squash the jitter (see Progress).
//
// The outline is built from eight independent segments (four corner arcs,
// four straight edges) instead of one continuous path. Sketching the whole
// rounded rect in a single rough.js pass produced messy, self-crossing
// corners (high curvature + the default double-stroke pass). Small,
// individually-drawn, single-stroke segments read as one clean pencil line.
// Corners draw slightly darker/thicker than edges — the same dark/light
// language the old conic-gradient pencil-border used for "pressure" — and
// each segment overshoots into its neighbor's territory a little, so the
// line visibly wanders outside and inside the nominal box instead of
// tracing it exactly.
export function SketchBorder({
  radius = 10,
  roughness = 0.85,
  bowing = 0.35,
  strokeWidth = 1.3,
  inset = 1,
  className,
}: SketchBorderProps) {
  const seed = useStableSeed();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [size, setSize] = useState<Size | null>(null);

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

  const segments = useMemo(() => {
    if (!size || size.width < 8 || size.height < 8) return null;
    const seedInt = Math.max(1, Math.round(seed * 1_000_000));
    const rng = createRng(seedInt);
    const radii = cornerRadii(rng, radius, 2.5);
    const { corners, edges } = buildSegments(size.width, size.height, inset, radii, rng, 1.4);

    const sketch = (d: string, segRoughness: number, segSeed: number, width: number) =>
      roughGenerator
        .toPaths(
          roughGenerator.path(d, {
            seed: segSeed,
            roughness: segRoughness,
            bowing,
            disableMultiStroke: true,
            strokeWidth: width,
          }),
        )
        .map((p) => p.d)
        .join(' ');

    return {
      corners: corners.map((d, i) =>
        sketch(d, roughness, seedInt + i * 97 + 1, strokeWidth * 1.15),
      ),
      edges: edges.map((d, i) => sketch(d, roughness * 0.6, seedInt + i * 97 + 53, strokeWidth)),
    };
  }, [size, seed, radius, roughness, bowing, strokeWidth, inset]);

  return (
    <svg
      ref={svgRef}
      className={cn(styles.svg, className)}
      viewBox={size ? `0 0 ${size.width} ${size.height}` : undefined}
      aria-hidden="true"
    >
      {segments?.edges.map((d, i) => (
        <path key={`edge-${i}`} className={styles.edgeStroke} d={d} strokeWidth={strokeWidth} />
      ))}
      {segments?.corners.map((d, i) => (
        <path
          key={`corner-${i}`}
          className={styles.cornerStroke}
          d={d}
          strokeWidth={strokeWidth * 1.15}
        />
      ))}
    </svg>
  );
}

function createRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function cornerRadii(rng: () => number, base: number, variance: number): Radii {
  const r = () => Math.max(2, base + (rng() - 0.5) * variance * 2);
  return [r(), r(), r(), r()];
}

// Four corner-arc paths (each a single quadratic curve) and four straight
// edge paths, all with small per-point jitter so the line doesn't sit
// exactly on the nominal rounded-rect boundary. Edges additionally
// overshoot past their nominal endpoints into the corner, so consecutive
// segments overlap slightly rather than meeting at a precise seam.
function buildSegments(
  width: number,
  height: number,
  inset: number,
  radii: Radii,
  rng: () => number,
  jitter: number,
) {
  const x = inset;
  const y = inset;
  const w = width - inset * 2;
  const h = height - inset * 2;
  const clamp = (r: number) => Math.min(r, w / 2, h / 2);
  const [tl, tr, br, bl] = radii.map(clamp) as Radii;
  const jit = () => (rng() - 0.5) * jitter * 2;
  const overshoot = Math.max(1.5, jitter);

  const corners = [
    // top-left
    `M ${fmt(x)} ${fmt(y + tl + jit())} Q ${fmt(x + jit())} ${fmt(y + jit())} ${fmt(x + tl + jit())} ${fmt(y)}`,
    // top-right
    `M ${fmt(x + w - tr + jit())} ${fmt(y)} Q ${fmt(x + w + jit())} ${fmt(y + jit())} ${fmt(x + w)} ${fmt(y + tr + jit())}`,
    // bottom-right
    `M ${fmt(x + w)} ${fmt(y + h - br + jit())} Q ${fmt(x + w + jit())} ${fmt(y + h + jit())} ${fmt(x + w - br + jit())} ${fmt(y + h)}`,
    // bottom-left
    `M ${fmt(x + bl + jit())} ${fmt(y + h)} Q ${fmt(x + jit())} ${fmt(y + h + jit())} ${fmt(x)} ${fmt(y + h - bl + jit())}`,
  ];

  const edges = [
    // top: (x+tl, y) -> (x+w-tr, y), extended along x
    horizontalEdge(x + tl - overshoot, x + w - tr + overshoot, y, jit),
    // right: (x+w, y+tr) -> (x+w, y+h-br), extended along y
    verticalEdge(x + w, y + tr - overshoot, y + h - br + overshoot, jit),
    // bottom: (x+w-br, y+h) -> (x+bl, y+h), extended along x (reversed direction)
    horizontalEdge(x + w - br + overshoot, x + bl - overshoot, y + h, jit),
    // left: (x, y+h-bl) -> (x, y+tl), extended along y (reversed direction)
    verticalEdge(x, y + h - bl + overshoot, y + tl - overshoot, jit),
  ];

  return { corners, edges };
}

function horizontalEdge(x1: number, x2: number, y: number, jit: () => number) {
  return `M ${fmt(x1)} ${fmt(y + jit())} L ${fmt(x2)} ${fmt(y + jit())}`;
}

function verticalEdge(x: number, y1: number, y2: number, jit: () => number) {
  return `M ${fmt(x + jit())} ${fmt(y1)} L ${fmt(x + jit())} ${fmt(y2)}`;
}

function fmt(n: number): string {
  return n.toFixed(2);
}
