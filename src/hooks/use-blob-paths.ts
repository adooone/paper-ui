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
    roughness: 0.6 + wobble * 0.5,
    bowing: 0.4,
    // A blob outline is one continuous closed curve — the default second
    // pass just doubles up as visual noise here rather than adding texture.
    disableMultiStroke: true,
    strokeWidth: 1.6,
  });
  return roughGenerator
    .toPaths(drawable)
    .map((p) => p.d)
    .join(' ');
}
