import { cloneElement, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useEscapeKey } from '../../hooks/use-escape-key';
import { cn } from '../../utils/style-helpers';
import styles from './tooltip.module.scss';

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  disabled?: boolean;
  surface?: 'paper' | 'chalkboard';
}

const GAP = 8;
// Minimum distance kept from the viewport edge once clamped.
const VIEWPORT_PADDING = 8;

// useLayoutEffect warns when invoked during server rendering.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

interface TooltipSize {
  width: number;
  height: number;
}

function getPosition(
  rect: DOMRect,
  placement: NonNullable<TooltipProps['placement']>,
  size: TooltipSize,
) {
  let top: number;
  let left: number;
  switch (placement) {
    case 'bottom':
      top = rect.bottom + GAP;
      left = rect.left + rect.width / 2 - size.width / 2;
      break;
    case 'left':
      top = rect.top + rect.height / 2 - size.height / 2;
      left = rect.left - GAP - size.width;
      break;
    case 'right':
      top = rect.top + rect.height / 2 - size.height / 2;
      left = rect.right + GAP;
      break;
    default:
      top = rect.top - GAP - size.height;
      left = rect.left + rect.width / 2 - size.width / 2;
  }
  // Clamp into the viewport so tooltips on triggers near an edge stay
  // readable instead of being cut off.
  left = Math.min(
    Math.max(left, VIEWPORT_PADDING),
    window.innerWidth - size.width - VIEWPORT_PADDING,
  );
  top = Math.min(
    Math.max(top, VIEWPORT_PADDING),
    window.innerHeight - size.height - VIEWPORT_PADDING,
  );
  return { top, left };
}

export function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 300,
  disabled = false,
  surface = 'paper',
}: TooltipProps) {
  const tooltipId = useId();
  // Hover and focus are independent open-sources: moving the mouse off the
  // trigger must not hide a tooltip that's still open because the trigger
  // is keyboard-focused (and vice versa).
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  // The tooltip renders hidden for one frame while its size is measured, so
  // the final position (including viewport clamping) can be computed from
  // real dimensions.
  const [size, setSize] = useState<TooltipSize | null>(null);
  // A wrapper element holds the position ref rather than the child itself,
  // since paper-ui's components are plain function components (no
  // forwardRef), so a ref passed via cloneElement would silently fail.
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement | null>(null);
  const showTimer = useRef<ReturnType<typeof setTimeout>>();

  const open = !disabled && !!content && !dismissed && (hovering || focused);

  const handleMouseEnter = () => {
    clearTimeout(showTimer.current);
    showTimer.current = setTimeout(() => setHovering(true), delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(showTimer.current);
    setHovering(false);
    setDismissed(false);
  };

  const handleFocus = () => {
    setDismissed(false);
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
    setDismissed(false);
  };

  useEscapeKey(open, () => setDismissed(true));

  useEffect(() => {
    if (!open) {
      setRect(null);
      return;
    }
    const updateRect = () => {
      if (wrapperRef.current) setRect(wrapperRef.current.getBoundingClientRect());
    };
    updateRect();
    window.addEventListener('scroll', updateRect, { capture: true, passive: true });
    window.addEventListener('resize', updateRect, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateRect, { capture: true });
      window.removeEventListener('resize', updateRect);
    };
  }, [open]);

  useIsomorphicLayoutEffect(() => {
    if (!open) {
      setSize(null);
      return;
    }
    const el = tooltipRef.current;
    if (el) setSize({ width: el.offsetWidth, height: el.offsetHeight });
  }, [open, content, placement]);

  useEffect(() => () => clearTimeout(showTimer.current), []);

  const childProps = children.props as { 'aria-describedby'?: string };

  return (
    <span
      ref={wrapperRef}
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {cloneElement(children, {
        'aria-describedby': open ? tooltipId : childProps['aria-describedby'],
      } as Record<string, unknown>)}
      {open &&
        rect &&
        typeof document !== 'undefined' &&
        createPortal(
          <span
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            className={cn(
              styles.tooltip,
              styles[placement],
              surface === 'chalkboard' && styles.chalkboard,
            )}
            style={
              size
                ? { position: 'fixed', ...getPosition(rect, placement, size) }
                : { position: 'fixed', top: 0, left: 0, visibility: 'hidden' }
            }
          >
            {content}
          </span>,
          document.body,
        )}
    </span>
  );
}
