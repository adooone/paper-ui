import { cloneElement, useEffect, useId, useRef, useState } from 'react';
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

function getPosition(rect: DOMRect, placement: NonNullable<TooltipProps['placement']>) {
  switch (placement) {
    case 'bottom':
      return {
        top: rect.bottom + GAP,
        left: rect.left + rect.width / 2,
        transform: 'translate(-50%, 0)',
      };
    case 'left':
      return {
        top: rect.top + rect.height / 2,
        left: rect.left - GAP,
        transform: 'translate(-100%, -50%)',
      };
    case 'right':
      return {
        top: rect.top + rect.height / 2,
        left: rect.right + GAP,
        transform: 'translate(0, -50%)',
      };
    default:
      return {
        top: rect.top - GAP,
        left: rect.left + rect.width / 2,
        transform: 'translate(-50%, -100%)',
      };
  }
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
  // A wrapper element holds the position ref rather than the child itself,
  // since paper-ui's components are plain function components (no
  // forwardRef), so a ref passed via cloneElement would silently fail.
  const wrapperRef = useRef<HTMLSpanElement>(null);
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
            id={tooltipId}
            role="tooltip"
            className={cn(
              styles.tooltip,
              styles[placement],
              surface === 'chalkboard' && styles.chalkboard,
            )}
            style={{ position: 'fixed', ...getPosition(rect, placement) }}
          >
            {content}
          </span>,
          document.body,
        )}
    </span>
  );
}
