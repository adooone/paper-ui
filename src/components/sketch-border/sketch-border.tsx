import { useEffect, useMemo, useRef, useState } from 'react';
import { useStableSeed } from '../../hooks/use-stable-seed';
import { cn } from '../../utils/style-helpers';
import styles from './sketch-border.module.scss';

export interface SketchBorderProps {
  /** Base corner radius in px; each corner deviates slightly (seeded). */
  radius?: number;
  /** Amplitude of the hand-wander in px — how far the line strays to either
   * side of the true boundary. */
  roughness?: number;
  strokeWidth?: number;
  /** Nominal distance from the host's true edge. */
  inset?: number;
  className?: string;
}

interface Pt {
  x: number;
  y: number;
}

interface Seg {
  c1: Pt;
  c2: Pt;
  to: Pt;
}

interface Size {
  width: number;
  height: number;
}

// Internal building block: an absolutely-positioned SVG that measures its
// parent and draws a hand-sketched outline at real pixel size.
//
// The outline is ONE closed Catmull-Rom spline through slightly-jittered
// points (corner arcs sampled at three points each, edges at a few interior
// points). A single smooth spline is what guarantees the two things rough.js
// couldn't: the line never doubles or crosses itself, and corners are round
// by construction. The jitter makes it wander gently outside and inside the
// nominal boundary like a pencil stroke.
//
// The darker "pencil pressure" at corners is NOT a second line: it re-draws
// the exact same spline segments that cover each corner in the darker tone,
// so it recolors a stretch of the one line instead of adding another.
export function SketchBorder({
  radius = 10,
  roughness = 1,
  strokeWidth = 1.3,
  inset = 2,
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

  const paths = useMemo(() => {
    if (!size || size.width < 8 || size.height < 8) return null;
    const rng = createRng(Math.max(1, Math.round(seed * 1_000_000)));
    const amplitude = roughness * 0.75;
    const { pts, cornerStarts } = buildPoints(
      size.width,
      size.height,
      inset,
      radius,
      rng,
      amplitude,
    );
    const segs = catmullSegments(pts);

    const outline = `M ${fmt(pts[0])} ${segs.map((s) => `C ${fmt(s.c1)}, ${fmt(s.c2)}, ${fmt(s.to)}`).join(' ')} Z`;
    // Two spline segments span each corner's three sample points.
    const corners = cornerStarts.map(
      (ci) =>
        `M ${fmt(pts[ci])} C ${fmt(segs[ci].c1)}, ${fmt(segs[ci].c2)}, ${fmt(segs[ci].to)} C ${fmt(segs[ci + 1].c1)}, ${fmt(segs[ci + 1].c2)}, ${fmt(segs[ci + 1].to)}`,
    );

    return { outline, corners };
  }, [size, seed, radius, roughness, inset]);

  return (
    <svg
      ref={svgRef}
      className={cn(styles.svg, className)}
      viewBox={size ? `0 0 ${size.width} ${size.height}` : undefined}
      aria-hidden="true"
    >
      {paths && <path className={styles.edgeStroke} d={paths.outline} strokeWidth={strokeWidth} />}
      {paths?.corners.map((d, i) => (
        <path
          key={`corner-${i}`}
          className={styles.cornerStroke}
          d={d}
          strokeWidth={strokeWidth * 1.2}
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

// Sample points clockwise around the rounded rect: three per corner arc
// (at 0°, 45° and 90° of the arc, with small radial jitter) and a few
// interior points per edge (with small perpendicular jitter). Because every
// point feeds one shared spline, jitter can never break the line apart.
function buildPoints(
  width: number,
  height: number,
  inset: number,
  radius: number,
  rng: () => number,
  amplitude: number,
): { pts: Pt[]; cornerStarts: number[] } {
  const x = inset;
  const y = inset;
  const w = width - inset * 2;
  const h = height - inset * 2;
  const vary = () => (rng() - 0.5) * 2;
  const clampR = (r: number) => Math.max(2, Math.min(r, w / 2 - 1, h / 2 - 1));
  const [tl, tr, br, bl] = [0, 0, 0, 0].map(() => clampR(radius + vary() * 1.5));

  const pts: Pt[] = [];
  const cornerStarts: number[] = [];

  const arc = (cx: number, cy: number, r: number, startAngle: number) => {
    cornerStarts.push(pts.length);
    for (const da of [0, 45, 90]) {
      const a = ((startAngle + da) * Math.PI) / 180;
      const rr = r + vary() * amplitude * 0.6;
      pts.push({ x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr });
    }
  };

  const edge = (x1: number, y1: number, x2: number, y2: number) => {
    const len = Math.hypot(x2 - x1, y2 - y1);
    const count = Math.max(1, Math.min(4, Math.round(len / 70)));
    const nx = -(y2 - y1) / len;
    const ny = (x2 - x1) / len;
    for (let i = 1; i <= count; i++) {
      const t = i / (count + 1);
      const o = vary() * amplitude;
      pts.push({ x: x1 + (x2 - x1) * t + nx * o, y: y1 + (y2 - y1) * t + ny * o });
    }
  };

  arc(x + tl, y + tl, tl, 180); // top-left: 180° → 270°
  edge(x + tl, y, x + w - tr, y); // top
  arc(x + w - tr, y + tr, tr, 270); // top-right: 270° → 360°
  edge(x + w, y + tr, x + w, y + h - br); // right
  arc(x + w - br, y + h - br, br, 0); // bottom-right: 0° → 90°
  edge(x + w - br, y + h, x + bl, y + h); // bottom
  arc(x + bl, y + h - bl, bl, 90); // bottom-left: 90° → 180°
  edge(x, y + h - bl, x, y + tl); // left

  return { pts, cornerStarts };
}

// Closed-loop Catmull-Rom → cubic Bézier. segs[i] runs pts[i] → pts[i+1].
function catmullSegments(pts: Pt[]): Seg[] {
  const n = pts.length;
  const segs: Seg[] = [];
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    segs.push({
      c1: { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 },
      c2: { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 },
      to: p2,
    });
  }
  return segs;
}

function fmt(p: Pt): string {
  return `${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
}
