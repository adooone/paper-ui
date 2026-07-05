import { useMemo } from 'react';
import { generateWobblyBlob, generateWobblyRing } from '../utils/random-blob';
import { useStableSeed } from './use-stable-seed';

export function useBlobPaths(wobble: number) {
  const seed = useStableSeed();
  // The ring is a SEPARATE wandering shape from the fill blob (larger base
  // radius, its own random sequence), so the ink outline crosses in and out
  // of the watercolor wash instead of tracing its exact contour.
  return useMemo(
    () => ({
      blob: generateWobblyBlob({ seed, wobble }),
      ring: generateWobblyRing(seed, wobble),
    }),
    [seed, wobble],
  );
}
