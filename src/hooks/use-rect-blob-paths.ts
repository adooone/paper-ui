import { useMemo } from 'react';
import { generateWobblyRect, generateWobblyRectRing } from '../utils/random-blob';
import { useStableSeed } from './use-stable-seed';

export function useRectBlobPaths(wobble: number) {
  const seed = useStableSeed();
  return useMemo(
    () => ({
      blob: generateWobblyRect({ seed, wobble }),
      ring: generateWobblyRectRing(seed, wobble),
    }),
    [seed, wobble],
  );
}
