import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import { SketchBorder, sketchOutline } from '../sketch-border';
import styles from './input.module.scss';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  size?: 'small' | 'medium' | 'large';
  surface?: 'paper' | 'chalkboard';
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helperText, error = false, size = 'medium', surface = 'paper', className, id, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn(styles.wrapper, surface === 'chalkboard' && styles.chalkboard, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
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
        <input ref={ref} id={inputId} className={styles.input} {...props} />
        <SketchBorder fill {...sketchOutline.field} />
      </span>
      {helperText && (
        <span className={cn(styles.helperText, error && styles.helperError)}>{helperText}</span>
      )}
    </div>
  );
});
