import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { useBlobPaths } from '../../hooks/use-blob-paths';
import { cn } from '../../utils/style-helpers';
import styles from './checkbox.module.scss';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  labelPosition?: 'left' | 'right';
  indeterminate?: boolean;
  wobble?: number;
  surface?: 'paper' | 'chalkboard';
}

export function Checkbox({
  label,
  labelPosition = 'right',
  indeterminate = false,
  wobble = 0.4,
  surface = 'paper',
  className,
  checked,
  onChange,
  id: idProp,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const paths = useBlobPaths(wobble);

  return (
    <label
      className={cn(
        styles.wrapper,
        labelPosition === 'left' && styles.labelLeft,
        surface === 'chalkboard' && styles.chalkboard,
        className,
      )}
      htmlFor={id}
    >
      <span className={styles.boxWrapper}>
        <input
          id={id}
          type="checkbox"
          className={styles.input}
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <svg
          className={styles.blobBg}
          viewBox="-10 -10 120 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={paths.blob} className={styles.blobFill} />
        </svg>
        <span className={styles.box} aria-hidden="true">
          {indeterminate ? (
            <svg viewBox="0 0 20 20" fill="none" className={styles.icon}>
              <line
                x1="4"
                y1="10"
                x2="16"
                y2="10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className={styles.indeterminateLine}
              />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="none" className={styles.icon}>
              <path
                d="M4 10 L8 14 L16 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.checkmark}
              />
            </svg>
          )}
        </span>
      </span>
      {label && <span className={styles.labelText}>{label}</span>}
    </label>
  );
}
