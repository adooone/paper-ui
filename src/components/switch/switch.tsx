import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import { SketchBorder } from '../sketch-border';
import styles from './switch.module.scss';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  labelPosition?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  surface?: 'paper' | 'chalkboard';
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    label,
    labelPosition = 'right',
    size = 'medium',
    surface = 'paper',
    className,
    checked,
    onChange,
    id,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      className={cn(
        styles.wrapper,
        styles[size],
        labelPosition === 'left' && styles.labelLeft,
        surface === 'chalkboard' && styles.chalkboard,
        className,
      )}
      htmlFor={inputId}
    >
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <span className={styles.track} aria-hidden="true">
        <SketchBorder radius={999} inset={2} roughness={0.7} strokeWidth={1} />
        <span className={styles.thumb} />
      </span>
      {label && <span className={styles.labelText}>{label}</span>}
    </label>
  );
});
