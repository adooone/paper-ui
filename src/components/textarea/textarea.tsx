import { forwardRef, useId } from 'react';
import type { TextareaHTMLAttributes } from 'react';
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

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, helperText, error = false, size = 'medium', surface = 'paper', className, id, ...props },
  ref,
) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

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
        <textarea ref={ref} id={textareaId} className={styles.textarea} {...props} />
        <SketchBorder radius={8} inset={2} roughness={1.1} strokeWidth={1.3} />
      </span>
      {helperText && (
        <span className={cn(styles.helperText, error && styles.helperError)}>{helperText}</span>
      )}
    </div>
  );
});
