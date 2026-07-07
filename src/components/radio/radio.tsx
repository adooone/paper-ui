import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { useBlobPaths } from '../../hooks/use-blob-paths';
import { cn } from '../../utils/style-helpers';
import { SketchBorder, sketchOutline } from '../sketch-border';
import styles from './radio.module.scss';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  labelPosition?: 'left' | 'right';
  wobble?: number;
  surface?: 'paper' | 'chalkboard';
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    label,
    labelPosition = 'right',
    wobble = 0.4,
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
  const paths = useBlobPaths(wobble);

  return (
    <label
      className={cn(
        styles.wrapper,
        labelPosition === 'left' && styles.labelLeft,
        surface === 'chalkboard' && styles.chalkboard,
        className,
      )}
      htmlFor={inputId}
    >
      <span className={styles.boxWrapper}>
        <input
          ref={ref}
          id={inputId}
          type="radio"
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
          <SketchBorder smooth shape="circle" {...sketchOutline.control} />
          <span className={styles.dot} />
        </span>
      </span>
      {label && <span className={styles.labelText}>{label}</span>}
    </label>
  );
});
