import { useId, useMemo } from 'react';

// Per-instance seed derived from React's SSR-stable useId. Math.random()
// here would make the server and client draw different shapes and break
// hydration for SSR consumers.
export function useStableSeed(): number {
  const id = useId();
  return useMemo(() => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    }
    // Map to (0, 1] — keeps derived integer seeds nonzero, since rough.js
    // treats a seed of 0 as "unseeded" and would go random again.
    return (hash + 1) / 4294967296;
  }, [id]);
}
