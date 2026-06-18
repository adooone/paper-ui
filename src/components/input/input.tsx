import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './input.module.scss';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'chalkboard';
  className?: string;
}

export function Input({
  label,
  helperText,
  error = false,
  size = 'medium',
  variant = 'default',
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className={cn(styles.wrapper, variant === 'chalkboard' && styles.chalkboard, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          styles.input,
          styles[size],
          error && styles.error,
        )}
        {...props}
      />
      {helperText && (
        <span className={cn(styles.helperText, error && styles.helperError)}>
          {helperText}
        </span>
      )}
    </div>
  );
}
