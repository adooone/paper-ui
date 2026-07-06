import { useEffect, useMemo, useRef, useState } from 'react';
import { roughGenerator } from '../../utils/rough';
import { cn } from '../../utils/style-helpers';
import styles from './sketch-border.module.scss';

export interface SketchBorderProps {
  /** `rect` (default) draws a rounded rectangle; `circle` a hand-drawn ellipse. */
  shape?: 'rect' | 'circle';
  /** Base corner radius in px; each corner deviates slightly (seeded). rect only. */
  radius?: number;
  /** rough.js roughness — how shaky the pencil hand is. */
  roughness?: number;
  /** rough.js bowing — how much a straight run bows on its way across. */
  bowing?: number;
  strokeWidth?: number;
  /** Inset from the host edge so the stroke's wobble stays inside the box. */
  inset?: number;
  /**
   * Also fill the sketched silhouette (solid, tinted by --sketch-fill), so the
   * background shares the pencil line's wobbly edge instead of showing a clean
   * rectangle underneath. When set, the SVG renders BEHIND host content.
   * Use for surfaces WITHOUT a texture (a rough solid fill is flat).
   */
  fill?: boolean;
  /**
   * Instead of painting a fill, publish the wobbly silhouette as a
   * `--sketch-clip: path(...)` custom property on the host, so a textured
   * background layer can `clip-path: var(--sketch-clip)` and keep its texture
   * while gaining the sketchy edge. Use for surfaces WITH a texture.
   */
  clip?: boolean;
  /**
   * Draw the outline as ONE hand-drawn rough.js line (its doubling pass
   * disabled) instead of the default multi-stroke. Still sketchy — roughness
   * and bowing apply — just a single, calmer stroke. Good for small controls
   * (Checkbox / Radio / Avatar).
   */
  smooth?: boolean;
  className?: string;
}

interface Part {
  d: string;
  filled: boolean;
}

interface Size {
  width: number;
  height: number;
}

type Radii = [number, number, number, number];

