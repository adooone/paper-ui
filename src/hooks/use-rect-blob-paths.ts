import { useMemo } from 'react';
import { generateWobblyRect } from '../utils/random-blob';
import { sketchOutline } from './use-blob-paths';
import { useStableSeed } from './use-stable-seed';

export function useRectBlobPaths(wobble: number) {
  const seed = useStableSeed();
  return useMemo(() => {
    const blob = generateWobblyRect({ seed, wobble });
    return { blob, ring: sketchOutline(blob, seed, wobble) };
  }, [seed, wobble]);
}
