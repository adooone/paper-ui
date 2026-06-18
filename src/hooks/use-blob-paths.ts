import { useMemo } from 'react';
import { generateWobblyBlob, generateWobblyRing } from '../utils/random-blob';

export function useBlobPaths(wobble: number) {
  return useMemo(() => {
    const seed = Math.random();
    return {
      blob: generateWobblyBlob({ seed, wobble }),
      ring: generateWobblyRing(seed, wobble),
    };
  }, [wobble]);
}