// Internal building block: an absolutely-positioned SVG that measures its
// parent and draws a hand-sketched outline at real pixel size — stretching an
// abstract viewBox would squash the jitter (see Progress).
//
// It feeds ONE clean rounded-rect path to rough.js. rough.js sketches that
// single continuous shape with its own hand-drawn pass — the multi-stroke it
// emits (a couple of overlapping passes with small gaps, uneven density and a
// wobble) IS the pencil look, the same one Skeleton/Progress use. Every emitted
// sub-stroke traces the same outline in the same colour, so it reads as one
// pencil line gone over a couple of times, not separate geometric pieces
// welded together. preserveVertices keeps the corner points anchored so the
// sketch doesn't drift into the self-crossing tangle a naive pass produces.
export function SketchBorder({
  shape = 'rect',
  radius = 9,
  roughness = 1.2,
  bowing = 1,
  strokeWidth = 1,
  inset = 2,
  fill = false,
  clip = false,
  smooth = false,
  className,
}: SketchBorderProps) {
  // Random per mount (not per re-render), so each element instance draws a
  // unique shape that stays put while mounted — like the button's blob. Safe
  // vs. SSR because the path only computes once the element is measured on
  // the client (size starts null), so it never renders during hydration.
  const [seed] = useState(Math.random);
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

  const { parts, clipPath } = useMemo<{ parts: Part[] | null; clipPath: string | null }>(() => {
    if (!size || size.width < 8 || size.height < 8) return { parts: null, clipPath: null };
    const base = Math.max(1, Math.round(seed * 1_000_000));
    const seedStroke = base;
    const seedFill = (base * 2654435761) % 2147483647;

    const strokeFrom = (d: string): Part[] =>
      roughGenerator
        .toPaths(
          roughGenerator.path(d, {
            seed: seedStroke,
            roughness,
            bowing,
            preserveVertices: true,
            strokeWidth,
          }),
        )
        .filter((p) => !p.fill || p.fill === 'none')
        .map((p) => ({ d: p.d, filled: false }));

    if (smooth) {
      // ONE hand-drawn rough.js line — disableMultiStroke turns off the second
      // (doubling) pass, so it's a single sketchy stroke rather than the
      // overlapping multi-stroke. When clipping, the line traces the exact clip
      // silhouette so the outline hugs the fill edge.
      const single = { seed: seedStroke, roughness, bowing, strokeWidth, disableMultiStroke: true };
      const toStroke = (drawable: ReturnType<typeof roughGenerator.path>): Part[] =>
        roughGenerator
          .toPaths(drawable)
          .filter((p) => !p.fill || p.fill === 'none')
          .map((p) => ({ d: p.d, filled: false }));

      if (clip) {
        const silhouette = silhouettePath(
          shape,
          size,
          inset,
          radius,
          createRng(seedFill),
          roughness * 1.1,
        );
        return {
          parts: toStroke(roughGenerator.path(silhouette, { ...single, preserveVertices: true })),
          clipPath: silhouette,
        };
      }
      const drawable =
        shape === 'circle'
          ? roughGenerator.ellipse(
              size.width / 2,
              size.height / 2,
              size.width - inset * 2,
              size.height - inset * 2,
              single,
            )
          : roughGenerator.path(rectPath(size, inset, radius, createRng(seedStroke)), {
              ...single,
              preserveVertices: true,
            });
      return { parts: toStroke(drawable), clipPath: null };
    }

    if (clip) {
      // The fill edge IS this silhouette (via --sketch-clip), and the outline
      // is a rough overdraw of the SAME silhouette — so the pencil line hugs
      // the fill edge instead of diverging into a separate shape (which on a
      // large surface leaves a gap of background showing through).
      const silhouette = silhouettePath(
        shape,
        size,
        inset,
        radius,
        createRng(seedFill),
        roughness * 1.1,
      );
      return { parts: strokeFrom(silhouette), clipPath: silhouette };
    }

    // Non-clip: an optional rough solid fill plus an independent outline shape,
    // so the outline wanders in and out of the fill (fine on small elements,
    // where there is no clip gap to expose the background).
    const draw = (segSeed: number, filled: boolean) => {
      const opts = filled ? { fill: '#000', fillStyle: 'solid' as const } : {};
      const drawable =
        shape === 'circle'
          ? roughGenerator.ellipse(
              size.width / 2,
              size.height / 2,
              size.width - inset * 2,
              size.height - inset * 2,
              { seed: segSeed, roughness, bowing, strokeWidth, ...opts },
            )
          : roughGenerator.path(rectPath(size, inset, radius, createRng(segSeed)), {
              seed: segSeed,
              roughness,
              bowing,
              preserveVertices: true,
              strokeWidth,
              ...opts,
            });
      return roughGenerator.toPaths(drawable);
    };

    const fillParts: Part[] = fill
      ? draw(seedFill, true)
          .filter((p) => !!p.fill && p.fill !== 'none')
          .map((p) => ({ d: p.d, filled: true }))
      : [];
    const strokeParts: Part[] = draw(seedStroke, false)
      .filter((p) => !p.fill || p.fill === 'none')
      .map((p) => ({ d: p.d, filled: false }));
    return { parts: [...fillParts, ...strokeParts], clipPath: null };
  }, [size, seed, clip, smooth, shape, radius, roughness, bowing, strokeWidth, inset, fill]);

  useEffect(() => {
    const host = svgRef.current?.parentElement;
    if (!host) return;
    if (clipPath) {
      host.style.setProperty('--sketch-clip', `path("${clipPath}")`);
    } else {
      host.style.removeProperty('--sketch-clip');
    }
    return () => {
      host.style.removeProperty('--sketch-clip');
    };
  }, [clipPath]);

  return (
    <svg
      ref={svgRef}
      className={cn(styles.svg, fill && styles.behind, className)}
      viewBox={size ? `0 0 ${size.width} ${size.height}` : undefined}
      aria-hidden="true"
    >
      {parts?.map((p, i) =>
        p.filled ? (
          <path key={`f-${i}`} className={styles.fill} d={p.d} />
        ) : (
          <path key={`s-${i}`} className={styles.stroke} d={p.d} strokeWidth={strokeWidth} />
        ),
      )}
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

interface Pt {
  x: number;
  y: number;
}

// A single closed, gently-wobbly path around the shape, for use as a CSS
// clip-path. Points are sampled around a rounded rect (or ellipse) with small
// jitter, then joined by a closed Catmull-Rom spline so the edge undulates
// smoothly rather than in straight facets.
function silhouettePath(
  shape: 'rect' | 'circle',
  size: Size,
  inset: number,
  radius: number,
  rng: () => number,
  amplitude: number,
): string {
  const w = size.width - inset * 2;
  const h = size.height - inset * 2;
  const cx = size.width / 2;
  const cy = size.height / 2;
  const wob = () => (rng() - 0.5) * amplitude * 2;
  const pts: Pt[] = [];

  if (shape === 'circle') {
    const steps = 16;
    for (let i = 0; i < steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      pts.push({ x: cx + (Math.cos(a) * w) / 2 + wob(), y: cy + (Math.sin(a) * h) / 2 + wob() });
    }
  } else {
    const r = Math.max(2, Math.min(radius, w / 2, h / 2));
    const x = inset;
    const y = inset;
    // corners as small arcs, edges as a couple of jittered midpoints
    const corner = (ccx: number, ccy: number, start: number) => {
      for (const da of [0, 45, 90]) {
        const a = ((start + da) * Math.PI) / 180;
        pts.push({ x: ccx + Math.cos(a) * r + wob(), y: ccy + Math.sin(a) * r + wob() });
      }
    };
    const edge = (x1: number, y1: number, x2: number, y2: number) => {
      for (const t of [0.5]) {
        pts.push({ x: x1 + (x2 - x1) * t + wob(), y: y1 + (y2 - y1) * t + wob() });
      }
    };
    corner(x + r, y + r, 180);
    edge(x + r, y, x + w - r, y);
    corner(x + w - r, y + r, 270);
    edge(x + w, y + r, x + w, y + h - r);
    corner(x + w - r, y + h - r, 0);
    edge(x + w - r, y + h, x + r, y + h);
    corner(x + r, y + h - r, 90);
    edge(x, y + h - r, x, y + r);

    // Start the closed path at the middle of the top edge, not the top-left
    // corner. The M/Z seam — where the first and last curve segments meet and
    // rough.js's independent jitter can make them cross into a little spur —
    // then lands on a straight run where it's invisible, instead of poking out
    // of a corner. (3 corner-arc points precede the top-edge midpoint.)
    const seam = 3;
    return closedSpline([...pts.slice(seam), ...pts.slice(0, seam)]);
  }

  return closedSpline(pts);
}

// Closed centripetal (alpha=0.5) Catmull-Rom spline. Centripetal — not the
// simpler uniform (p2-p0)/6 — because the sample points are very unevenly
// spaced: three points bunched within the corner radius, then an edge midpoint
// half the side away. Uniform Catmull-Rom overshoots wildly at that jump and
// throws a spike out past the corner; centripetal parameterisation scales each
// tangent by the actual point distances, so tight corners stay tucked in and
// never cusp or self-intersect.
function closedSpline(pts: Pt[]): string {
  const n = pts.length;
  if (n < 3) return '';
  const knot = (a: Pt, b: Pt) => Math.max(1e-3, Math.hypot(b.x - a.x, b.y - a.y) ** 0.5);
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const t01 = knot(p0, p1);
    const t12 = knot(p1, p2);
    const t23 = knot(p2, p3);
    // Non-uniform Catmull-Rom tangents at p1 (m1) and p2 (m2).
    const m1x = p2.x - p1.x + t12 * ((p1.x - p0.x) / t01 - (p2.x - p0.x) / (t01 + t12));
    const m1y = p2.y - p1.y + t12 * ((p1.y - p0.y) / t01 - (p2.y - p0.y) / (t01 + t12));
    const m2x = p2.x - p1.x + t12 * ((p3.x - p2.x) / t23 - (p3.x - p1.x) / (t12 + t23));
    const m2y = p2.y - p1.y + t12 * ((p3.y - p2.y) / t23 - (p3.y - p1.y) / (t12 + t23));
    const c1x = p1.x + m1x / 3;
    const c1y = p1.y + m1y / 3;
    const c2x = p2.x - m2x / 3;
    const c2y = p2.y - m2y / 3;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return `${d} Z`;
}

// One continuous rounded-rectangle path with seeded per-corner radius jitter.
function rectPath(size: Size, inset: number, radius: number, rng: () => number): string {
  const radii = [0, 0, 0, 0].map(() => Math.max(2, radius + (rng() - 0.5) * 3)) as Radii;
  return roundedRectPath(inset, inset, size.width - inset * 2, size.height - inset * 2, radii);
}

// Straight edges + quadratic corners, as one continuous path.
function roundedRectPath(x: number, y: number, w: number, h: number, radii: Radii): string {
  const clamp = (r: number) => Math.min(r, w / 2, h / 2);
  const [tl, tr, br, bl] = radii.map(clamp) as Radii;
  return [
    `M ${fmt(x + tl)} ${fmt(y)}`,
    `L ${fmt(x + w - tr)} ${fmt(y)}`,
    `Q ${fmt(x + w)} ${fmt(y)} ${fmt(x + w)} ${fmt(y + tr)}`,
    `L ${fmt(x + w)} ${fmt(y + h - br)}`,
    `Q ${fmt(x + w)} ${fmt(y + h)} ${fmt(x + w - br)} ${fmt(y + h)}`,
    `L ${fmt(x + bl)} ${fmt(y + h)}`,
    `Q ${fmt(x)} ${fmt(y + h)} ${fmt(x)} ${fmt(y + h - bl)}`,
    `L ${fmt(x)} ${fmt(y + tl)}`,
    `Q ${fmt(x)} ${fmt(y)} ${fmt(x + tl)} ${fmt(y)}`,
    'Z',
  ].join(' ');
}

function fmt(n: number): string {
  return n.toFixed(2);
}
