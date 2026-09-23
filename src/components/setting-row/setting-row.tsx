import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './setting-row.module.scss';

export interface SettingRowProps {
  /** The label rendered on the left side of the row. */
  label: ReactNode;
  /** Optional secondary text under the label. */
  hint?: ReactNode;
  /** The control rendered in the right column (Input, Select, Switch, etc.). */
  control: ReactNode;
  /**
   * Forwards an id to the control so a `<label>` association can be wired
   * by the parent. The label cell becomes a `<label htmlFor>` when set.
   */
  htmlFor?: string;
  className?: string;
  style?: CSSProperties;
}

export function SettingRow({ label, hint, control, htmlFor, className, style }: SettingRowProps) {
  const labelClass = cn(styles.label, hint != null && styles.labelWithHint);

  const labelCell = htmlFor ? (
    <label htmlFor={htmlFor} className={labelClass}>
      <span className={styles.labelText}>{label}</span>
      {hint != null && <span className={styles.hint}>{hint}</span>}
    </label>
  ) : (
    <div className={labelClass}>
      <span className={styles.labelText}>{label}</span>
      {hint != null && <span className={styles.hint}>{hint}</span>}
    </div>
  );

  return (
    <div className={cn(styles.settingRow, className)} style={style}>
      {labelCell}
      <div className={styles.control}>{control}</div>
    </div>
  );
}
