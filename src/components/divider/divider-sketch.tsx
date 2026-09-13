import { useEffect, useMemo, useRef, useState } from 'react';
import { useStableSeed } from '../../hooks/use-stable-seed';
import { roughGenerator } from '../../utils/rough';
import { cn } from '../../utils/style-helpers';
import { sketchOutline } from '../sketch-border';
import styles from './divider.module.scss';

export function DividerSketch({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const seed = useStableSeed();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new ResizeObserver(() => {
      const w = host.offsetWidth;
      setWidth((prev) => (prev === w ? prev : w));
    });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const path = useMemo<string | null>(() => {
    if (!width || width < 4) return null;
    const base = Math.max(1, Math.round(seed * 1_000_000));
    const opts = { ...sketchOutline.surface, seed: base, disableMultiStroke: true };
    const drawable = roughGenerator.line(0, 1, width, 1, opts);
    const parts = roughGenerator.toPaths(drawable).filter((p) => !p.fill || p.fill === 'none');
    return parts.length ? parts.map((p) => p.d).join(' ') : null;
  }, [width, seed]);

  return (
    // biome-ignore lint/a11y/useFocusableInteractive: a static decorative separator, not an adjustable splitter, so it is intentionally not focusable.
    <div ref={hostRef} className={cn(styles.horizontal, styles.sketch, className)} role="separator">
      {path && width != null && (
        <svg
          className={styles.sketchSvg}
          viewBox={`0 0 ${width} 2`}
          width={width}
          height={2}
          aria-hidden="true"
        >
          <path className={styles.sketchStroke} d={path} />
        </svg>
      )}
    </div>
  );
}
