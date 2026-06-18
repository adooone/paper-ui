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
  const rng = seededRandom(blobSeed + '-ring');
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
