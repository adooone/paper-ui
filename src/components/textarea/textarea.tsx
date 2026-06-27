import type { TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './textarea.module.scss';

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'chalkboard';
  className?: string;
}

export function Textarea({
  label,
  helperText,
  error = false,
  size = 'medium',
  variant = 'default',
  className,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id ?? `textarea-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className={cn(styles.wrapper, variant === 'chalkboard' && styles.chalkboard, className)}>
      {label && (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          styles.textarea,
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
