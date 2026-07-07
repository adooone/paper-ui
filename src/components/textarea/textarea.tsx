import { forwardRef, useCallback, useId, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent, TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import { SketchBorder } from '../sketch-border';
import styles from './textarea.module.scss';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  size?: 'small' | 'medium' | 'large';
  surface?: 'paper' | 'chalkboard';
  className?: string;
}

const MIN_HEIGHT = 48;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, helperText, error = false, size = 'medium', surface = 'paper', className, id, ...props },
  ref,
) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  // Own the textarea node (for the custom resize grip) while still honouring a
  // forwarded ref.
  const innerRef = useRef<HTMLTextAreaElement | null>(null);
  const setRefs = useCallback(
    (node: HTMLTextAreaElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  // Vertical-only resize via a hand-drawn grip. The native ::-webkit-resizer
  // can't take the sketch look and glitches horizontally when hidden, so
  // resize is off and we drive height ourselves — width never changes.
  const handleGripDown = useCallback((event: ReactPointerEvent<HTMLSpanElement>) => {
    const textarea = innerRef.current;
    if (!textarea) return;
    event.preventDefault();
    const startY = event.clientY;
    const startHeight = textarea.offsetHeight;
    const onMove = (move: PointerEvent) => {
      textarea.style.height = `${Math.max(MIN_HEIGHT, startHeight + move.clientY - startY)}px`;
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }, []);

  return (
    <div className={cn(styles.wrapper, surface === 'chalkboard' && styles.chalkboard, className)}>
      {label && (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>
      )}
      <span
        className={cn(
          styles.field,
          styles[size],
          error && styles.error,
          props.disabled && styles.disabled,
        )}
      >
        <textarea ref={setRefs} id={textareaId} className={styles.textarea} {...props} />
        <SketchBorder fill radius={8} inset={2} roughness={1.1} strokeWidth={1.3} />
        {!props.disabled && (
          <span
            className={styles.resizeGrip}
            onPointerDown={handleGripDown}
            aria-hidden="true"
            title="Drag to resize"
          >
            <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M11 4.5 L4.5 11" />
              <path d="M11 8.5 L8.5 11" />
            </svg>
          </span>
        )}
      </span>
      {helperText && (
        <span className={cn(styles.helperText, error && styles.helperError)}>{helperText}</span>
      )}
    </div>
  );
});
