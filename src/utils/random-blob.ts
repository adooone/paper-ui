export interface BlobConfig {
  seed?: string | number;
  wobble?: number;
}

export function generateWobblyBlob(config?: BlobConfig): string {
  const rng = seededRandom(config?.seed ?? Math.random());
  const intensity = Math.max(0, Math.min(1, config?.wobble ?? 0.5));

  const points = 8 + Math.round(intensity * 6);
  const cx = 50;
  const cy = 50;
  const baseR = 46;
  const wobble = 2 + intensity * 14;

  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2 + (rng() - 0.5) * 0.15 * intensity;
    const r = baseR + (rng() - 0.5) * wobble * 2;
    pts.push({
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    });
  }

  return catmullRomToBezier(pts);
}

export function generateWobblyRing(blobSeed: string | number, wobble?: number): string {
  const rng = seededRandom(`${blobSeed}-ring`);
  const intensity = Math.max(0, Math.min(1, wobble ?? 0.5));

  const points = 8 + Math.round(intensity * 6);
  const cx = 50;
  const cy = 50;
  const baseR = 49;
  const wobblePx = 2 + intensity * 14;

  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2 + (rng() - 0.5) * 0.15 * intensity;
    const r = baseR + (rng() - 0.5) * wobblePx * 2;
    pts.push({
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    });
  }

  return catmullRomToBezier(pts);
}

export function generateWobblyRect(config?: BlobConfig): string {
  const rng = seededRandom(config?.seed ?? Math.random());
  const intensity = Math.max(0, Math.min(1, config?.wobble ?? 0.5));

  const perSide = 3 + Math.round(intensity * 3);
  const margin = 2;
  const wobblePx = 3 + intensity * 10;

  const pts: { x: number; y: number }[] = [];

  const edges: { ax: number; ay: number; bx: number; by: number }[] = [
    { ax: margin, ay: margin, bx: 100 - margin, by: margin }, // top
    { ax: 100 - margin, ay: margin, bx: 100 - margin, by: 100 - margin }, // right
    { ax: 100 - margin, ay: 100 - margin, bx: margin, by: 100 - margin }, // bottom
    { ax: margin, ay: 100 - margin, bx: margin, by: margin }, // left
  ];

  for (const edge of edges) {
    for (let i = 0; i < perSide; i++) {
      const t = (i + 0.5) / perSide;
      const bx = edge.ax + (edge.bx - edge.ax) * t;
      const by = edge.ay + (edge.by - edge.ay) * t;

      // perpendicular direction
      const dx = edge.bx - edge.ax;
      const dy = edge.by - edge.ay;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;

      const offset = (rng() - 0.5) * wobblePx * 2;
      pts.push({ x: bx + nx * offset, y: by + ny * offset });
    }
  }

  return catmullRomToBezier(pts);
}

export function generateWobblyRectRing(seed: string | number, wobble?: number): string {
  const rng = seededRandom(`${seed}-ring`);
  const intensity = Math.max(0, Math.min(1, wobble ?? 0.5));

  const perSide = 3 + Math.round(intensity * 3);
  const margin = 0;
  const wobblePx = 3 + intensity * 10;

  const pts: { x: number; y: number }[] = [];

  const edges: { ax: number; ay: number; bx: number; by: number }[] = [
    { ax: margin, ay: margin, bx: 100 - margin, by: margin },
    { ax: 100 - margin, ay: margin, bx: 100 - margin, by: 100 - margin },
    { ax: 100 - margin, ay: 100 - margin, bx: margin, by: 100 - margin },
    { ax: margin, ay: 100 - margin, bx: margin, by: margin },
  ];

  for (const edge of edges) {
    for (let i = 0; i < perSide; i++) {
      const t = (i + 0.5) / perSide;
      const bx = edge.ax + (edge.bx - edge.ax) * t;
      const by = edge.ay + (edge.by - edge.ay) * t;

      const dx = edge.bx - edge.ax;
      const dy = edge.by - edge.ay;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;

      const offset = (rng() - 0.5) * wobblePx * 2;
      pts.push({ x: bx + nx * offset, y: by + ny * offset });
    }
  }

  return catmullRomToBezier(pts);
}

function catmullRomToBezier(pts: { x: number; y: number }[]): string {
  const n = pts.length;
  if (n < 3) return '';

  let d = `M ${fmt(pts[0].x)} ${fmt(pts[0].y)}`;

  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${fmt(cp1x)} ${fmt(cp1y)}, ${fmt(cp2x)} ${fmt(cp2y)}, ${fmt(p2.x)} ${fmt(p2.y)}`;
  }

  d += ' Z';
  return d;
}

function fmt(n: number): string {
  return n.toFixed(2);
}

function seededRandom(seed: string | number) {
  let s = typeof seed === 'string' ? hashString(seed) : seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h) || 1;
}
