import { useMemo } from 'react';
import { generateWobblyRect, generateWobblyRectRing } from '../utils/random-blob';
import { useStableSeed } from './use-stable-seed';

export function useRectBlobPaths(wobble: number) {
  const seed = useStableSeed();
  // The ring is a SEPARATE wandering shape from the fill (see use-blob-paths),
  // so the outline crosses in and out of the wash rather than tracing it.
  return useMemo(
    () => ({
      blob: generateWobblyRect({ seed, wobble }),
      ring: generateWobblyRectRing(seed, wobble),
    }),
    [seed, wobble],
  );
}
