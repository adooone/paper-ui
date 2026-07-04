import { useMemo } from 'react';
import { generateWobblyBlob, generateWobblyRing } from '../utils/random-blob';
import { useStableSeed } from './use-stable-seed';

export function useBlobPaths(wobble: number) {
  const seed = useStableSeed();
  return useMemo(
    () => ({
      blob: generateWobblyBlob({ seed, wobble }),
      ring: generateWobblyRing(seed, wobble),
    }),
    [seed, wobble],
  );
}
