import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { SidebarLabel } from '../sidebar-label';
import styles from './sidebar-field.module.scss';

export interface SidebarFieldProps {
  /** The label rendered above the control. */
  label: ReactNode;
  /** The control the field wraps (an `Input`, `Select`, etc.). */
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function SidebarField({ label, children, className, style }: SidebarFieldProps) {
  return (
    <div className={cn(styles.sidebarField, className)} style={style}>
      <SidebarLabel>{label}</SidebarLabel>
      {children}
    </div>
  );
}
