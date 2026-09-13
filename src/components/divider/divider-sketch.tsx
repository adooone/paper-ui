import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useStableSeed } from '../../hooks/use-stable-seed';
import { roughGenerator } from '../../utils/rough';
import { cn } from '../../utils/style-helpers';
import { sketchOutline } from '../sketch-border';
import styles from './divider.module.scss';

interface DividerSketchProps {
  orientation?: 'horizontal' | 'vertical';
  label?: ReactNode;
  className?: string;
}

export function DividerSketch({
  orientation = 'horizontal',
  label,
  className,
}: DividerSketchProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const [main, setMain] = useState<number | null>(null);
  const [cross, setCross] = useState<number | null>(null);
  const [labelSize, setLabelSize] = useState<number | null>(null);
  const seed = useStableSeed();
  const labelled = orientation === 'horizontal' && label != null;

  useLayoutEffect(() => {
    if (!labelled) {
      setLabelSize(null);
      return;
    }
    const el = labelRef.current;
    if (!el) return;
    setLabelSize(el.offsetWidth);
  }, [labelled]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const measure = () => {
      if (orientation === 'vertical') {
        setMain(host.offsetHeight);
        setCross(host.offsetWidth);
      } else {
        setMain(host.offsetWidth);
        setCross(host.offsetHeight);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    if (labelled && labelRef.current) {
      observer.observe(labelRef.current);
    }
    return () => observer.disconnect();
  }, [orientation, labelled]);

  const verticalPath = useMemo<string | null>(() => {
    if (orientation !== 'vertical' || !main || main < 4 || cross == null || cross < 4) return null;
    const base = Math.max(1, Math.round(seed * 1_000_000));
    const opts = {
      ...sketchOutline.surface,
      seed: base,
      disableMultiStroke: true,
    };
    const x = (cross - 2) / 2 + 1;
    const drawable = roughGenerator.line(x, 0, x, main, opts);
    const parts = roughGenerator.toPaths(drawable).filter((p) => !p.fill || p.fill === 'none');
    return parts.length ? parts.map((p) => p.d).join(' ') : null;
  }, [orientation, main, cross, seed]);

  const horizontalPath = useMemo<string | null>(() => {
    if (orientation !== 'horizontal' || labelled) return null;
    if (!main || main < 4) return null;
    const base = Math.max(1, Math.round(seed * 1_000_000));
    const opts = {
      ...sketchOutline.surface,
      seed: base,
      disableMultiStroke: true,
    };
    const drawable = roughGenerator.line(0, 1, main, 1, opts);
    const parts = roughGenerator.toPaths(drawable).filter((p) => !p.fill || p.fill === 'none');
    return parts.length ? parts.map((p) => p.d).join(' ') : null;
  }, [orientation, labelled, main, seed]);

  const labelledRuns = useMemo<{ left: string | null; right: string | null } | null>(() => {
    if (!labelled || !main || main < 4 || labelSize == null) return null;
    const half = (main - labelSize) / 2;
    if (half < 4) return null;
    const baseLeft = Math.max(1, Math.round(seed * 1_000_000));
    const seedNum = (baseLeft * 2654435761) % 2147483647;
    const baseRight = Math.max(1, seedNum);
    const optsLeft = { ...sketchOutline.surface, seed: baseLeft, disableMultiStroke: true };
    const optsRight = { ...sketchOutline.surface, seed: baseRight, disableMultiStroke: true };
    const leftDrawable = roughGenerator.line(0, 1, half, 1, optsLeft);
    const rightDrawable = roughGenerator.line(half + labelSize, 1, main, 1, optsRight);
    const toPath = (d: ReturnType<typeof roughGenerator.line>) => {
      const parts = roughGenerator.toPaths(d).filter((p) => !p.fill || p.fill === 'none');
      return parts.length ? parts.map((p) => p.d).join(' ') : null;
    };
    return { left: toPath(leftDrawable), right: toPath(rightDrawable) };
  }, [labelled, main, labelSize, seed]);

  if (orientation === 'vertical') {
    return (
      // biome-ignore lint/a11y/useFocusableInteractive: a static decorative separator, not an adjustable splitter, so it is intentionally not focusable.
      <div
        ref={hostRef}
        className={cn(styles.sketchVertical, className)}
        role="separator"
        aria-orientation="vertical"
      >
        {verticalPath && cross != null && (
          <svg
            className={styles.sketchSvg}
            viewBox={`0 0 ${cross} ${main ?? 0}`}
            width={cross}
            height={main ?? 0}
            aria-hidden="true"
          >
            <path className={styles.sketchStroke} d={verticalPath} />
          </svg>
        )}
      </div>
    );
  }

  if (labelled) {
    return (
      // biome-ignore lint/a11y/useFocusableInteractive: a static decorative separator, not an adjustable splitter, so it is intentionally not focusable.
      <div ref={hostRef} className={cn(styles.sketchLabelled, className)} role="separator">
        <svg
          className={styles.sketchSvg}
          viewBox={`0 0 ${main ?? 0} 2`}
          width={main ?? 0}
          height={2}
          aria-hidden="true"
        >
          {labelledRuns?.left && main != null && (
            <path className={styles.sketchStroke} d={labelledRuns.left} />
          )}
          {labelledRuns?.right && main != null && (
            <path className={styles.sketchStroke} d={labelledRuns.right} />
          )}
        </svg>
        <span ref={labelRef} className={styles.label}>
          {label}
        </span>
      </div>
    );
  }

  return (
    // biome-ignore lint/a11y/useFocusableInteractive: a static decorative separator, not an adjustable splitter, so it is intentionally not focusable.
    <div ref={hostRef} className={cn(styles.horizontal, styles.sketch, className)} role="separator">
      {horizontalPath && main != null && (
        <svg
          className={styles.sketchSvg}
          viewBox={`0 0 ${main} 2`}
          width={main}
          height={2}
          aria-hidden="true"
        >
          <path className={styles.sketchStroke} d={horizontalPath} />
        </svg>
      )}
    </div>
  );
}
