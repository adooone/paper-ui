import { useMemo } from 'react';
import { generateWobblyBlob } from '../utils/random-blob';
import { roughGenerator } from '../utils/rough';
import { useStableSeed } from './use-stable-seed';

export function useBlobPaths(wobble: number) {
  const seed = useStableSeed();
  return useMemo(() => {
    const blob = generateWobblyBlob({ seed, wobble });
    return { blob, ring: sketchOutline(blob, seed, wobble) };
  }, [seed, wobble]);
}

// The ring traces the blob's own contour through rough.js, so the hover /
// active outline reads as a hand-sketched overdraw of the shape instead of
// a second smooth curve floating next to it.
export function sketchOutline(shapePath: string, seed: number, wobble: number): string {
  const drawable = roughGenerator.path(shapePath, {
    seed: Math.max(1, Math.round(seed * 1_000_000)),
    roughness: 0.9 + wobble * 0.8,
    strokeWidth: 1.8,
  });
  return roughGenerator
    .toPaths(drawable)
    .map((p) => p.d)
    .join(' ');
}
