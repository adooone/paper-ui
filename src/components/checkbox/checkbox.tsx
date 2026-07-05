import { forwardRef, useEffect, useId, useRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { useBlobPaths } from '../../hooks/use-blob-paths';
import { cn } from '../../utils/style-helpers';
import { SketchBorder } from '../sketch-border';
import styles from './checkbox.module.scss';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  labelPosition?: 'left' | 'right';
  indeterminate?: boolean;
  wobble?: number;
  surface?: 'paper' | 'chalkboard';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
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
  },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const paths = useBlobPaths(wobble);
  const innerRef = useRef<HTMLInputElement | null>(null);

  // `indeterminate` only exists as a DOM property — there is no attribute —
  // so it has to be set imperatively for :indeterminate CSS and screen
  // readers ("mixed" state) to work.
  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

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
          ref={(node) => {
            innerRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
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
          <SketchBorder
            smooth
            radius={5}
            inset={2}
            roughness={0.5}
            bowing={0.6}
            strokeWidth={1.4}
          />
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
});
