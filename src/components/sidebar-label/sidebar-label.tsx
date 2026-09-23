import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './sidebar-label.module.scss';

export interface SidebarLabelProps {
  children?: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export function SidebarLabel({ children, as, className, style }: SidebarLabelProps) {
  const Component = (as ?? 'span') as ElementType;
  return (
    <Component className={cn(styles.sidebarLabel, className)} style={style}>
      {children}
    </Component>
  );
}
