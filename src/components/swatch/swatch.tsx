import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './swatch.module.scss';

export interface SwatchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'chalkboard';
}

export function Swatch({
  active = false,
  disabled = false,
  variant = 'default',
  className,
  style,
  ...props
}: SwatchProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        styles.swatch,
        active && styles.active,
        disabled && styles.disabled,
        variant === 'chalkboard' && styles.chalkboard,
        className,
      )}
      style={style}
      {...props}
    />
  );
}
