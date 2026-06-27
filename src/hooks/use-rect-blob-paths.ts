import { useMemo } from 'react';
import { generateWobblyRect, generateWobblyRectRing } from '../utils/random-blob';

export function useRectBlobPaths(wobble: number) {
  return useMemo(() => {
    const seed = Math.random();
    return {
      blob: generateWobblyRect({ seed, wobble }),
      ring: generateWobblyRectRing(seed, wobble),
    };
  }, [wobble]);
}
